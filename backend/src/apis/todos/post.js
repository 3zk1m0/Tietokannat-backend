import Router from 'koa-router';
import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';
import { todoPath } from '../constants';

// DELETE /resource/:id
export default async function post(ctx) {
  const { text } = ctx.request.body;
  console.log('.post text contains:', text);

  if (typeof text === 'undefined') {
    ctx.throw(400, 'body.text is required');
  } else if (typeof text !== 'string') {
    ctx.throw(400, 'body.done must be string');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Insert a new todo
    await conn.execute(`
          INSERT INTO todos (text)
          VALUES (:text);
        `, { text });

    const [lastid] = await conn.execute(`
    SELECT uuid as id
          FROM todos
          WHERE id = @last_uuid;`);
    console.log(lastid);

    // Get the new todo
    const [data] = await conn.execute(`
          SELECT uuid as id, text, done
          FROM todos
          WHERE uuid = '${lastid[0].id}';
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(todoPath, { id: lastid[0].id })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

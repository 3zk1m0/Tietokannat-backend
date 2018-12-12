
import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';

// DELETE /resource/:id
export default async function patch(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [data] = await conn.execute(`
           SELECT *
           FROM todos
           WHERE uuid = :id;
         `, { id });

    console.log(data[0]);
    if (typeof data[0] === 'undefined') {
      ctx.throw(404, 'id not found');
    }

    body.forEach((element) => {
      data[0][element.path.substring(1)] = element.value;
    });

    const [status] = await conn.execute(`
           UPDATE todos
           SET id = uuid_to_bin('${data[0].id}'), text = '${data[0].text}', done = ${Number(data[0].done)}
           WHERE uuid = '${data[0].uuid}';
         `);

    delete data[0].uuid;
    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

import mysql from 'mysql2/promise';
import Router from 'koa-router';
import { connectionSettings } from '../../../settings';
import { loansystemPath } from '../../constants';
import postUserBody from '../../../helpers/bodyCheckers';
import hashPassword from '../../../helpers';

// DELETE /resource/:id
export default async function postUsers(ctx) {
  const body = ctx.request.body;
  console.log('.post text contains:', body);

  postUserBody(ctx, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const password = await hashPassword(body.password);
    console.log(password);
    await conn.execute(`
      INSERT INTO users (name, role, email, password)
      VALUES ('${body.name}', '${body.role}', '${body.email}', '${password}');`);

    const [newLoan] = await conn.execute('SELECT bin_to_uuid(@last_uuid) as id;');
    // Get the new todo
    const [data] = await conn.execute(`
          SELECT uuid as id, name, role, email
          FROM users
          WHERE uuid = '${newLoan[0].id}';
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(`${loansystemPath}/users/:id`, { id: newLoan[0].id })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

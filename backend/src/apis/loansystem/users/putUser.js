import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import bodyChecker from '../../../helpers/bodyCheckers';
import hashPassword from '../../../helpers/hashPassword';

// DELETE /resource/:id
export default async function putUsers(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  bodyChecker.putUserBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [status] = await conn.execute(`
           UPDATE users
           SET name = '${body.name}', role = '${body.role}', email = '${body.email}', password = '${hashPassword(body.password)}'
           WHERE uuid = '${id}';
         `);

    let data;

    if (status.affectedRows === 0) {
      // If the resource does not already exist, create it
      await conn.execute(`
        INSERT INTO users (name, role, email, password)
        VALUES ('${body.name}', '${body.role}', '${body.email}', '${hashPassword(body.password)}');`);
      // Get the todo
      [data] = await conn.execute(`
            SELECT uuid as id, name, role, email
            FROM users
            WHERE id = @last_uuid;`);
    } else {
      // Get the todo
      [data] = await conn.execute(`
            SELECT uuid as id, name, role, email
            FROM users
            WHERE uuid = '${id}';`);
    }
    // Return the resource
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

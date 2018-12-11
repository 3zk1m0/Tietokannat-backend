import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import { putUserBody } from '../../../helpers/bodyCheckers';

// DELETE /resource/:id
async function putUsers(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  putUserBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [status] = await conn.execute(`
           UPDATE users
           SET name = '${body.name}', role = '${body.role}', username = '${body.username}', password = '${body.password}'
           WHERE uuid = '${id}';
         `);

    let data;

    if (status.affectedRows === 0) {
      // If the resource does not already exist, create it
      await conn.execute(`
        INSERT INTO users (name, role, username, password)
        VALUES ('${body.name}', '${body.role}', '${body.username}', '${body.password}');`);
      // Get the todo
      [data] = await conn.execute(`
            SELECT uuid as id, name, role, username, password
            FROM users
            WHERE id = @last_uuid;`);
    } else {
      // Get the todo
      [data] = await conn.execute(`
            SELECT uuid as id, name, role, username, password
            FROM users
            WHERE uuid = '${id}';`);
    }
    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = putUsers;

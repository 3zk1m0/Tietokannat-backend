import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import operatePatch from '../../../helpers/patchOperator';
import hashPassword from '../../../helpers/hashPassword';

// DELETE /resource/:id
export default async function patchUser(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const allowed = {
      op: ['replace'],
      path: ['/id', '/name', '/role', '/email', '/password'],
      value: ['string', 'string', 'string', 'string', 'string'],
    };

    // Update the todo
    const [data] = await conn.execute(`
           SELECT *
           FROM users
           WHERE uuid = :id;
         `, { id });

    let password = data[0].password;
    if (typeof data[0] === 'undefined') {
      ctx.throw(404, 'id not found');
    }

    data[0] = operatePatch(ctx, body, data[0], allowed);
    if (password !== data[0].password) {
      password = hashPassword(data[0].password);
    }

    await conn.execute(`
           UPDATE users
           SET id = uuid_to_bin('${data[0].uuid}'), name = '${data[0].name}', role = '${data[0].role}', email = '${data[0].email}', password = '${password}'
           WHERE uuid = '${id}';
         `);

    data[0].id = data[0].uuid;
    delete data[0].uuid;
    // Return the resource
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

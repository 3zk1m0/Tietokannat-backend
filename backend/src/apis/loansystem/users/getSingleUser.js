import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function getSingleUsers(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an integer');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, name, role, email
          FROM users
          WHERE uuid = '${id}';`);

    // Return the resource
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function getSelf(ctx) {
  const body = jwt.decode(ctx.request.header.authorization.substring(7));
  console.log('.get id contains:', body.id);

  if (typeof body.id !== 'string') {
    ctx.throw(400, 'id must be an integer');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, name, email
          FROM users
          WHERE uuid = '${body.id}';`);
    console.log(data[0]);
    // Return the resource
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

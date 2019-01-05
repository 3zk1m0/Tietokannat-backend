
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectionSettings } from '../settings';

const secret = process.env.SECRET || 'A very secret key';

// DELETE /resource/:id
export default async function post(ctx) {
  const body = ctx.request.body;

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, name, role, email, password
          FROM users
          WHERE email = '${body.email}';
        `);

    // Set the Location header to point to the new resource
    conn.end();

    if (typeof data[0] !== 'undefined') {
      if (bcrypt.compareSync(body.password, data[0].password)) {
        ctx.status = 200;
        ctx.body = {
          token: jwt.sign({ id: data[0].id }, secret, { expiresIn: 86400 }),
          role: data[0].role,
          name: data[0].name,
          message: 'Successfully logged in!',
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          message: 'Authentication failed',
        };
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'Authentication failed',
      };
    }
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}


import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectionSettings } from '../settings';


// DELETE /resource/:id
export default async function post(ctx) {
  const body = ctx.request.body;

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, role, username, password
          FROM users
          WHERE username = ${body.username};
        `);

    // Set the Location header to point to the new resource

    if (bcrypt.compareSync(body.password, data[0].password)) {
      ctx.status = 200;
      ctx.body = {
        token: jwt.sign({ role: data[0].role }, 'A very secret key', { expiresIn: 86400 }), // expires in 24 hours Should be the same secret key as the one used is ./jwt.js
        message: 'Successfully logged in!',
      };
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

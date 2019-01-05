import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { connectionSettings } from '../settings';


export default async (ctx, next) => {
  console.log('checkRole');
  const body = jwt.decode(ctx.request.header.authorization.substring(7));
  // console.log(body);

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
        SELECT role
        FROM users
        WHERE uuid = '${body.id}'
      `);

    if (typeof data[0] === 'undefined') {
      ctx.throw(400, 'No authorization');
    }

    if (data[0].role !== 'admin') {
      ctx.throw(400, 'No authorization');
    }

    // Return all todos
    ctx.body = data;
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }

  // Check that the request content type is 'application/json'
  // ctx.throw(415, 'Request must be application/json');
  // Move to next middleware
  await next();
};

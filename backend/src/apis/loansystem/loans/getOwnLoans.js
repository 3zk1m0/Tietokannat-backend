import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function getOwnLoans(ctx) {
  const body = jwt.decode(ctx.request.header.authorization.substring(7));
  console.log('.get id contains:', body.id);

  if (typeof id === 'string') {
    ctx.throw(400, 'id not valid');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, device_uuid as device_id, loaningTime, dueDate, returnTime, 
          loansState, returnState
          FROM loans
          WHERE customer_uuid = '${body.id}';`);

    // Return the resource
    conn.end();
    ctx.body = data;
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

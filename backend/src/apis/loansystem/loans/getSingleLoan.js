import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function getSingleLoans(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  /* if (isNaN(id) || id.includes('.')) {
    ctx.throw(400, 'id must be an integer');
  } */

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, device_uuid as device_id, loaningTime, dueDate, returnTime, 
          loansState, returnState, customer_uuid as customer_id, 
          loanGiver_uuid as loanGiver_id, loanReceiver_uuid as loanReceiver_id
          FROM loans
          WHERE uuid = '${id}';`);

    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

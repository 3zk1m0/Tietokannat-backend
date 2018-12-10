import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
async function getSingleLoans(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  /* if (isNaN(id) || id.includes('.')) {
    ctx.throw(400, 'id must be an integer');
  } */

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT bin_to_uuid(id) as id, bin_to_uuid(device_id) as device_id, loaningTime, dueDate, returnTime, 
          loansState, returnState, bin_to_uuid(customer_id) as customer_id, 
          bin_to_uuid(loanGiver_id) as loanGiver_id, bin_to_uuid(loanReceiver_id) as loanReceiver_id
          FROM loans
          WHERE bin_to_uuid(id) = '${id}';`);

    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = getSingleLoans;

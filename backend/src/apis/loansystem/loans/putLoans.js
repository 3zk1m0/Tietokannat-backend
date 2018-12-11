import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import { putLoanBody } from '../../../helpers/bodyCheckers';

// DELETE /resource/:id
async function putLoans(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  putLoanBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [status] = await conn.execute(`
           UPDATE loans
           SET loaningTime = '${body.loaningTime}', dueDate = '${body.dueDate}', returnTime = '${body.returnTime}', returnState = '${body.returnState}', loansState = '${body.loansState}', device_id = uuid_to_bin('${body.device_id}'), customer_id = uuid_to_bin('${body.customer_id}'), loanGiver_id = uuid_to_bin('${body.loanGiver_id}'), loanReceiver_id = uuid_to_bin('${body.loanReceiver_id}')
           WHERE id = uuid_to_bin('${id}');
         `);

    let data;
    if (status.affectedRows === 0) {
      // If the resource does not already exist, create it
      await conn.execute(`
        INSERT INTO loans (loaningTime, dueDate, returnTime, returnState, loansState, device_id, customer_id, loanGiver_id, loanReceiver_id)
        VALUES ('${body.loaningTime}', '${body.dueDate}', '${body.returnTime}', '${body.returnState}', '${body.loansState}', uuid_to_bin('${body.device_id}'), uuid_to_bin('${body.customer_id}'), uuid_to_bin('${body.loanGiver_id}'), uuid_to_bin('${body.loanReceiver_id})');`);
      // Get the todo
      [data] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, loaningTime, dueDate, returnTime, returnState, loansState, bin_to_uuid(device_id), bin_to_uuid(customer_id), bin_to_uuid(loanGiver_id), bin_to_uuid(loanReceiver_id)
            FROM loans
            WHERE id = @last_uuid;`);
    } else {
      // Get the todo
      [data] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, loaningTime, dueDate, returnTime, returnState, loansState, bin_to_uuid(device_id), bin_to_uuid(customer_id), bin_to_uuid(loanGiver_id), bin_to_uuid(loanReceiver_id)
            FROM loans
            WHERE id = uuid_to_bin('${id}');`);
    }
    // console.log(data);
    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = putLoans;

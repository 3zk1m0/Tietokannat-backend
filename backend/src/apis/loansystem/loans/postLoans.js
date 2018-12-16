import mysql from 'mysql2/promise';
import Router from 'koa-router';
import { connectionSettings } from '../../../settings';
import { loansystemPath } from '../../constants';
import postLoanBody from '../../../helpers/bodyCheckers';

// DELETE /resource/:id
export default async function postLoans(ctx) {
  const body = ctx.request.body;
  console.log('.post text contains:', body);

  postLoanBody(ctx, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);
    await conn.execute(`
      INSERT INTO loans (loaningTime, dueDate, returnTime, returnState, loansState, device_id, customer_id, loanGiver_id, loanReceiver_id)
      VALUES ('${body.loaningTime}', '${body.dueDate}', '${body.returnTime}', '${body.returnState}', '${body.loansState}', uuid_to_bin('${body.device_id}'), uuid_to_bin('${body.customer_id}'), uuid_to_bin('${body.loanGiver_id}'), uuid_to_bin('${body.loanReceiver_id}'));`);

    const [newLoan] = await conn.execute('SELECT bin_to_uuid(@last_uuid) as id;');
    // Get the new todo
    const [data] = await conn.execute(`
          SELECT uuid, returnTime, dueDate, returnTime, loansState, returnState, device_uuid as device_id, customer_uuid as customer_id, loanGiver_uuid as loanGiver_id, loanReceiver_uuid as loanReceiver_id
          FROM loans
          WHERE uuid = '${newLoan[0].id}';
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(`${loansystemPath}/loans/:id`, { id: newLoan[0].id })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

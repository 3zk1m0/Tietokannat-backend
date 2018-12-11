import mysql from 'mysql2/promise';
import Router from 'koa-router';
import { connectionSettings } from '../../settings';
import { loansystemPath } from '../constants';
import { returnBody } from '../../helpers/bodyCheckers';

async function addLoan(ctx) {
  const body = ctx.request.body;
  console.log(body);

  returnBody(ctx, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const [loan] = await conn.execute(`SELECT returnState FROM loans WHERE id = uuid_to_bin("${body.id}");`);
    if (loan[0].returnState !== null) {
      ctx.throw(400, 'Device already returned!');
    }

    const now = new Date();
    const returnTime = now.toISOString().slice(0, 19).replace('T', ' ');

    // Insert a new todo
    await conn.execute(`
      UPDATE loans SET returnTime='${returnTime}', returnState='${body.returnState}', loanReceiver_id=uuid_to_bin('${body.loanReceiver_id}') WHERE id=uuid_to_bin("${body.id}");`);

    // Get the new todo
    const [data] = await conn.execute(`
          SELECT bin_to_uuid(id), returnTime, dueDate, returnTime, loansState, returnState, bin_to_uuid(device_id), bin_to_uuid(customer_id), bin_to_uuid(loanGiver_id), bin_to_uuid(loanReceiver_id)
          FROM loans
          WHERE id = uuid_to_bin("${body.id}");
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(`${loansystemPath}/loans/:id`, { id: body.id })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = addLoan;

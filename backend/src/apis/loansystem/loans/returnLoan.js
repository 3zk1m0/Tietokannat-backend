import mysql from 'mysql2/promise';
import Router from 'koa-router';
import { connectionSettings } from '../../../settings';
import { loansystemPath } from '../../constants';
import bodyChecker from '../../../helpers/bodyCheckers';

export default async function returnLoan(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log(body);

  bodyChecker.returnBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const [loan] = await conn.execute(`SELECT returnState FROM loans WHERE uuid = "${id}";`);
    if (loan[0].returnState !== null) {
      ctx.throw(400, 'Device already returned!');
    }

    const now = new Date();
    const returnTime = now.toISOString().slice(0, 19).replace('T', ' ');

    // Insert a new todo
    await conn.execute(`
      UPDATE loans SET returnTime='${returnTime}', returnState='${body.returnState}', loanReceiver_id=uuid_to_bin('${body.loanReceiver_id}') WHERE uuid = "${id}";`);

    // Get the new todo
    const [data] = await conn.execute(`
          SELECT uuid as id, returnTime, dueDate, returnTime, loansState, returnState, device_uuid as device_id, customer_uuid as customer_id, loanGiver_uuid as loanGiver_id, loanReceiver_uuid as loanReceiver_id
          FROM loans
          WHERE uuid = "${id}";
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(`${loansystemPath}/loans/${id}`)}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

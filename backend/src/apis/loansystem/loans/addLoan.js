import mysql from 'mysql2/promise';
import Router from 'koa-router';
import { connectionSettings } from '../../../settings';
import { loansystemPath } from '../../constants';
import loanBody from '../../../helpers/bodyCheckers';

export default async function addLoan(ctx) {
  const body = ctx.request.body;
  // console.log(body);

  loanBody(ctx, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const [device] = await conn.execute(`SELECT loantime FROM devices WHERE uuid = "${body.device_id}";`);
    const [lastLoan] = await conn.execute(`SELECT returnState FROM loans Where device_uuid = "${body.device_id}" order by loaningTime DESC limit 1;`);
    const now = new Date();
    const loaningTime = now.toISOString().slice(0, 19).replace('T', ' ');
    const dueDate = new Date(now.setDate(now.getDate() + device[0].loantime)).toISOString().split('T')[0];

    let lastState = 'New';

    if (typeof lastLoan[0] !== 'undefined') {
      if (lastLoan[0].returnState === null) {
        ctx.throw(400, 'Device already loaned!');
      }
      lastState = lastLoan[0].returnState;
    }

    // Insert a new todo
    await conn.execute(`
      INSERT INTO loans (loaningTime, dueDate, loansState, device_id, customer_id, loanGiver_id)
      VALUES ("${loaningTime}", "${dueDate}", "${lastState}", uuid_to_bin("${body.device_id}"), uuid_to_bin("${body.customer_id}"), uuid_to_bin("${body.loanGiver_id}"));`);

    const [newLoan] = await conn.execute('SELECT bin_to_uuid(@last_uuid) as id;');
    // Get the new todo
    const [data] = await conn.execute(`
          SELECT uuid as id, loaningTime, dueDate, loansState, device_uuid as device_id, customer_uuid as customer_id, loanGiver_uuid as loanGiver_id
          FROM loans
          WHERE uuid = "${newLoan[0].id}";
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(`${loansystemPath}/loans/:id`, { id: body.device_id })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

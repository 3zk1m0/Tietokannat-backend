import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import operatePatch from '../../../helpers/patchOperator';

// DELETE /resource/:id
export default async function patchLoans(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const allowed = {
      op: ['replace'],
      path: ['/id', '/loaningTime', '/dueDate', '/returnTime', '/loansState', '/returnState', '/device_id', '/customer_id', '/loanGiver_id', '/loanReceiver_id'],
      value: ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'],
    };

    // Update the todo
    const [data] = await conn.execute(`
           SELECT *
           FROM loans
           WHERE uuid = :id;
         `, { id });


    data[0].loaningTime = new Date(data[0].loaningTime).toISOString().slice(0, 19).replace('T', ' ');
    data[0].dueDate = new Date(data[0].dueDate).toISOString().split('T')[0];
    data[0].returnTime = new Date(data[0].returnTime).toISOString().slice(0, 19).replace('T', ' ');

    if (typeof data[0] === 'undefined') {
      ctx.throw(404, 'id not found');
    }

    data[0] = operatePatch(ctx, body, data[0], allowed);
    console.log(data[0]);
    await conn.execute(`
           UPDATE loans
           SET id = uuid_to_bin('${data[0].uuid}'), loaningTime = '${data[0].loaningTime}', dueDate = '${data[0].dueDate}', returnTime = '${data[0].returnTime}', returnState = '${data[0].returnState}', loansState = '${data[0].loansState}', device_id = uuid_to_bin('${data[0].device_uuid}'), customer_id = uuid_to_bin('${data[0].customer_uuid}'), loanGiver_id = uuid_to_bin('${data[0].loanGiver_uuid}'), loanReceiver_id = uuid_to_bin('${data[0].loanReceiver_uuid}')
           WHERE uuid = '${id}';
         `);

    data[0].id = data[0].uuid;
    data[0].device_id = data[0].device_uuid;
    data[0].customer_id = data[0].customer_uuid;
    data[0].loanGiver_id = data[0].loanGiver_uuid;
    data[0].loanReceiver_id = data[0].loanReceiver_uuid;
    delete data[0].uuid;
    delete data[0].device_uuid;
    delete data[0].customer_uuid;
    delete data[0].loanGiver_uuid;
    delete data[0].loanReceiver_uuid;
    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import operatePatch from '../../../helpers/patchOperator';

// DELETE /resource/:id
export default async function patchDevices(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const allowed = {
      op: ['replace'],
      path: ['/id', '/deviceName', '/deviceInfo', '/loantime'],
      value: ['string', 'string', 'number'],
    };

    // Update the todo
    const [data] = await conn.execute(`
           SELECT *
           FROM loans
           WHERE uuid = :id;
         `, { id });


    if (typeof data[0] === 'undefined') {
      ctx.throw(404, 'id not found');
    }

    data[0] = operatePatch(ctx, body, data[0], allowed);

    await conn.execute(`
           UPDATE loans
           SET id = uuid_to_bin('${data[0].uuid}'), deviceName = '${body.deviceName}', deviceInfo = '${body.deviceInfo}', loantime = '${body.loantime}'
           WHERE uuid = '${id}';
         `);

    data[0].id = data[0].uuid;
    delete data[0].uuid;
    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}
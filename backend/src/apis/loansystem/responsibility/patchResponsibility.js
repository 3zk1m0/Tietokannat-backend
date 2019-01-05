import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import operatePatch from '../../../helpers/patchOperator';

// DELETE /resource/:id
export default async function patchResponsibility(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const allowed = {
      op: ['replace'],
      path: ['/id', '/user_id', '/device_id'],
      value: ['string', 'string', 'string'],
    };

    // Update the todo
    const [data] = await conn.execute(`
           SELECT *
           FROM responsibility
           WHERE uuid = :id;
         `, { id });


    if (typeof data[0] === 'undefined') {
      ctx.throw(404, 'id not found');
    }

    data[0] = operatePatch(ctx, body, data[0], allowed);

    await conn.execute(`
           UPDATE responsibility
           SET id = uuid_to_bin('${data[0].uuid}'), user_id = uuid_to_bin('${data[0].user_uuid}'), device_id = uuid_to_bin('${data[0].device_uuid}')
           WHERE uuid = '${id}';
         `);

    data[0].id = data[0].uuid;
    data[0].user_id = data[0].user_uuid;
    data[0].device_id = data[0].device_uuid;
    delete data[0].uuid;
    delete data[0].device_uuid;
    delete data[0].user_uuid;

    // Return the resource
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

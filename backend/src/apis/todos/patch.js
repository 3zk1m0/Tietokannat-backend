
import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';
import patchOperator from '../../helpers/patchOperator';
import operatePatch from '../../helpers/patchOperator/operatePatch';

// DELETE /resource/:id
export default async function patch(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    const allowed = {
      op: ['replace'],
      path: ['id', 'text', 'done'],
      value: ['string', 'string', 'boolean'],
    };

    // Update the todo
    const [data] = await conn.execute(`
           SELECT *
           FROM todos
           WHERE uuid = :id;
         `, { id });

    console.log(data[0]);
    if (typeof data[0] === 'undefined') {
      ctx.throw(404, 'id not found');
    }

    data[0] = operatePatch(ctx, body, data[0], allowed);

    await conn.execute(`
           UPDATE todos
           SET id = uuid_to_bin('${data[0].id}'), text = '${data[0].text}', done = ${Number(data[0].done)}
           WHERE uuid = '${data[0].uuid}';
         `);

    delete data[0].uuid;
    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

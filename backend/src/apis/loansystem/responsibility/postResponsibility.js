import mysql from 'mysql2/promise';
import Router from 'koa-router';
import { connectionSettings } from '../../../settings';
import { loansystemPath } from '../../constants';
import { postResponsibilityBody } from '../../../helpers/bodyCheckers';

async function postResponsibility(ctx) {
  const body = ctx.request.body;
  console.log('.post text contains:', body);

  postResponsibilityBody(ctx, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);
    await conn.execute(`
      INSERT INTO responsibility (user_id, device_id)
      VALUES (uuid_to_bin('${body.user_id}'), uuid_to_bin('${body.device_id}'));`);

    const [newLoan] = await conn.execute('SELECT bin_to_uuid(@last_uuid) as id;');
    // Get the new todo
    const [data] = await conn.execute(`
          SELECT bin_to_uuid(id) as id, bin_to_uuid(user_id), bin_to_uuid(device_id)
          FROM responsibility
          WHERE id = uuid_to_bin('${newLoan[0].id}');
        `);

    // Set the response header to 201 Created
    ctx.status = 201;

    // Set the Location header to point to the new resource
    const newUrl = `${ctx.host}${Router.url(`${loansystemPath}/responsibility/:id`, { id: newLoan[0].id })}`;
    ctx.set('Location', newUrl);

    // Return the new todo
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = postResponsibility;

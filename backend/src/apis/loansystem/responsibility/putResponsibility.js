import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import { putResponsibilityBody } from '../../../helpers/bodyCheckers';

// DELETE /resource/:id
async function putResponsibilitys(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  putResponsibilityBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [status] = await conn.execute(`
           UPDATE responsibility
           SET user_id = uuid_to_bin('${body.user_id}'), device_id = uuid_to_bin('${body.device_id}')
           WHERE id = uuid_to_bin('${id}');
         `);

    let data;
    if (status.affectedRows === 0) {
      // If the resource does not already exist, create it
      await conn.execute(`
        INSERT INTO responsibility (user_id, device_id)
        VALUES (uuid_to_bin('${body.user_id}'), uuid_to_bin('${body.device_id}'));`);
      // Get the todo
      [data] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, bin_to_uuid(user_id) as user_id, bin_to_uuid(device_id) as device_id
            FROM responsibility
            WHERE id = @last_uuid;`);
    } else {
      // Get the todo
      [data] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, bin_to_uuid(user_id) as user_id, bin_to_uuid(device_id) as device_id
            FROM responsibility
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

module.exports = putResponsibilitys;

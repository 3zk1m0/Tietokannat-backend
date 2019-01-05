import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import bodyChecker from '../../../helpers/bodyCheckers';

// DELETE /resource/:id
export default async function putResponsibilitys(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  bodyChecker.putResponsibilityBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [status] = await conn.execute(`
           UPDATE responsibility
           SET user_id = uuid_to_bin('${body.user_id}'), device_id = uuid_to_bin('${body.device_id}')
           WHERE uuid = '${id}';
         `);

    let data;
    if (status.affectedRows === 0) {
      // If the resource does not already exist, create it
      await conn.execute(`
        INSERT INTO responsibility (user_id, device_id)
        VALUES (uuid_to_bin('${body.user_id}'), uuid_to_bin('${body.device_id}'));`);
      // Get the todo
      [data] = await conn.execute(`
            SELECT uuid as id, user_uuid as user_id, device_uuid as device_id
            FROM responsibility
            WHERE id = @last_uuid;`);
    } else {
      // Get the todo
      [data] = await conn.execute(`
            SELECT uuid as id,user_uuid as user_id, device_uuid as device_id
            FROM responsibility
            WHERE uuid = '${id}';`);
    }
    // console.log(data);
    // Return the resource
    conn.end();
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

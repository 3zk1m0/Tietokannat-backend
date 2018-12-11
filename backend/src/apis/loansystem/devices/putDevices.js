import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';
import { putDeviceBody } from '../../../helpers/bodyCheckers';

// DELETE /resource/:id
async function putDevices(ctx) {
  const { id } = ctx.params;
  const body = ctx.request.body;
  console.log('.put id contains:', id);
  console.log('.put body contains:', body);

  putDeviceBody(ctx, id, body);

  try {
    const conn = await mysql.createConnection(connectionSettings);

    // Update the todo
    const [status] = await conn.execute(`
           UPDATE devices
           SET deviceName = '${body.deviceName}', deviceInfo = '${body.deviceInfo}', loantime = '${body.loantime}'
           WHERE id = uuid_to_bin('${id}');
         `);

    let data;
    if (status.affectedRows === 0) {
      // If the resource does not already exist, create it
      await conn.execute(`
        INSERT INTO devices (deviceName, deviceInfo, loantime)
        VALUES ('${body.deviceName}', '${body.deviceInfo}', '${body.loantime}');`);
      // Get the todo
      [data] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, deviceName, deviceInfo, loantime
            FROM devices
            WHERE id = @last_uuid;`);
    } else {
      // Get the todo
      [data] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, deviceName, deviceInfo, loantime
            FROM devices
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

module.exports = putDevices;

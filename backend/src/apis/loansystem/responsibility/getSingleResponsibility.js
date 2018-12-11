import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
async function getSingleDevices(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an string');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT bin_to_uuid(id) as id, bin_to_uuid(user_id) as user_id, bin_to_uuid(device_id) as device_id
          FROM responsibility
          WHERE id = uuid_to_bin('${id}');`);

    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = getSingleDevices;

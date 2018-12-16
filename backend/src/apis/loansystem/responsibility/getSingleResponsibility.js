import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function getSingleDevices(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an string');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, user_uuid as user_id, device_uuid as device_id
          FROM responsibility
          WHERE uuid = '${id}';`);

    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

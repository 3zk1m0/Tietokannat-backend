import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
async function deleteResponsibility(ctx) {
  const { id } = ctx.params;
  console.log('.del id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an string');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [status] = await conn.execute(`
          DELETE FROM responsibility
          WHERE uuid = '${id}';`);

    if (status.affectedRows === 0) {
      // The row did not exist, return '404 Not  found'
      ctx.status = 404;
    } else {
      // Return '204 No Content' status code for successful delete
      ctx.status = 204;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

module.exports = deleteResponsibility;

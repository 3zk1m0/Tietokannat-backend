import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function deleteLoans(ctx) {
  const { id } = ctx.params;
  console.log('.del id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an integer');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [status] = await conn.execute(`
          DELETE FROM loans
          WHERE uuid = '${id}';`);

    if (status.affectedRows === 0) {
      // The row did not exist, return '404 Not  found'
      conn.end();
      ctx.status = 404;
    } else {
      // Return '204 No Content' status code for successful delete
      conn.end();
      ctx.status = 204;
    }
  } catch (error) {
    console.error('Error occurred:', error);

    ctx.throw(500, error);
  }
}

import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
export default async function getSingleDevices(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an integer');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT returnState
          FROM db_1.loans
          WHERE device_uuid = '${id}'
          order by loaningTime DESC
          LIMIT 1;`);

    if (data[0].returnState === null) {
      ctx.body = { status: 'In Loan' };
    } else {
      ctx.body = { status: 'free' };
    }

    // Return the resource
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

import mysql from 'mysql2/promise';
import Url from 'url';
import { connectionSettings } from '../../../settings';
import parseSortQuery from '../../../helpers/parseSortQuery';

// DELETE /resource/:id
export default async function getLoans(ctx) {
  const url = Url.parse(ctx.url, true);
  const { sort } = url.query;

  const orderBy = parseSortQuery({ urlSortQuery: sort, whitelist: ['id', 'text', 'done'] });

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
        SELECT uuid as id, device_uuid as device_id, loaningTime, dueDate, returnTime, 
        loansState, returnState, customer_uuid as customer_id, 
        loanGiver_uuid as loanGiver_id, loanReceiver_uuid as loanReceiver_id
        FROM loans
        ${orderBy}
      `);

    // Return all todos
    ctx.body = data;
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

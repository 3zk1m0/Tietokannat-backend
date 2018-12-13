
import Url from 'url';

import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';
import parseSortQuery from '../../helpers/parseSortQuery';

export default async function get(ctx) {
  const url = Url.parse(ctx.url, true);
  const { sort } = url.query;
  
  const orderBy = parseSortQuery({ urlSortQuery: sort, whitelist: ['id', 'text', 'done'] });

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
        SELECT uuid as id, text, done
        FROM todos
        ${orderBy}
      `);

    // Return all todos
    ctx.body = data;
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}


import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';


export default async function get(ctx) {
  const { id } = ctx.params;
  console.log('.get id contains:', id);

  if (typeof id !== 'string') {
    ctx.throw(400, 'id must be an integer');
  }

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data] = await conn.execute(`
          SELECT uuid as id, text, done
          FROM todos
          WHERE uuid = :id;
        `, { id });

    // Return the resource
    ctx.body = data[0];
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

import mysql from 'mysql2/promise';
import faker from 'faker';
import { connectionSettings } from '../../settings';
import helpers from '../../helpers';

const count = 20;

export default async () => {
  const conn = await mysql.createConnection(connectionSettings);
  const password = await helpers.hashPassword('Salasana');
  const userPassword = await helpers.hashPassword('basicpassword');
  const adminPassword = await helpers.hashPassword('adminpassword');
  const [data] = await conn.execute(`
          SELECT count(*) as count
          FROM users;
          `);

  let sql = 'INSERT INTO users (name, role, email, password) VALUES ';
  if (data[0].count === 0) {
    console.log('initUsers');
    for (let i = 0; i < count; i += 1) {
      sql += `("${faker.name.findName()}", '${['admin', 'user'][Math.floor(Math.random() * 2)]}', '${faker.internet.email()}', '${password}'),`;
    }
    sql += `("user", 'user', 'user@example.com', '${userPassword}'),`;
    sql += `("admin", 'admin', 'admin@example.com', '${adminPassword}'),`;
    // console.log(sql);
    conn.query(sql.slice(0, -1));
    console.log('Users Done');
  }
};

import mysql from 'mysql2/promise';
import faker from 'faker';
import { connectionSettings } from '../../settings';
import hashPassword from '../../helpers';

const count = 20;

export default async () => {
  const conn = await mysql.createConnection(connectionSettings);
  const password = await hashPassword('Salasana');
  const [data] = await conn.execute(`
          SELECT count(*) as count
          FROM users;
          `);

  if (data[0].count === 0) {
    console.log('initUsers');
    for (let i = 0; i < count; i += 1) {
      const randomName = faker.name.findName();
      const randomemail = faker.internet.email();
      const randomRole = ['admin', 'user'][Math.floor(Math.random() * 2)];

      // console.log(randomName);
      conn.execute(`
            INSERT INTO users (name, role, email, password)
            VALUES ('${randomName}', '${randomRole}', '${randomemail}', '${password}');
            `);
    }
    console.log('Done');
  }
};

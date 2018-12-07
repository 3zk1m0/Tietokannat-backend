import mysql from 'mysql2/promise';
import faker from 'faker';
import { connectionSettings } from '../../settings';

const count = 10;

export default async () => {
  console.log('initUsers');
  const conn = await mysql.createConnection(connectionSettings);

  const [data] = await conn.execute(`
          SELECT count(*) as count
          FROM users;
          `);

  if (data[0].count === 0) {
    for (let i = 0; i < count; i += 1) {
      let randomName = faker.name.findName();
      let randomUsername = faker.internet.userName();
      let randomRole = ['admin', 'user'][Math.floor(Math.random() * 2)];
      let password = '08d6c05a21512a79a1dfeb9d2a8f262f';

      conn.execute(`
            INSERT INTO users (name, role, username, password)
            VALUES ('${randomName}', '${randomRole}', '${randomUsername}', '${password}');
            `);
    }
  } else {
    console.log('Skipped');
  }
};

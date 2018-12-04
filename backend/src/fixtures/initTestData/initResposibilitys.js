import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';




export default async () => {
  console.log('initDevices');
  const conn = await mysql.createConnection(connectionSettings);

  const [devices] = await conn.execute(`
          SELECT * as count
          FROM devices;
          `);

  const [admins] = await conn.execute(`
          SELECT * as count
          FROM devices
          WHERE role = 'admin';
          `);

  let randomAdmin1;
  let randomAdmin2;

  devices.array.forEach((element) => {
    randomAdmin1 = admins[Math.floor(Math.random() * admins.length())]
    randomAdmin2 = admins[Math.floor(Math.random() * admins.length())]

    while (randomAdmin1 === randomAdmin2) {
      randomAdmin2 = admins[Math.floor(Math.random() * admins.length())]
    }

    conn.execute(`
            INSERT INTO responsibilitys (device_id, users_id)
            VALUES ('${element.id}', '${randomAdmin1.id}');
            `);
    conn.execute(`
            INSERT INTO responsibilitys (device_id, users_id)
            VALUES ('${element.id}', '${randomAdmin2.id}');
            `);
  });
};

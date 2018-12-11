import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';


export default async () => {
  
  const conn = await mysql.createConnection(connectionSettings);

  const [data] = await conn.execute(`
        SELECT count(*) as count
        FROM responsibility;
        `);

  if (data[0].count === 0) {
    console.log('initResponsibilitys');
    const [devices] = await conn.execute(`
            SELECT uuid as id, deviceName
            FROM devices;
            `);

    const [admins] = await conn.execute(`
            SELECT uuid as id, name
            FROM users
            WHERE role = 'admin';
            `);

    let randomAdmin1;
    let randomAdmin2;

    devices.forEach((element) => {
      randomAdmin1 = admins[Math.floor(Math.random() * admins.length)];
      randomAdmin2 = admins[Math.floor(Math.random() * admins.length)];
      while (randomAdmin1 === randomAdmin2) {
        randomAdmin2 = admins[Math.floor(Math.random() * admins.length)];
      }

      conn.execute(`
              INSERT INTO responsibility (device_id, user_id)
              VALUES (uuid_to_bin('${element.id}'), uuid_to_bin('${randomAdmin1.id}'));
              `);
      conn.execute(`
              INSERT INTO responsibility (device_id, user_id)
              VALUES (uuid_to_bin('${element.id}'), uuid_to_bin('${randomAdmin2.id}'));
              `);
    });
    console.log('Done');
  }
};

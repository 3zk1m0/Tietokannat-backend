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

  const [users] = await conn.execute(`
          SELECT * as count
          FROM devices
          WHERE role = 'user';
          `);


  conn.execute(`
          INSERT INTO responsibilitys (device_id, users_id)
          VALUES ('${element.id}', '${randomAdmin2.id}');
          `);
};

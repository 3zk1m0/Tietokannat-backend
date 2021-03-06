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
    const [devices] = await conn.execute('SELECT uuid as id, deviceName FROM devices;');

    const [admins] = await conn.execute('SELECT uuid as id, name FROM users WHERE role = "admin";');

    let randomAdmin1;
    let randomAdmin2;
    // console.log(admins);
    let sql = 'INSERT INTO responsibility (device_id, user_id) VALUES ';
    let count = 0;
    devices.forEach((element) => {
      randomAdmin1 = admins[Math.floor(Math.random() * admins.length)];
      randomAdmin2 = admins[Math.floor(Math.random() * admins.length)];
      while (randomAdmin1 === randomAdmin2) {
        count += 1;
        randomAdmin2 = admins[Math.floor(Math.random() * admins.length)];
      }
      sql += `(uuid_to_bin('${element.id}'), uuid_to_bin('${randomAdmin1.id}')),`;
      sql += `(uuid_to_bin('${element.id}'), uuid_to_bin('${randomAdmin2.id}')),`;
    });
    // console.log(sql.slice(0, -1));
    conn.execute(sql.slice(0, -1));
    console.log('Responsibilitys Done');
  }
};

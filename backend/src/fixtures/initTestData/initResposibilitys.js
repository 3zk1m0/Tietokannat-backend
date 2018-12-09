import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';


export default async () => {
  console.log('initResponsibilitys');
  const conn = await mysql.createConnection(connectionSettings);

  const [data] = await conn.execute(`
        SELECT count(*) as count
        FROM responsibility;
        `);

  if (data[0].count === 0) {
    const [devices] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, deviceName
            FROM devices;
            `);

    const [admins] = await conn.execute(`
            SELECT bin_to_uuid(id) as id, name
            FROM users
            WHERE role = 'admin';
            `);

    let randomAdmin1;
    let randomAdmin2;
    let adminCount = 0;
    //console.log(devices);
    //console.log(admins);

    devices.forEach((element) => { adminCount += 1; });
    devices.forEach((element) => {
      //console.log(adminCount);
      randomAdmin1 = admins[Math.floor(Math.random() * admins.length)];
      randomAdmin2 = admins[Math.floor(Math.random() * admins.length)];
      console.log(randomAdmin1);
      console.log(randomAdmin2);
      while (randomAdmin1 === randomAdmin2) {
        console.log(randomAdmin1.id + ' - ' + randomAdmin2.id);
        randomAdmin2 = admins[Math.floor(Math.random() * adminCount)];
      }
      console.log(randomAdmin1);
      console.log(randomAdmin2);

      conn.execute(`
              INSERT INTO responsibility (device_id, user_id)
              VALUES ('${element.id}', '${randomAdmin1.id}');
              `);
      conn.execute(`
              INSERT INTO responsibility (device_id, user_id)
              VALUES ('${element.id}', '${randomAdmin2.id}');
              `);
    });
  } else {
    console.log('Skipped');
  }
};

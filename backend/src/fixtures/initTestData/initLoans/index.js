import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

import initLoans from './initLoans';
import initReturned from './initReturned';


function randomDate() {
  const date = new Date();
  const start = new Date(date.setMonth(date.getMonth() - 2));
  const end = new Date(date.setMonth(date.getMonth() - 1));
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  // console.log(newDate);
  return newDate;
}

export default async () => {
  const conn = await mysql.createConnection(connectionSettings);

  const [data] = await conn.execute(`
          SELECT count(*) as count
          FROM loans;
          `);

  if (data[0].count === 0) {
    console.log('initLoans');
    const [devices] = await conn.execute('SELECT bin_to_uuid(id) as id, loantime FROM devices;');
    const [admins] = await conn.execute('SELECT bin_to_uuid(id) as id FROM users WHERE role = "admin";');
    const [users] = await conn.execute('SELECT bin_to_uuid(id) as id FROM users WHERE role = "user";');

    for (let i = 0; i < (devices.length / 2); i += 1) {
      initLoans(conn, randomDate(), devices[i],
        users[Math.floor(Math.random() * users.length)],
        admins[Math.floor(Math.random() * admins.length)]);
    }
    for (let i = 0; i < devices.length; i += 1) {
      initReturned(conn, randomDate(), devices[i],
        users[Math.floor(Math.random() * users.length)],
        admins[Math.floor(Math.random() * admins.length)],
        admins[Math.floor(Math.random() * admins.length)]);
    }
  }
};

import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';

const loanedDevices = 2;
const returnedDevices = 6;


export default async () => {
  let returned = { 
    loaningTime: '',
    dueDate: '',
    returnTime: '',
    loanState: 'Good',
    returnState: 'Almost Good',
    device_id: '',
    customer_id: '',
    loanGiver_id: '',
    loanReceiver_id: '',
  };

  let inLoan = {
    loaningTime: '',
    dueDate: '',
    loanState: 'Good',
    device_id: '',
    customer_id: '',
    loanGiver_id: '',
  };

  console.log('initDevices');
  const conn = await mysql.createConnection(connectionSettings);

  const [data] = await conn.execute(`
          SELECT count(*) as count
          FROM loans;
          `);

  if (data[0].count === 0) {
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
            INSERT INTO loans (loaningTime, dueDate, returnTime, returnState, loansState, device_id, customer_id, loanGiver_id, loanReceiver_id)
            VALUES ('${element.id}', '${element.id}', '${element.id}', '${element.id}', '${element.id}', '${element.id}', '${element.id}', '${element.id}', '${element.id}');
            `);
  }
};

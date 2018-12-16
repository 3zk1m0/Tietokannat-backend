import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';


export default async (conn, date, device, user, adminLoaner, adminReturned) => {
  const loan = {
    loaningTime: date.toISOString().split('T')[0],
    dueDate: new Date(date.setDate(date.getDate() + device.loantime)).toISOString().split('T')[0],
    returnTime: new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0],
    loanState: 'Good',
    returnState: 'Almost Good',
    device_id: device.id,
    customer_id: user.id,
    loanGiver_id: adminLoaner.id,
    loanReceiver_id: adminReturned.id,
  };

  // console.log(returned);

  conn.execute(`
    INSERT INTO loans (loaningTime, dueDate, returnTime, returnState, 
      loansState, device_id, customer_id, loanGiver_id, loanReceiver_id)
    VALUES ('${loan.loaningTime}', '${loan.dueDate}', '${loan.returnTime}', 
      '${loan.returnState}', '${loan.loanState}', uuid_to_bin('${loan.device_id}'), 
      uuid_to_bin('${loan.customer_id}'), uuid_to_bin('${loan.loanGiver_id}'), uuid_to_bin('${loan.loanReceiver_id}'));
    `);
};

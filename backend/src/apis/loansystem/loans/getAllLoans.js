import mysql from 'mysql2/promise';
import Url from 'url';
import { connectionSettings } from '../../../settings';
import parseSortQuery from '../../../helpers/parseSortQuery';

// DELETE /resource/:id
export default async function getLoans(ctx) {
  const url = Url.parse(ctx.url, true);
  const { sort } = url.query;

  const orderBy = parseSortQuery({ urlSortQuery: sort, whitelist: ['id', 'text', 'done'] });

  try {
    const conn = await mysql.createConnection(connectionSettings);
    const [data1] = await conn.execute(`
    SELECT loans.uuid as id,
    devices.deviceName as device,
    loans.loaningTime,
    loans.dueDate, loans.returnTime, 
    loans.loansState, loans.returnState,
    customerList.name as customer, 
    giverList.name as loanGiver,
    receiverList.name as loanReceiver
    FROM loans, users as customerList, users as giverList, users as receiverList, devices
    WHERE loans.device_uuid = devices.uuid
    AND loans.customer_uuid = customerList.uuid
    AND loans.loanGiver_uuid = giverList.uuid
    AND loans.loanReceiver_uuid = receiverList.uuid
        ${orderBy}
      `);
    const [data2] = await conn.execute(`
    select distinct id, device, loaningTime, dueDate, loansState, customer, loanGiver  from (SELECT distinctrow loans.uuid as id,
      devices.deviceName as device,
      loans.loaningTime,
      loans.dueDate, loans.returnTime, 
      loans.loansState, loans.returnState,
      customerList.name as customer, 
      giverList.name as loanGiver,
      receiverList.name as loanReceiver
      FROM loans, users as customerList, users as giverList, users as receiverList, devices
      WHERE loans.device_uuid = devices.uuid
      AND loans.customer_uuid = customerList.uuid
      AND loans.loanGiver_uuid = giverList.uuid
      AND loans.returnState is null) as tables
        ${orderBy}
      `);

    for (let i = 0; i < data2.length; i += 1) {
      data2[i].returnState = null;
      data2[i].loanReceiver = null;
    }
    // Return all todos
    conn.end();
    ctx.body = data1.concat(data2);
  } catch (error) {
    console.error('Error occurred:', error);
    ctx.throw(500, error);
  }
}

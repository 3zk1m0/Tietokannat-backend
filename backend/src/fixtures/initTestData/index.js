
import initUsers from './initUsers';
import initDevices from './initDevices';
import initResposibilitys from './initResposibilitys';
import initLoans from './initLoans';

export default async function initTestData() {
  await initUsers();
  await initDevices();
  await initResposibilitys();
  await initLoans();
}

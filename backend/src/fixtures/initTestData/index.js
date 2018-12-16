
import initUsers from './initUsers';
import initDevices from './initDevices';
import initResposibilitys from './initResposibilitys';
import initLoans from './initLoans';

export default function initTestData() {
  initUsers();
  initDevices();
  initResposibilitys();
  initLoans();
}

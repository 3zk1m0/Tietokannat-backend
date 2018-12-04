
import initUsers from './initUsers';
import { connectionSettings } from '../../settings';
import initDevices from './initDevices';
import initResposibilitys from './initResposibilitys';
import initLoans from './initLoans';

export default async () => {
  initUsers();
  initDevices();
  initResposibilitys();
  // initLoans();
};

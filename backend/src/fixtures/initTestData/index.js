
import initUsers from './initUsers';
import { connectionSettings } from '../../settings';
import initDevices from './initDevices';
import initResposibilitys from './initResposibilitys';
import initLoans from './initLoans';

export default async () => {
  await initUsers();
  await initDevices();
  await initResposibilitys();
  await initLoans();
};

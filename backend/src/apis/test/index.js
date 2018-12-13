import getRoute from './get';
import { apiPath } from '../constants';

export default function addRoutes(app) {
  // console.log(`${apiPath}/test`);
  app.get(`${apiPath}/test`, getRoute);
}

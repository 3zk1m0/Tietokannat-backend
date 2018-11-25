import getRoute from './get';
import { apiPath } from '../../settings';

function addRoutes(app) {
  // console.log(`${apiPath}/test`);
  app.get(`${apiPath}/test`, getRoute);
}

module.exports = addRoutes;

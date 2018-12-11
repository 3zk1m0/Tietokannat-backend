import deviceRoutes from './devices';
import loansRoutes from './loans';
import usersRoutes from './users';
import responsibilityRoute from './responsibility';
import addLoan from './addLoan';
import returnLoan from './returnLoan';

import { loansystemPath } from '../constants';
import { checkAccept, checkContent } from '../../middleware';

function addRoutes(app, koaBody) {
  console.log(koaBody);
  deviceRoutes(app, koaBody);
  loansRoutes(app, koaBody);
  usersRoutes(app, koaBody);
  responsibilityRoute(app, koaBody);
  app.post(`${loansystemPath}/addloan`, checkAccept, checkContent, koaBody, addLoan);
  app.put(`${loansystemPath}/returnloan/:id`, checkAccept, checkContent, koaBody, returnLoan);
}

module.exports = addRoutes;

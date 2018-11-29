import delRoute from './deleteLoans';
import getAllRoute from './getAllLoans';
import getSingleRoute from './getSingleLoan';
import postRoute from './postLoans';
import putRoute from './putLoans';

import { loansystemPath } from '../../../settings';
import { checkAccept, checkContent } from '../../../middleware';


function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(`${loansystemPath}/loans/:id`, delRoute);
  app.get(`${loansystemPath}/loans`, checkAccept, getAllRoute);
  app.get(`${loansystemPath}/loans/:id`, checkAccept, getSingleRoute);
  app.post(`${loansystemPath}/loans`, checkAccept, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/loans/:id`, checkAccept, checkContent, koaBody, putRoute);
}

module.exports = addRoutes;

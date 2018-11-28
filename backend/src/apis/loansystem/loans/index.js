import delRoute from './deleteLoans';
import getAllRoute from './getAllLoans';
import getSingleRoute from './getSingleLoan';
import postRoute from './postLoans';
import putRoute from './putLoans';

import { todoPath, todosPath } from '../../../settings';
import { checkAccept, checkContent } from '../../../middleware';


function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(todoPath, delRoute);
  app.get(todosPath, checkAccept, getAllRoute);
  app.get(todoPath, checkAccept, getSingleRoute);
  app.post(todosPath, checkAccept, checkContent, koaBody, postRoute);
  app.put(todoPath, checkAccept, checkContent, koaBody, putRoute);
}

module.exports = addRoutes;

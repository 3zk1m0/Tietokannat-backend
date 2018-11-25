import delRoute from './del';
import getAllRoute from './getAll';
import getSingleRoute from './getSingel';
import postRoute from './post';
import putRoute from './put';

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

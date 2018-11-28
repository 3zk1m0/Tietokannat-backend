import delRoute from './deleteDevices';
import getAllRoute from './getAllDevices';
import getSingleRoute from './getSingleDevice';
import postRoute from './postDevices';
import putRoute from './putDevices';

import { todoPath, todosPath } from '../../../settings';
import { checkAccept, checkContent } from '../../../middleware';


function addRoutes(app, koaBody) {
  app.del(todoPath, delRoute);
  app.get(todosPath, checkAccept, getAllRoute);
  app.get(todoPath, checkAccept, getSingleRoute);
  app.post(todosPath, checkAccept, checkContent, koaBody, postRoute);
  app.put(todoPath, checkAccept, checkContent, koaBody, putRoute);
}

module.exports = addRoutes;

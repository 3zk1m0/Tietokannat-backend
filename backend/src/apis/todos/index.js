

import delRoute from './del';
import getAllRoute from './getAll';
import getSingleRoute from './getSingel';
import postRoute from './post';
import putRoute from './put';
import patchRoute from './patch';

import { todoPath, todosPath } from '../constants';
import { checkAccept, checkContent, jwt } from '../../middleware';


export default function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(todoPath, delRoute, jwt);
  app.get(todosPath, checkAccept, jwt, getAllRoute);
  app.get(todoPath, checkAccept, jwt, getSingleRoute);
  app.post(todosPath, checkAccept, checkContent, jwt, koaBody, postRoute);
  app.put(todoPath, checkAccept, checkContent, jwt, koaBody, putRoute);
  app.patch(todoPath, checkAccept, checkContent, jwt, koaBody, patchRoute);
}

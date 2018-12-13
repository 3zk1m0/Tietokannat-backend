

import delRoute from './del';
import getAllRoute from './getAll';
import getSingleRoute from './getSingel';
import postRoute from './post';
import putRoute from './put';
import patchRoute from './patch';

import { todoPath, todosPath } from '../constants';
import { checkAccept, checkContent } from '../../middleware';


export default function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(todoPath, delRoute);
  app.get(todosPath, checkAccept, getAllRoute);
  app.get(todoPath, checkAccept, getSingleRoute);
  app.post(todosPath, checkAccept, checkContent, koaBody, postRoute);
  app.put(todoPath, checkAccept, checkContent, koaBody, putRoute);
  app.patch(todoPath, checkAccept, checkContent, koaBody, patchRoute);
}

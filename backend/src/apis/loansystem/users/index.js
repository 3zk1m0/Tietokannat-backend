import delRoute from './deleteUsers';
import getAllRoute from './getAllUsers';
import getSingleRoute from './getSingleUser';
import postRoute from './postUsers';
import putRoute from './putUser';
import patchRoute from './patchUsers';

import { loansystemPath } from '../../constants';
import { checkAccept, checkContent } from '../../../middleware';


export default function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(`${loansystemPath}/users/:id`, delRoute);
  app.get(`${loansystemPath}/users`, checkAccept, getAllRoute);
  app.get(`${loansystemPath}/users/:id`, checkAccept, getSingleRoute);
  app.post(`${loansystemPath}/users`, checkAccept, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/users/:id`, checkAccept, checkContent, koaBody, putRoute);
  app.patch(`${loansystemPath}/users/:id`, checkAccept, checkContent, koaBody, patchRoute);
}

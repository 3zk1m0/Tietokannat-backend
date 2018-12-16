import delRoute from './deleteUsers';
import getAllRoute from './getAllUsers';
import getSingleRoute from './getSingleUser';
import postRoute from './postUsers';
import putRoute from './putUser';
import patchRoute from './patchUsers';
import getSelfRoute from './getSelf';

import { loansystemPath } from '../../constants';
import {
  checkAccept,
  checkContent,
  checkRole,
  jwt,
} from '../../../middleware';


export default function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(`${loansystemPath}/users/:id`, delRoute, jwt, checkRole);
  app.get(`${loansystemPath}/users`, checkAccept, jwt, checkRole, getAllRoute);
  app.get(`${loansystemPath}/users/:id`, checkAccept, jwt, checkRole, getSingleRoute);
  app.post(`${loansystemPath}/users`, checkAccept, jwt, checkRole, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/users/:id`, checkAccept, jwt, checkRole, checkContent, koaBody, putRoute);
  app.patch(`${loansystemPath}/users/:id`, checkAccept, jwt, checkRole, checkContent, koaBody, patchRoute);
  app.get(`${loansystemPath}/ownuser`, checkAccept, jwt, getSelfRoute);
}

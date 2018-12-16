import delRoute from './deleteResponsibility';
import getAllRoute from './getAllResponsibility';
import getSingleRoute from './getSingleResponsibility';
import postRoute from './postResponsibility';
import putRoute from './putResponsibility';
import patchRoute from './patchResponsibility';

import { loansystemPath } from '../../constants';
import {
  checkAccept,
  checkContent,
  checkRole,
  jwt,
} from '../../../middleware';


export default function addRoutes(app, koaBody) {
  app.del(`${loansystemPath}/responsibility/:id`, jwt, checkRole, delRoute);
  app.get(`${loansystemPath}/responsibility`, checkAccept, jwt, checkRole, getAllRoute);
  app.get(`${loansystemPath}/responsibility/:id`, checkAccept, jwt, checkRole, getSingleRoute);
  app.post(`${loansystemPath}/responsibility`, checkAccept, checkContent, jwt, checkRole, koaBody, postRoute);
  app.put(`${loansystemPath}/responsibility/:id`, checkAccept, checkContent, jwt, checkRole, koaBody, putRoute);
  app.patch(`${loansystemPath}/responsibility/:id`, checkAccept, checkContent, jwt, checkRole, koaBody, patchRoute);
}

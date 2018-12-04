import delRoute from './deleteUsers';
import getAllRoute from './getAllUsers';
import getSingleRoute from './getSingleUser';
import postRoute from './postUsers';
import putRoute from './putUsers';

import { loansystemPath } from '../../constants';
import { checkAccept, checkContent } from '../../../middleware';


function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(`${loansystemPath}/users/:id`, delRoute);
  app.get(`${loansystemPath}/users`, checkAccept, getAllRoute);
  app.get(`${loansystemPath}/users/:id`, checkAccept, getSingleRoute);
  app.post(`${loansystemPath}/users`, checkAccept, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/users/:id`, checkAccept, checkContent, koaBody, putRoute);
}

module.exports = addRoutes;

import delRoute from './deleteResponsibility';
import getAllRoute from './getAllResponsibility';
import getSingleRoute from './getSingleResponsibility';
import postRoute from './postResponsibility';
import putRoute from './putResponsibility';

import { loansystemPath } from '../../constants';
import { checkAccept, checkContent } from '../../../middleware';


export default function addRoutes(app, koaBody) {
  app.del(`${loansystemPath}/responsibility/:id`, delRoute);
  app.get(`${loansystemPath}/responsibility`, checkAccept, getAllRoute);
  app.get(`${loansystemPath}/responsibility/:id`, checkAccept, getSingleRoute);
  app.post(`${loansystemPath}/responsibility`, checkAccept, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/responsibility/:id`, checkAccept, checkContent, koaBody, putRoute);
}

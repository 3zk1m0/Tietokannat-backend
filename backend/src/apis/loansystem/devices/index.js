import delRoute from './deleteDevices';
import getAllRoute from './getAllDevices';
import getSingleRoute from './getSingleDevice';
import postRoute from './postDevices';
import putRoute from './putDevices';

import { loansystemPath } from '../../constants';
import { checkAccept, checkContent } from '../../../middleware';


export default function addRoutes(app, koaBody) {
  app.del(`${loansystemPath}/devices/:id`, delRoute);
  app.get(`${loansystemPath}/devices`, checkAccept, getAllRoute);
  app.get(`${loansystemPath}/devices/:id`, checkAccept, getSingleRoute);
  app.post(`${loansystemPath}/devices`, checkAccept, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/devices/:id`, checkAccept, checkContent, koaBody, putRoute);
}

import delRoute from './deleteDevices';
import getAllRoute from './getAllDevices';
import getSingleRoute from './getSingleDevice';
import postRoute from './postDevices';
import putRoute from './putDevices';
import patchRoute from './patchdevices';
import getDeviceStatusRoute from './getDeviceStatus';

import { loansystemPath } from '../../constants';
import {
  checkAccept,
  checkContent,
  checkRole,
  jwt,
} from '../../../middleware';


export default function addRoutes(app, koaBody) {
  app.del(`${loansystemPath}/devices/:id`, jwt, checkRole, delRoute);
  app.get(`${loansystemPath}/devices`, checkAccept, jwt, getAllRoute);
  app.get(`${loansystemPath}/devices/:id`, checkAccept, jwt, getSingleRoute);
  app.post(`${loansystemPath}/devices`, checkAccept, jwt, checkRole, checkContent, koaBody, postRoute);
  app.put(`${loansystemPath}/devices/:id`, checkAccept, jwt, checkRole, checkContent, koaBody, putRoute);
  app.patch(`${loansystemPath}/devices/:id`, checkAccept, jwt, checkRole, checkContent, koaBody, patchRoute);
  app.get(`${loansystemPath}/devices/state/:id`, checkAccept, jwt, getDeviceStatusRoute);
}

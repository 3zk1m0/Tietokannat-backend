import delRoute from './deleteLoans';
import getAllRoute from './getAllLoans';
import getSingleRoute from './getSingleLoan';
import postRoute from './postLoans';
import putRoute from './putLoans';
import patchRoute from './patchLoans';
import ownLoanRoute from './getOwnLoans';
import addLoanRoute from './addLoan';
import returnLoanRoute from './returnLoan';

import { loansystemPath } from '../../constants';
import {
  checkAccept,
  checkContent,
  checkRole,
  jwt,
} from '../../../middleware';


export default function addRoutes(app, koaBody) {
  // console.log(apiPath);
  app.del(`${loansystemPath}/loans/:id`, jwt, checkRole, delRoute);
  app.get(`${loansystemPath}/loans`, checkAccept, jwt, checkRole, getAllRoute);
  app.get(`${loansystemPath}/loans/:id`, checkAccept, jwt, checkRole, getSingleRoute);
  app.post(`${loansystemPath}/loans`, checkAccept, checkContent, jwt, checkRole, koaBody, postRoute);
  app.put(`${loansystemPath}/loans/:id`, checkAccept, checkContent, jwt, checkRole, koaBody, putRoute);
  app.patch(`${loansystemPath}/loans/:id`, checkAccept, checkContent, jwt, checkRole, koaBody, patchRoute);
  app.post(`${loansystemPath}/addloan`, checkAccept, checkContent, jwt, checkRole, koaBody, addLoanRoute);
  app.put(`${loansystemPath}/returnloan/:id`, checkAccept, checkContent, jwt, checkRole, koaBody, returnLoanRoute);
  app.get(`${loansystemPath}/ownloans`, checkAccept, ownLoanRoute);
}

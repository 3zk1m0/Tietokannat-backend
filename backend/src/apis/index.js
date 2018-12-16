import loansystemRoutes from './loansystem';
import testRoutes from './test';
import todosRoutes from './todos';
import postLoginRoute from './postLogin';
import { checkAccept, checkContent } from '../middleware';

export default function addRoutes(app, koaBody) {
  loansystemRoutes(app, koaBody);
  testRoutes(app, koaBody);
  todosRoutes(app, koaBody);
  app.post('/api/v1/login', checkAccept, checkContent, koaBody, postLoginRoute);
}

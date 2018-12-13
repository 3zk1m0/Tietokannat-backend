import loansystemRoutes from './loansystem';
import testRoutes from './test';
import todosRoutes from './todos';

export default function addRoutes(app, koaBody) {
  loansystemRoutes(app, koaBody);
  testRoutes(app, koaBody);
  todosRoutes(app, koaBody);
}

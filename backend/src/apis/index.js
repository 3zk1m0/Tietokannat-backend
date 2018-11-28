import loansystemRoutes from './loansystem';
import testRoutes from './test';
import todosRoutes from './todos';

function addRoutes(app, koaBody) {
  // console.log(apiPath);
  loansystemRoutes(app, koaBody);
  testRoutes(app, koaBody);
  todosRoutes(app, koaBody);
}

module.exports = addRoutes;

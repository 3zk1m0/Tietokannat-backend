import deviceRoutes from './devices';
import loansRoutes from './loans';
import usersRoutes from './users';


function addRoutes(app, koaBody) {
  console.log('Loansystem');
  deviceRoutes(app, koaBody);
  loansRoutes(app, koaBody);
  usersRoutes(app, koaBody);
}

module.exports = addRoutes;

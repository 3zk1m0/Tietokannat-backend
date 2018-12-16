import deviceRoutes from './devices';
import loansRoutes from './loans';
import usersRoutes from './users';
import responsibilityRoute from './responsibility';


export default function addRoutes(app, koaBody) {
  deviceRoutes(app, koaBody);
  loansRoutes(app, koaBody);
  usersRoutes(app, koaBody);
  responsibilityRoute(app, koaBody);
}

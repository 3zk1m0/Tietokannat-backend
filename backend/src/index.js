import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-bodyparser';
import KoaCors from '@koa/cors';

import helpers from './helpers';
import fixtures from './fixtures';

import addRoutes from './apis';

console.log(helpers.databaseReady);

// Initialize database
(async () => {
  await helpers.databaseReady();
  await fixtures.initDB();
  await fixtures.initTestData();
})();
// The port that this server will run on, defaults to 9000
const port = process.env.PORT || 9000;

// Instantiate a Koa server
const app = new Koa();
const koaBody = new KoaBody();

// Instantiate routers
const loansystem = new Router();


// ????  ALL ROUTES added to todos ????
addRoutes(loansystem, koaBody);

app.use(KoaCors());
app.use(loansystem.routes());
app.use(loansystem.allowedMethods());

// Start the server and keep listening on port until stopped
app.listen(port);

console.log(`App listening on port ${port}`);
// console.log(loansystem.stack.map(i => i.path));

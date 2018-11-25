import 'babel-polyfill';
import mysql from 'mysql2/promise';
import Koa from 'koa';
import Router from 'koa-router';
import KoaBody from 'koa-bodyparser';
import Url from 'url';

import { connectionSettings, apiPath } from './settings';
import { databaseReady } from './helpers';
import { initDB } from './fixtures';

import testRoutes from './apis/test';
import todoRoutes from './apis/todos';

import { checkAccept, checkContent } from './middleware';


// Initialize database
(async () => {
  await databaseReady();
  await initDB();
})();

// The port that this server will run on, defaults to 9000
const port = process.env.PORT || 9000;

// Instantiate a Koa server
const app = new Koa();
const koaBody = new KoaBody();

// Instantiate routers
const test = new Router();
const todos = new Router();
const loansystem = new Router();


testRoutes(test);
todoRoutes(todos, koaBody);


app.use(test.routes());
app.use(test.allowedMethods());
app.use(todos.routes());
app.use(todos.allowedMethods());
app.use(loansystem.routes());
app.use(loansystem.allowedMethods());

// Start the server and keep listening on port until stopped
app.listen(port);

console.log(`App listening on port ${port}`);

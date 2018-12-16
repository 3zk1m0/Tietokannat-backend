import jwt from 'koa-jwt';

export default jwt({
  secret: process.env.SECRET || 'A very secret key', // Should not be hardcoded
});

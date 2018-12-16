import jwt from 'koa-jwt';

export default jwt({
  secret: 'A very secret key', // Should not be hardcoded
});


export default function postUserBody(ctx, body) {
  if (typeof body.id === 'undefined') {
    ctx.throw(400, 'body.id required');
  } else if (typeof body.name === 'undefined') {
    ctx.throw(400, 'body.name required');
  } else if (typeof body.role === 'undefined') {
    ctx.throw(400, 'body.role required');
  } else if (typeof body.username === 'undefined') {
    ctx.throw(400, 'body.username required');
  } else if (typeof body.password === 'undefined') {
    ctx.throw(400, 'body.password required');
  } else if (typeof body.id !== 'string') {
    ctx.throw(400, 'body.id must be string');
  } else if (typeof body.name !== 'string') {
    ctx.throw(400, 'body.name must be string');
  } else if (typeof body.role !== 'string') {
    ctx.throw(400, 'body.role must be string');
  } else if (typeof body.username !== 'string') {
    ctx.throw(400, 'body.username must be string');
  } else if (typeof body.password !== 'string') {
    ctx.throw(400, 'body.password must be string');
  }
}

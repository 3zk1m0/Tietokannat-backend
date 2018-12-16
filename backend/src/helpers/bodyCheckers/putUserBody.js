
export default function putUserBody(ctx, id, body) {
  if (typeof id === 'undefined') {
    ctx.throw(400, 'id required');
  } else if (typeof body.name === 'undefined') {
    ctx.throw(400, 'body.name required');
  } else if (typeof body.role === 'undefined') {
    ctx.throw(400, 'body.role required');
  } else if (typeof body.email === 'undefined') {
    ctx.throw(400, 'body.email required');
  } else if (typeof body.password === 'undefined') {
    ctx.throw(400, 'body.password required');
  } else if (typeof id !== 'string') {
    ctx.throw(400, 'id must be string');
  } else if (typeof body.name !== 'string') {
    ctx.throw(400, 'body.name must be string');
  } else if (typeof body.role !== 'string') {
    ctx.throw(400, 'body.role must be string');
  } else if (typeof body.email !== 'string') {
    ctx.throw(400, 'body.email must be string');
  } else if (typeof body.password !== 'string') {
    ctx.throw(400, 'body.password must be string');
  }
}

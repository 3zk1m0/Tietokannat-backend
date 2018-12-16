
export default function postResponsibilityBody(ctx, body) {
  if (typeof body.user_id === 'undefined') {
    ctx.throw(400, 'body.user_id required');
  } else if (typeof body.device_id === 'undefined') {
    ctx.throw(400, 'body.device_id required');
  } else if (typeof body.user_id !== 'string') {
    ctx.throw(400, 'body.user_id must be string');
  } else if (typeof body.device_id !== 'string') {
    ctx.throw(400, 'body.device_id must be string');
  }
}

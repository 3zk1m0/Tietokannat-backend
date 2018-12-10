
export default function loanbody(ctx, body) {
  if (typeof body.device_id === 'undefined') {
    ctx.throw(400, 'body.device_id required');
  } else if (typeof body.customer_id === 'undefined') {
    ctx.throw(400, 'body.customer_id required');
  } else if (typeof body.loanGiver_id === 'undefined') {
    ctx.throw(400, 'body.loanGiver_id required');
  } else if (typeof body.device_id !== 'string') {
    ctx.throw(400, 'body.device_id must be string');
  } else if (typeof body.customer_id !== 'string') {
    ctx.throw(400, 'body.customer_id must be string');
  } else if (typeof body.loanGiver_id !== 'string') {
    ctx.throw(400, 'body.loanGiver_id must be string');
  }
}

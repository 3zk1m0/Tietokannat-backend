
export default function returnBody(ctx, body) {
  if (typeof body.id === 'undefined') {
    ctx.throw(400, 'body.id required');
  } else if (typeof body.returnState === 'undefined') {
    ctx.throw(400, 'body.returnState required');
  } else if (typeof body.loanReceiver_id === 'undefined') {
    ctx.throw(400, 'body.loanReceiver_id required');
  } else if (typeof body.id !== 'string') {
    ctx.throw(400, 'body.id must be string');
  } else if (typeof body.returnState !== 'string') {
    ctx.throw(400, 'body.returnState must be string');
  } else if (typeof body.loanReceiver_id !== 'string') {
    ctx.throw(400, 'body.loanReceiver_id must be string');
  }
}


export default function postLoanBody(ctx, body) {
  if (typeof body.loaningTime === 'undefined') {
    ctx.throw(400, 'body.loaningTime required');
  } else if (typeof body.dueDate === 'undefined') {
    ctx.throw(400, 'body.dueDate required');
  } else if (typeof body.returnTime === 'undefined') {
    ctx.throw(400, 'body.returnTime required');
  } else if (typeof body.returnState === 'undefined') {
    ctx.throw(400, 'body.returnState required');
  } else if (typeof body.loansState === 'undefined') {
    ctx.throw(400, 'body.loansState required');
  } else if (typeof body.device_id === 'undefined') {
    ctx.throw(400, 'body.device_id required');
  } else if (typeof body.customer_id === 'undefined') {
    ctx.throw(400, 'body.customer_id required');
  } else if (typeof body.loanGiver_id === 'undefined') {
    ctx.throw(400, 'body.loanGiver_id required');
  } else if (typeof body.loanReceiver_id === 'undefined') {
    ctx.throw(400, 'body.loanReceiver_id required');
  } else if (typeof body.loaningTime !== 'string') {
    ctx.throw(400, 'body.loaningTime must be string');
  } else if (typeof body.dueDate !== 'string') {
    ctx.throw(400, 'body.dueDate must be string');
  } else if (typeof body.returnTime !== 'string') {
    ctx.throw(400, 'body.returnTime must be string');
  } else if (typeof body.returnState !== 'string') {
    ctx.throw(400, 'body.returnState must be string');
  } else if (typeof body.loansState !== 'string') {
    ctx.throw(400, 'body.loansState must be string');
  } else if (typeof body.device_id !== 'string') {
    ctx.throw(400, 'body.device_id must be string');
  } else if (typeof body.customer_id !== 'string') {
    ctx.throw(400, 'body.customer_id must be string');
  } else if (typeof body.loanGiver_id !== 'string') {
    ctx.throw(400, 'body.loanGiver_id must be string');
  } else if (typeof body.loanReceiver_id !== 'string') {
    ctx.throw(400, 'body.loanReceiver_id must be string');
  }
}


export default function postDeviceBody(ctx, body) {
  if (typeof body.deviceName === 'undefined') {
    ctx.throw(400, 'body.deviceName required');
  } else if (typeof body.deviceInfo === 'undefined') {
    ctx.throw(400, 'body.deviceInfo required');
  } else if (typeof body.loantime === 'undefined') {
    ctx.throw(400, 'body.loantime required');
  } else if (typeof body.deviceName !== 'string') {
    ctx.throw(400, 'body.deviceName must be string');
  } else if (typeof body.deviceInfo !== 'string') {
    ctx.throw(400, 'body.deviceInfo must be string');
  } else if (typeof body.loantime !== 'number') {
    ctx.throw(400, 'body.loantime must be number');
  }
}

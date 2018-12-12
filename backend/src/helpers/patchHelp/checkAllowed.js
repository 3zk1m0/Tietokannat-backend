
export default function checkAllowed(ctx, body, allowed) {

  body.array.forEach((element) => {
    if (!allowed.path.includes(element.path.substring(1))) {
      ctx.throw(400, 'Path is not allowed');
    } else if (typeof allowed.valueType[element.path.substring(1)] !== typeof element.value) {
      ctx.throw(400, 'value type is not allowed');
    }
  });
}

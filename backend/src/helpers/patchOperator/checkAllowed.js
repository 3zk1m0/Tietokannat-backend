
export default function checkAllowed(ctx, body, allowed) {
  body.forEach((element) => {
    if (!allowed.op.includes(element.op)) {
      ctx.throw(400, `Operation ${element.op} is not allowed`);
    } else if (!allowed.path.includes(element.path)) {
      ctx.throw(400, `Path ${element.path} is not allowed`);
    } else if (typeof allowed.value[
      allowed.path.indexOf(element.path)] !== typeof element.value) {

      ctx.throw(400, `value type ${typeof element.value} is not allowed, ${typeof allowed.value[allowed.path.indexOf(element.path)]} is needed`);
    }
  });
}

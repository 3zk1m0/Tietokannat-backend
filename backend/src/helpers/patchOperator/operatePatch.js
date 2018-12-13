
export default function operatePatch(ctx, body, data) {
  const tmpData = data;
  const tmpBody = body;

  body.forEach((element, index) => {
    if (element.path.slice(-2) === 'id') {
      tmpBody[index].path = `${element.path.substring(0, element.path.length - 2)}uuid`;
    } else {
      tmpBody[index].path = element.path;
    }
  });

  body.forEach((element) => {
    tmpData[element.path.substring(1)] = element.value;
  });
  return tmpData;
}

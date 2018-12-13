import checkAllowed from './checkAllowed';
import operatePatch from './operatePatch';

export default function checkPatchBody(ctx, body, data, allowed) {
  checkAllowed(ctx, body, allowed);
  return operatePatch(ctx, body, data);
}

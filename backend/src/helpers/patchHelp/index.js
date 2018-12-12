import checkAllowed from './checkAllowed';


export default function checkPatchBody(ctx, body, allowed) {
  checkAllowed(ctx, body, allowed);
}

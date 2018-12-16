import bcrypt from 'bcryptjs';


export default function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

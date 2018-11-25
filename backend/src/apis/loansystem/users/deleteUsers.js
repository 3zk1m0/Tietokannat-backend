import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
async function deleteUsers(ctx) {
  return 'Delete users';
}

module.exports = deleteUsers;

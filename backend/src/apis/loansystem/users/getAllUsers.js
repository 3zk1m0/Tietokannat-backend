import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
async function getAllUsers(ctx) {
  return 'Get All Users';
}

module.exports = getAllUsers;

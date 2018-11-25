import mysql from 'mysql2/promise';
import { connectionSettings } from '../../../settings';

// DELETE /resource/:id
async function deleteLoans(ctx) {
  return 'Delete Loans';
}

module.exports = deleteLoans;

// Define Mysql connection
export const connectionSettings = {
  host: 'db',
  user: 'root',
  database: 'db_1',
  password: 'db_rootpass',
  namedPlaceholders: true,
};

// Define API path
export const apiPath = '/api/v1';

// Define todos paths
export const todosPath = `${apiPath}/todos`;
export const todoPath = `${todosPath}/:id`;


export const loansystemPath = `${apiPath}/loansystem`;

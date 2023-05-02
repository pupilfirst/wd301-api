require('dotenv').config()
module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "wd301_api_dev",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};
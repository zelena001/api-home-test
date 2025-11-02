import { apiPath } from "./apiPath";

// config/env.js
const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    BASE_URL: "http://localhost:8080",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_USER: "dev_user",
    DB_PASSWORD: "dev_pass",
    DB_NAME: "transfer_dev",
  },
  test: {
    BASE_URL: "https://jsonplaceholder.typicode.com",
    DB_HOST: "sql12.freemysqlhosting.net", //attempt to test db connection, doesn't work yet
    DB_PORT: 3306,
    DB_USER: "sql1234567",
    DB_PASSWORD: "abcd1234",
    DB_NAME: "sql1234567",
  },
};

export default config[env];

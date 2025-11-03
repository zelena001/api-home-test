// config/env.js
const env = process.env.NODE_ENV || "development";
// assume it should support multiple environments like development, test, production
const config = {
  development: {
    BASE_URL: "http://localhost:8080",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_USER: "dev_user",
    DB_PASSWORD: "dev_pass",
    DB_NAME: "transfer_dev",
  },
  staging: {
    BASE_URL: "http://staging:8080",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_USER: "stg_user",
    DB_PASSWORD: "stg_pass",
    DB_NAME: "transfer_staging",
  },
  // this part of script is implement to verify concept on environment based config loading of the framework, actual project won't need this
    test: {
    BASE_URL: "https://jsonplaceholder.typicode.com",
        DB_HOST: "sql12.freemysqlhosting.net", //attempt to test db connection with public database, doesn't work yet
    DB_PORT: 3306,
    DB_USER: "sql1234567",
    DB_PASSWORD: "abcd1234",
    DB_NAME: "sql1234567",
    }
};

export default config[env];

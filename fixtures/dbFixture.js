// import { test as base } from "@playwright/test";
// import mysql from "mysql2/promise";
// import config from "../config/env.js";

// /**
//  * Extend Playwright's base test with a reusable DB connection fixture
//  */
// export const test = base.extend({
//   db: async ({}, use) => {
//     let connection;
//     try {
//       // 🧩 Debug: Log config info (mask sensitive fields)
//       console.log("🧠 Loaded DB Config:", {
//         host: config.DB_HOST,
//         port: config.DB_PORT,
//         user: config.DB_USER,
//         password: config.DB_PASSWORD ? "***MASKED***" : "NOT SET",
//         database: config.DB_NAME,
//       });

//       console.log("🟢 Connecting to DB...");

//       connection = await mysql.createConnection({
//         host: config.DB_HOST,
//         port: config.DB_PORT,
//         user: config.DB_USER,
//         password: config.DB_PASSWORD,
//         database: config.DB_NAME,
//       });

//       // ✅ Provide the connection to the test
//       await use(connection);
//     } catch (error) {
//       console.error("❌ Failed to connect to DB:", error.message);
//       console.error("🔍 Stack Trace:", error.stack);
//       throw error;
//     } finally {
//       if (connection) {
//         await connection.end();
//         console.log("🔴 DB connection closed.");
//       }
//     }
//   },
// });

export { expect } from "@playwright/test";
export{ test } from "@playwright/test"; // for test skipping db connection 
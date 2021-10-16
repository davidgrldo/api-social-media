import pgp from "pg-promise";
import Promise from "bluebird";
require("dotenv").config();

const systemDB = {
  client: "pg",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    IdleTimeoutMillis: 6000,
  },
  pool: {
    min: 0,
    max: 1000,
  },
  acquireConnectionTimeout: 10000,
};

const pgPromise = pgp({
  promiseLib: Promise,
  async connect(client, dc, useCount) {
    if (useCount === 0 && dc && dc.email) {
      const email = encodeURI(dc.email);
      await client.query(`SET SESSION "app.user" = '${email}'`);
    }
  },
});

const mainDB = pgPromise(systemDB.connection);
export default mainDB;

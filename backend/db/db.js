const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: process.env.PASSWORD_DB,
  host: process.env.HOST,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB,
});

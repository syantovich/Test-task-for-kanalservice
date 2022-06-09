const Pool = require("pg-pool");
const pool = new Pool({
  user: process.env.USER_DB||"postgres",
  password: process.env.PASSWORD_DB,
  host:process.env.HOST||"localhost",
  port: process.env.PORT_DB||5432,
  database: process.env.NAME_DB,
});
module.exports=pool;

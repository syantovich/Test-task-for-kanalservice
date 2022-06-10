const express = require("express");
const cors = require("cors");

//to work with server you must create file .env in this folder
//PORT_SERVER=*** default 8080
// PASSWORD_DB="********"
// HOST="*****" default localhost
// USER_DB="*****" default postgres
// PORT_DB=**** default 5432
// NAME_DB="*****"
// NAME_TABLE="*****"
require("dotenv").config();
const tableRouter = require("./routs/tableRouts");

const PORT = process.env.PORT_SERVER || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", tableRouter);
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

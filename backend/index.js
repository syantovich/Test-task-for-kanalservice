const express = require("express");

require("dotenv").config();
const tableRouter = require("./routs/tableRouts");

const PORT = process.env.PORT_SERVER || 8080;
const app = express();

app.use(express.json());
app.use("/", tableRouter);
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

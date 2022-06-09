const express = require("express");
const cors = require("cors");

require("dotenv").config();
const tableRouter = require("./routs/tableRouts");

const PORT = process.env.PORT_SERVER || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", tableRouter);
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

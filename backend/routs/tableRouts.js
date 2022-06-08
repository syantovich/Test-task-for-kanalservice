const Router = require("express");
const router = new Router();
const tableController = require("../controller/tableController");

router.post("/element", tableController.createElement);

module.exports = router;

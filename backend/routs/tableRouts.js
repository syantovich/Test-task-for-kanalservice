const Router = require("express");
const router = new Router();
const tableController = require("../controller/tableController");

router.post("/elementCreate", tableController.createElement);
router.post("/element/:p/:lim", tableController.getElements);

module.exports = router;

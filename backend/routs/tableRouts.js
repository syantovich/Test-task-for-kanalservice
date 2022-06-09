const Router = require("express");
const router = new Router();
const tableController = require("../controller/tableController");

router.post("/element", tableController.createElement);
router.get("/element/:p/:lim", tableController.getElements);

module.exports = router;

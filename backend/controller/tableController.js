const functions = require("../usefullFunctions/usefullFunctions");

class TableController {
  async createElement(req, res) {
    const { date, numberOf, name, distance } = req.body;

    res.send(functions.checkData(req.body));
  }
}
module.exports = new TableController();

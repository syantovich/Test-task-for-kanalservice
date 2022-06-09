const functions = require("../usefullFunctions/usefullFunctions");
const db = require("../db/db");

class TableController {
  async createElement(req, res) {
    try {
      const { date, numberOf, name, distance } = req.body;

      if (functions.checkData(req.body) === true) {
        const addingToDB = await db.query(
          `INSERT INTO ${process.env.NAME_TABLE}(date,numberOf,name,distance) values ($1,$2,$3,$4) RETURNING *`,
          [new Date(date), +numberOf, name, +distance]
        );
        console.log(addingToDB.rows[0].id);
        res.send(addingToDB.rows[0]);
      }
    } catch (e) {
      res.send("Somthing wrong");
      res.status(404);
    }
  }
  async getElements(req, res) {
    try {
      let { p = 1, lim = 10 } = req.params;
      let count = await db.query(
        `SELECT count(*) FROM ${process.env.NAME_TABLE}`
      );
      count = count.rows[0].count;
      console.log((p - 1) * lim);
      if (count <= (p - 1) * lim) {
        p = Math.floor(count / lim);
        console.log(p);
      }
      const allDB = await db.query(
        `SELECT * from ${process.env.NAME_TABLE} OFFSET ${
          (p - 1) * lim
        } LIMIT ${lim}`
      );

      res.send({ elements: allDB.rows, maxPage: Math.floor(count / lim) });
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new TableController();

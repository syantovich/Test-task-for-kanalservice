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
        res.send(addingToDB.rows[0]);
      }
    } catch (e) {
      res.send("Somthing wrong");
      res.status(404);
    }
  }
  async getElements(req, res) {
    try {
      const { column, condition, text, wm } = req.body;
      let settingString;
      let filter = false;
      switch (column) {
        case "name": {
          switch (condition) {
            case "=": {
              filter = "=";
              settingString = ``;
              break;
            }
            case "includes": {
              filter = "includes";
              settingString = ``;
              break;
            }
          }
          break;
        }
        case "numberOf": {
          switch (condition) {
            case "=": {
              settingString = `where  numberOf = ${text}`;
              break;
            }
            case "<": {
              settingString = ` GROUP BY numberOf,id HAVING numberOf${condition}${text}`;
              break;
            }
            case ">": {
              settingString = ` GROUP BY numberOf,id HAVING numberOf${condition}${text}`;
              break;
            }
          }
          break;
        }
        case "distance": {
          switch (condition) {
            case "=": {
              const nameText = `${text}`;
              settingString = `where  distance = ${nameText}`;
              break;
            }
            case "<": {
              settingString = `GROUP BY distance,id HAVING distance ${condition} ${text}`;
              break;
            }
            case ">": {
              settingString = `GROUP BY distance,id HAVING distance ${condition} ${text}`;
              break;
            }
          }
          break;
        }
        default: {
          settingString = "";
          break;
        }
      }
      let { p = 1, lim = 10 } = req.params;

      let params = "*";

      let count = await db.query(
        `SELECT ${params} FROM ${process.env.NAME_TABLE} ${settingString}`
      );

      switch (filter) {
        case "=":
          count.rows = count.rows.filter((e) => e.name === text);
          break;
        case "includes":
          count.rows = count.rows.filter((e) => {
            return e.name.includes(text);
          });
          break;
      }

      if (wm !== "count") {
        const maxPage = count.rows.length;
        count.rows = count.rows.filter(
          (e, i) => i >= (p - 1) * lim && i < p * lim
        );
        if (count < (p - 1) * lim) {
          p = Math.floor(count / lim);
        }
        switch (filter) {
          case "=":
            {
              res.send({
                elements: count.rows.filter(
                  (e, i) => i >= (p - 1) * lim && i < p * lim
                ),
                maxPage: Math.ceil(maxPage / lim),
                page: p,
              });
            }
            break;
          case "includes":
            {
              let filteredArr = count.rows.filter(
                (e, i) => i >= (p - 1) * lim && i < p * lim
              );
              res.send({
                elements: filteredArr.length > 0 ? filteredArr : null,
                maxPage: Math.ceil(maxPage / lim),
                page: p,
              });
            }
            break;
          default:
            {
              const allDB = await db.query(
                `SELECT * from ${process.env.NAME_TABLE} ${settingString}  `
              );
              let filteredArr = allDB.rows.filter((e, i) => {
                return i >= (p - 1) * lim && i < p * lim;
              });

              res.send({
                elements: filteredArr.length > 0 ? filteredArr : null,
                maxPage: Math.ceil(maxPage / lim),
                page: p,
              });
            }
            break;
        }
      } else {
        res.send({ maxPage: count.rows.length, page: p });
      }
    } catch (e) {
      console.log(e);
      res.send({ maxPage: 0, elements: null, page: 1 });
    }
  }
}
module.exports = new TableController();

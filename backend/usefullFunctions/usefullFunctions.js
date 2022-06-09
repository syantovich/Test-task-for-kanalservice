const usefullFunctions = {
  checkData({ date, numberOf, name, distance }) {
    const newDate = new Date(date) != "Invalid Date";
    const newNumberOf = +numberOf % Number.parseInt(+numberOf) === 0;
    const newDistanc = +distance;
    const newName = !!(JSON.stringify(name) || null);
    return newDistanc&& newName&& newDate&& newNumberOf ;
  },
};
module.exports = usefullFunctions;

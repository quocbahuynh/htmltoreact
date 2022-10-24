const fs = require("fs");

const createOuputFolder = (name) => {
  try {
    if (!fs.existsSync(name)) {
      fs.mkdirSync(name);
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { createOuputFolder };

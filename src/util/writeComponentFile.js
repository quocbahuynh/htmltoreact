const fs = require("fs");
const { createComponentName } = require("./createComponentName");

const writeComponentFile = (folderOuputName, componentName, sample) => {
  fs.writeFile(
    `${folderOuputName}/${createComponentName(componentName)}.jsx`,
    sample,
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Create component successfully!");
    }
  );
};

module.exports = { writeComponentFile };

"use strict";
const fs = require("fs");
const {
  createOuputFolder,
  writeComponentFile,
  sampleComponentDefault,
} = require("./src/util");
const { sliceComponent } = require("./src/core");

// const dicFileInput = "../index.html";
// const componentName = "Wrapper";
// const folderOuputName = "components";

const createComponents = (file, componentName, folderOuputName) => {
  let folderCreated = createOuputFolder(folderOuputName);

  if (folderCreated === true) {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const context = sliceComponent(data, folderOuputName, componentName);
      const sample = sampleComponentDefault(context, componentName);
      writeComponentFile(folderOuputName, componentName, sample);
    });
  }
};

module.exports = createComponents;

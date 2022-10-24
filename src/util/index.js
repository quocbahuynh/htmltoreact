const { createComponentName } = require("./createComponentName");
const { sampleComponentDefault } = require("./sampleComponents");
const { createOuputFolder } = require("./createOutputFolder");
const { selfClosingTags } = require("./selfClosingTags");
const { writeComponentFile } = require("./writeComponentFile");
module.exports = {
  createComponentName,
  sampleComponentDefault,
  selfClosingTags,
  createOuputFolder,
  writeComponentFile,
};

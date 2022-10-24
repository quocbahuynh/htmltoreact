const minify = require("html-minifier").minify;
const { selfClosingTags } = require("../util");
const pretty = require("pretty");
const HTMLtoJSX = require("htmltojsx");
const converter = new HTMLtoJSX({
  indent: "\t",
  hideComment: true,
  createClass: false,
});
const { writeComponentFile, sampleComponentDefault } = require("../util");

const keyReplace = (subTag) => `<div class="keyReplace">${subTag}</div>`;
const unkeyReplace = (subTag) => `<div className="keyReplace">${subTag}</div>`;

const replaceStr = (str) => {
  let removeTag = str.replace(">", " ");
  let strArr = removeTag.split(" ");
  return strArr;
};

const getNameofCommentTag = (cmt) => {
  return cmt.replace(/[^A-Z0-9]+/gi, "");
};

const sliceComponent = (data, folderOuputName, componentName) => {
  let stack = [];
  let subStack = [];
  let output = [];
  let importSubComponents = [];
  let dataObj = {
    context: "",
    importSubComponents: [],
  };

  let dataCompress = minify(data, {
    collapseWhitespace: true,
  });

  let position = dataCompress.indexOf(`<!-- ${componentName} -->`);
  let area = dataCompress.slice(position);
  position = area.indexOf("<", 1);
  area = area.slice(position);

  let areaArr = area.split("<");
  for (let i = 0; i < areaArr.length; i++) {
    if (areaArr[i] !== "") {
      if (stack.length < 1) {
        stack.push(areaArr[i]);
        output.push("<" + areaArr[i]);
      } else if (areaArr[i].charAt(0) === "!") {
        if (subStack.length < 1) {
          output.push(keyReplace(getNameofCommentTag(areaArr[i]))); // add key to replace
          subStack.push(keyReplace(getNameofCommentTag(areaArr[i])));

          importSubComponents.push(getNameofCommentTag(areaArr[i]));
        }
        const subContext = sliceComponent(
          dataCompress,
          folderOuputName,
          getNameofCommentTag(areaArr[i])
        );
        const sample = sampleComponentDefault(
          subContext,
          getNameofCommentTag(areaArr[i])
        );
        writeComponentFile(
          folderOuputName,
          getNameofCommentTag(areaArr[i]),
          sample
        );
      } else if (subStack.length > 0) {
        if (selfClosingTags.includes(replaceStr(areaArr[i])[0])) {
          subStack.push(areaArr[i]);
          subStack.pop();
        } else if (
          "/" + replaceStr(subStack[subStack.length - 1])[0] ==
          replaceStr(areaArr[i])[0]
        ) {
          subStack.pop();

          if (subStack.length < 2) {
            subStack = [];
          }
        } else {
          subStack.push(areaArr[i]);
        }
      } else {
        if (selfClosingTags.includes(replaceStr(areaArr[i])[0])) {
          output.push("<" + areaArr[i]);
        } else if (
          "/" + replaceStr(stack[stack.length - 1])[0] ==
          replaceStr(areaArr[i])[0]
        ) {
          output.push("<" + areaArr[i]);
          stack.pop();

          if (stack.length < 1) {
            break;
          }
        } else {
          stack.push(areaArr[i]);
          output.push("<" + areaArr[i]);
        }
      }
    }
  }

  const toStringOutput = output.join("");

  let toJSX = converter.convert(toStringOutput);

  const setSubTag = (jsx) => {
    for (const i of importSubComponents) {
      jsx = jsx.replace(unkeyReplace(i), `<${i} />`);
    }
    return jsx;
  };
  let context = pretty(setSubTag(toJSX));

  dataObj.context = context;
  dataObj.importSubComponents = importSubComponents;

  return dataObj;
};

module.exports = { sliceComponent };

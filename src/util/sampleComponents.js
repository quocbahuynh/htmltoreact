const { createComponentName } = require("./createComponentName");

//import Tests from "./Tests";

const listSubComponents = (listSubComponents) => {
  if (listSubComponents.length < 1) {
    return "";
  } else {
    let list = [];
    for (const i of listSubComponents) {
      list.push(`import ${i} from './${i}'`);
    }
    return list.join("\n");
  }
};

const sampleComponentDefault = (dataContext, componentName) => {
  return `
  import React from 'react'
  ${listSubComponents(dataContext.importSubComponents)}
  export default function ${createComponentName(componentName)}() {
    return (
      <>
      ${dataContext.context}
      </>
    )
  }
  `;
};

module.exports = { sampleComponentDefault };

const createComponentName = (text) => {
  const output = [];
  const toArr = text.split(" ");

  for (const i of toArr) {
    if (i !== "") {
      const filterText = i.replace(/[^a-zA-Z ]/g, "");
      const upperCase =
        filterText.charAt(0).toUpperCase() + filterText.slice(1);
      output.push(upperCase);
    }
  }

  return output.join("");
};

module.exports = { createComponentName };

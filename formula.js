for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activecell, cellProp] = getCellAndCellProp(address);
      let enteredData = activecell.innerText;
      if (enteredData === cellProp.value) return;
      cellProp.value = enteredData;
      //If data modifies, remove P-C relation, Formula emty, update Children with new hardcoded / modified value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
      console.log(cellProp);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", (e) => {
  let inputFormula = formulaBar.value;
  if (e.key === "Enter" && formulaBar.value) {
    //if change in formula, break old P-C relation, evalute new formula, add new P-C relation
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    if (inputFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
      console.log(`${cellProp.value}>>>>>>>>>>>>>>>`);
    }
    let evaluatedValue = evaluateFormula(inputFormula);

    //To update UI and Cell prop in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);
    console.log(sheetDB);
    updateChildrenCells(address);
  }
});

function updateChildrenCells(parentAddress) {
  let [parentCell, parentcellProp] = getCellAndCellProp(parentAddress);
  let children = parentcellProp.children;
  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = getCellAndCellProp(childAddress);
    let childformula = childCellProp.formula;
    let evaluatedValue = evaluateFormula(childformula);
    setCellUIAndCellProp(evaluatedValue, childformula, childAddress);
    updateChildrenCells(childAddress);
  }
}

function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
      let idx = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}
function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
  // let address = addressBar.value;
  let [cell, cellProp] = getCellAndCellProp(address);

  cell.innerText = evaluatedValue; //UI Update
  cellProp.value = evaluatedValue; //DB update
  cellProp.formula = formula; //DB update
}

//Storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < columns; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignmnet: "left",
      fontFamily: "sans-serif",
      fontSize: "14",
      fontColor: "#000000",
      bgColor: "#000000",
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// selector for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-props");
let fontFamily = document.querySelector(".font-family-props");
let fontColor = document.querySelector(".font-color-prop");
let bgColor = document.querySelector(".bg-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

// let addressBar = document.querySelector(".address-bar");

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";
//Application of two way binding:
//Attach property listeners.

bold.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification:
  cellProp.bold = !cellProp.bold; //DB Data changed
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI changed (part1)
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp; // UI changed (part2)
});

italic.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification:
  cellProp.italic = !cellProp.italic; //DB Data changed
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI changed (part1)
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp; // UI changed (part2)
});

underline.addEventListener("click", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification:
  cellProp.underline = !cellProp.underline; //DB Data changed
  cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI changed (part1)
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp; // UI changed (part2)
});

function activeCell(address) {
  let [rid, cid] = decodeRidCidFromAddress(address);

  //Access cell and storage object
  // let cell = document.querySelector(`.cell[rid=${rid}][cid=${cid}]`);
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  console.log(cell);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeRidCidFromAddress(address) {
  //address -> "A1"
  let rid = Number(address.slice(1) - 1); //0
  let cid = Number(address.charCodeAt(0)) - 65; //A->65
  return [rid, cid];
}

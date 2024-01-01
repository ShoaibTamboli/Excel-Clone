//Storage
let sheetDB = [];

for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < columns; j++) {
    let cellProp = {
      bold: false,
      italic: false,
      underline: false,
      alignment: "left",
      fontFamily: "sans-serif",
      fontSize: "14",
      fontColor: "#000000",
      bgColor: "#000000",
      value: "",
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
fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification:
  cellProp.fontSize = fontSize.value; //DB Data changed
  cell.style.fontSize = cellProp.fontSize + "px"; // UI changed (part1)
  fontSize.value = cellProp.fontSize; // UI changed (part2)
});
fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);

  //Modification:
  cellProp.fontFamily = fontFamily.value; //DB Data changed
  cell.style.fontFamily = cellProp.fontFamily; // UI changed (part1)
  fontFamily.value = cellProp.fontFamily; // UI changed (part2)
});
fontColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification:
  cellProp.fontColor = fontColor.value; //DB Data changed
  cell.style.color = cellProp.fontColor; // UI changed (part1)
  fontColor.value = cellProp.fontColor; // UI changed (part2)
});
bgColor.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = activeCell(address);
  //Modification:
  cellProp.bgColor = bgColor.value; //DB Data changed
  cell.style.backgroundColor = cellProp.bgColor; // UI changed (part1)
  bgColor.value = cellProp.bgColor; // UI changed (part2)
});
alignment.forEach((alignEle) => {
  alignEle.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);
    let alignValue = e.target.classList[2];

    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment; // UI changed (part1)
    switch (alignValue) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
  addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
  //work
  cell.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [rid, cid] = decodeRidCidFromAddress(address);
    let cellProp = sheetDB[rid][cid];
    console.log(sheetDB[rid][cid]);

    // Apply cell properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
    cell.style.textAlign = cellProp.alignment;

    //Apply properties on UI properties container
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    bgColor.value = cellProp.bgColor;
    switch (cellProp.alignment) {
      case "left":
        leftAlign.style.backgroundColor = activeColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
        rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
  });
}

function activeCell(address) {
  let [rid, cid] = decodeRidCidFromAddress(address);

  //Access cell & storage object
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

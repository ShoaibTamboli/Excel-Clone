let rows = 100;
let columns = 26;

let addressColumnContainer = document.querySelector(
  ".address-column-container"
);
let addressRowContainer = document.querySelector(".address-row-container");
let cellsContainer = document.querySelector(".cells-container");
let addressBar = document.querySelector(".address-bar");

for (let i = 0; i < rows; i++) {
  let addressColumn = document.createElement("div");
  addressColumn.setAttribute("class", "address-column");
  addressColumn.innerText = i + 1;
  addressColumnContainer.appendChild(addressColumn);
}

for (let i = 0; i < columns; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowContainer.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
  let rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "row-cell");
  for (let j = 0; j < columns; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    rowContainer.appendChild(cell);
    addListenerForAddressBarDisplay(cell, i, j);
  }
  cellsContainer.appendChild(rowContainer);
}

function addListenerForAddressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1;
    let columnID = String.fromCharCode(65 + j);
    addressBar.value = `${columnID}${rowID}`;
  });
}

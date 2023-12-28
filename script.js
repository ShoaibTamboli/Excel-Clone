let rows = 100;
let columns = 26;
let addressColumnContainer = document.querySelector(
  ".address-column-container"
);

let addressRowContainer = document.querySelector(".address-row-container");

for (let i = 0; i < rows; i++) {
  let addressColumn = document.createElement("div");
  addressColumn.setAttribute("class", "address-column");
  addressColumn.innerText = i + 1;

  addressColumnContainer.appendChild(addressColumn);
}

for (let i = 0; i < columns; i++) {
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = i + 1;

  addressRowContainer.appendChild(addressRow);
}

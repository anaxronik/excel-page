const CODES = {
  A: 65,
  Z: 90,
}

function createCell(rowNumber, colNumber) {
  return `<div 
       class="cell" 
       contenteditable 
       data-type="cell" 
       data-col="${colNumber}" 
       data-id="${rowNumber}:${colNumber}"
    ></div>`
}

function createColumn(col, index) {
  return `<div class="column" data-type="resizable" data-col="${index}"> 
        ${col}
        <div class="col-resize"  data-resize="col"></div>
    </div>`
}

function createRow(index, content) {
  return `<div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ""}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ""}
      </div>
      <div class="row-data">${content}</div>
    </div>`
}

function createChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // создание первой строки с именами колонок
  const cols = new Array(colsCount)
    .fill("")
    .map(createChar)
    .map(createColumn)
    .join("")
  rows.push(createRow(null, cols))

  // создание остальных ячеек
  for (let row = 0; row < rowsCount; row++) {
    const cols = new Array(colsCount)
      .fill("")
      .map((_, col) => createCell(row, col))
      .join("")
    rows.push(createRow(row + 1, cols))
  }

  return rows.join("")
}

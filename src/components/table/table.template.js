const CODES = {
  A: 65,
  Z: 90,
}
let DEFAULT_WIDTH = 120

function createCell(colState, row) {
  return function (_, col) {
    const width = getWidth(colState, col)
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width:${width}"
      ></div>
    `
  }
}

function createColumn({ col, index, width }) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width:${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
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

function createColumnName(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + "px"
}

function addWidthToFunction(colState) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(colState, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
  const rows = []
  const colState = state.colState

  // создание первой инфо строки
  const cols = new Array(colsCount)
    .fill("")
    .map(createColumnName)
    .map(addWidthToFunction(colState))
    .map(createColumn)
    .join("")

  rows.push(createRow(null, cols))

  //создание остальных строк и ячеек в них
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(createCell(colState, row))
      .join("")

    rows.push(createRow(row + 1, cells))
  }

  return rows.join("")
}

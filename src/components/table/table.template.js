const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function createColumn(col) {
  return (
    `<div class="column">
        ${col}
        <div class="col-resize"  data-resize="col"></div>
    </div>`
  )
}

function createRow(index, content) {
  return (
    `<div class="row">
      <div class="row-info">
        ${index ? index : ''}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>`
  )
}

function createChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // создание первой строки с именами колонок
  const cols = new Array(colsCount)
    .fill('')
    .map(createChar)
    .map(createColumn)
    .join('')
  rows.push(createRow(null, cols))

  // создание остальных ячеек
  for (let i = 0; i < rowsCount; i++) {
    const cols = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')
    rows.push(createRow(i + 1, cols))
  }

  return rows.join('')
}

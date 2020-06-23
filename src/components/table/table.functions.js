export function nextSelector(key, { row, col }) {
  const MIN_VALUE = 0
  switch (key) {
    case "Tab":
    case "ArrowRight":
      col++
      break

    case "ArrowLeft":
      if (col - 1 >= MIN_VALUE) {
        col--
      }
      break

    case "Enter":
    case "ArrowDown":
      row++
      break

    case "ArrowUp":
      if (row - 1 >= MIN_VALUE) {
        row--
      }
      break
  }
  return `[data-id="${row}:${col}"]`
}

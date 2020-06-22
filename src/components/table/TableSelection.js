export class TableSelection {
  static className = "selected"

  constructor() {
    this.group = []
    this.currentCell = null
  }

  select($element) {
    this.clear()
    this.group.push($element)
    this.currentCell = $element
    $element.addClass(TableSelection.className)
  }

  clear() {
    this.group.forEach(($cell) => $cell.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach(($element) =>
      $element.addClass(TableSelection.className)
    )
  }
}

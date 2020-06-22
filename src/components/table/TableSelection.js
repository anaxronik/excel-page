export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = [];
  }

  select($element) {
    this.clear()
    this.group.push($element)
    $element.addClass(TableSelection.className)
  }

  clear(){
    this.group.forEach($cell => $cell.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup() {}
}

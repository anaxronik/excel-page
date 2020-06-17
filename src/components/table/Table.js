import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'mousemove']
    });
  }

  toHTML() {
    return createTable(100)
  }

  onMousedown(event) {
    this.isMouseDown = true
    console.log('onMousedown(event)', event.target.dataset)
  }

  onMouseup(event) {
    this.isMouseDown = false
    console.log('onMouseup(event):')
  }

  onMousemove(event) {
    if (this.isMouseDown) {
      console.log('onMousemove(event) ')
    }
  }
}

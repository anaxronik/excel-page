import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(100)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      // при нажатии на ресайзер
      const $resizeElement = $(event.target)
      const $parentElement = $resizeElement.closest('[data-type="resizable"]')
      const coords = $parentElement.getCoords()
      const index = $parentElement.$element.dataset.col
      let newSizeElement

      if (event.target.dataset.resize === 'col') {
        // horizontal column resizing
        document.body.style.cursor = 'col-resize'
        document.onmousemove = e => {
          const delta = e.pageX - coords.right
          newSizeElement = coords.width + delta
          $parentElement.$element.style.width = newSizeElement + 'px'
        }
      }

      if (event.target.dataset.resize === 'row') {
        // vertical row resizing
        document.body.style.cursor = 'row-resize'
        document.onmousemove = e => {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parentElement.$element.style.height = value + 'px'
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.querySelectorAll(`[data-col="${index}"]`)
          .forEach(el => el.style.width = newSizeElement + 'px')
        document.body.style.cursor = ''
      }
    }
  }
}

import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "@/components/table/table.template"
import { $ } from "@core/dom"
import { TableSelection } from "./TableSelection"
import { range } from "@core/utils"

export class Table extends ExcelComponent {
  static className = "excel__table"

  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    })
  }

  toHTML() {
    return createTable(100)
  }

  onMousedown(event) {
    // selecting cells
    if (event.target.dataset.type === "cell") {
      const $targetCell = $(event.target)
      if (event.shiftKey) {
        const targetCellID = $targetCell.id(true)
        const currentCellID = this.selection.currentCell.id(true)

        const cols = range(currentCellID.col, targetCellID.col)
        const rows = range(currentCellID.row, targetCellID.row)

        const ids = cols.reduce((acc, col) => {
          rows.forEach((row) => acc.push(`${row}:${col}`))
          return acc
        }, [])

        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($targetCell)
      }
    }

    // resizing
    if (event.target.dataset.resize) {
      // при нажатии на ресайзер
      const $resizeElement = $(event.target)
      const $parentElement = $resizeElement.closest('[data-type="resizable"]')
      const coords = $parentElement.getCoords()
      const index = $parentElement.$element.dataset.col
      const resizeType = event.target.dataset.resize
      let newWidth

      $resizeElement.css({ opacity: 1 })

      if (resizeType === "col") {
        // horizontal column resizing
        document.body.style.cursor = "col-resize"
        $resizeElement.css({ bottom: "-5000px" })
        document.onmousemove = (e) => {
          const delta = e.pageX - coords.right
          newWidth = coords.width + delta
          $parentElement.css({ width: newWidth + "px" })
        }
      }

      if (resizeType === "row") {
        // vertical row resizing
        document.body.style.cursor = "row-resize"
        $resizeElement.css({ right: "-5000px" })
        document.onmousemove = (e) => {
          const delta = e.pageY - coords.bottom
          const newHeight = coords.height + delta
          $parentElement.css({ height: newHeight + "px" })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.body.style.cursor = ""
        $resizeElement.css({ opacity: 0 })
        $resizeElement.css({ right: "0px", bottom: "0px" })

        if (resizeType === "col") {
          document
            .querySelectorAll(`[data-col="${index}"]`)
            .forEach((el) => (el.style.width = newWidth + "px"))
          $resizeElement.css({ right: "0px" })
        }
        if (resizeType === "row") {
          $resizeElement.css({ bottom: "0px" })
        }
      }
    }
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }
}

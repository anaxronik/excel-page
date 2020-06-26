import { ExcelComponent } from "@core/ExcelComponent"
import { createTable } from "@/components/table/table.template"
import { $ } from "@core/dom"
import { TableSelection } from "./TableSelection"
import { range } from "@core/utils"
import { nextSelector } from "./table.functions"
import * as actions from "@/redux/actions"

export class Table extends ExcelComponent {
  static className = "excel__table"

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    })
  }

  toHTML() {
    return createTable(100, this.store.getState())
  }

  resizeTable(event) {
    if (event.target.dataset.resize) {
      // при нажатии на ресайзер
      const $resizeElement = $(event.target)
      const $parentElement = $resizeElement.closest('[data-type="resizable"]')
      const coords = $parentElement.getCoords()
      const index = $parentElement.$element.dataset.col
      const resizeType = event.target.dataset.resize
      let newWidth = 0

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

          // dispatch in store
          let data = { id: index, value: newWidth }
          this.$dispatch(actions.tableResize(data))
        }
        if (resizeType === "row") {
          $resizeElement.css({ bottom: "0px" })
        }
      }
    }
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
        this.selectCell($targetCell)
      }
    }

    // resizing
    this.resizeTable(event)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    // событие ввода текста в формуле
    this.$on("formula:input", (text) => {
      this.selection.currentCell.text(text)
    })

    this.$on("formula:done", () => {
      this.selection.currentCell.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit("table:select", $cell)
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ]
    const key = event.key

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.currentCell.id(true)
      const $nextCell = this.$root.find(nextSelector(key, id))
      this.selectCell($nextCell)
    }
  }

  onInput(event) {
    this.$emit("table:input", $(event.target))
  }
}

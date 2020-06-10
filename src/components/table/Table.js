import { ExcelComponent } from "@core/ExcelComponent";

export class Table extends ExcelComponent {
  static className = "excel__table";
  toHTML() {
    return `
        
        <div class="row">
              <div class="row_info"></div>
              <div class="row_data">
                <div class="row_number"></div>
                <div class="column">A</div>
                <div class="column">B</div>
                <div class="column">C</div>
                <div class="column">D</div>
                <div class="column">E</div>
                <div class="column">F</div>
                <div class="column">G</div>
                <div class="column">H</div>
                <div class="column">J</div>
                <div class="column">A</div>
                <div class="column">B</div>
                <div class="column">C</div>
                <div class="column">D</div>
                <div class="column">E</div>
                <div class="column">F</div>
                <div class="column">G</div>
                <div class="column">H</div>
                <div class="column">J</div>
                <div class="column">A</div>
                <div class="column">B</div>
                <div class="column">C</div>
                <div class="column">D</div>
                <div class="column">E</div>
                <div class="column">F</div>
                <div class="column">G</div>
                <div class="column">H</div>
                <div class="column">J</div>
                <div class="column">A</div>
                <div class="column">B</div>
                <div class="column">C</div>
                <div class="column">D</div>
                <div class="column">E</div>
                <div class="column">F</div>
                <div class="column">G</div>
                <div class="column">H</div>
                <div class="column">J</div>
              </div>
            </div>
            <div class="row">
              <div class="row_data">
                <div class="row_number">1</div>
                <div class="cell" contenteditable>A1</div>
                <div class="cell" contenteditable>B1</div>
                <div class="cell" contenteditable>C1</div>
                <div class="cell" contenteditable>D1</div>
                <div class="cell" contenteditable>E1</div>
                <div class="cell" contenteditable>F1</div>
                <div class="cell" contenteditable>G1</div>
                <div class="cell" contenteditable>H1</div>
                <div class="cell" contenteditable>J1</div>
              </div>
            </div>
            <div class="row">
              <div class="row_data">
                <div class="row_number">1</div>
                <div class="cell" contenteditable>A1</div>
                <div class="cell" contenteditable>B1</div>
                <div class="cell" contenteditable>C1</div>
                <div class="cell" contenteditable>D1</div>
                <div class="cell" contenteditable>E1</div>
                <div class="cell" contenteditable>F1</div>
                <div class="cell" contenteditable>G1</div>
                <div class="cell" contenteditable>H1</div>
                <div class="cell" contenteditable>J1</div>
              </div>
            </div>
        
        `;
  }
}

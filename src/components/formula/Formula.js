import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  toHTML() {
    return `
            <div class="label">fx</div>
            <div class="input" contenteditable spellcheck="false">asd</div>
        `;
  }
}

import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "click"],
    });
  }

  toHTML() {
    return `
            <div class="label">fx</div>
            <div class="input" contenteditable spellcheck="false">asd</div>
        `;
  }
}

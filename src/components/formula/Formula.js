import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root) {
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

  onInput(event) {
    console.log('onInput:', event.target.textContent.trim())
    console.log(this.$root)
  }

  onClick(event) {
    console.log('onClick', event.target.textContent.trim())
  }
}

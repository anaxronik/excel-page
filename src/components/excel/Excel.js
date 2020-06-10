import { $ } from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $rootElement = $.create("div", "excel");

    this.components.forEach((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $rootElement.append($el);
    });

    return $rootElement;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}

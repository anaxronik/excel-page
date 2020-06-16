import {$} from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $rootElement = $.create("div", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el);
      // DEBUG для использования через консоль браузера
      if (component.name) {
        window['c' + component.name] = component
      }
      $el.html(component.toHTML());
      $rootElement.append($el);
      return component;
    });

    return $rootElement;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => {
      component.init();
    });
  }
}

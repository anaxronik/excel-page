import { $ } from "../../core/dom"; //библиотека для создания html елементов

export class Excel {
  constructor(selector, options) {
    this.$element = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $rootElement = $.create("div", "excel");

    this.components.forEach((Component) => {
      const $element = $.create("div", Component.className);

      const component = new Component($element); // создаем наш элемент и передаем в него название родительского div
      $element.innerHTML = component.toHTML(); // получем html нашего элемента
      $rootElement.append($element); // складываем все во внешний div
    });
    return $rootElement;
  }

  render() {
    // присоединяет полученный элемент в дом дерево
    this.$element.append(this.getRoot());
  }
}

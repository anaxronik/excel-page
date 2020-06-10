class Dom {
  constructor(selector) {
    this.$element =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    //   метод для работы с элементами
    if (typeof html === "string") {
      // если что-то переданно, то помещает это внутрь
      this.$element.innerHTML = html;
      return this;
    }
    // если ничего не переданно, то возвращает содержимое
    return this.$element.outerHTML.trim();
  }

  clear() {
    //   метод для очистки содержимого элемента
    this.html("");
    return this;
  }

  on() {
    // метод для обработки событий
  }

  append(node) {
    // метод для добавления элементов в указанный элемент
    if (node instanceof Dom) {
      node = node.$element;
    }

    if (Element.prototype.append) {
      this.$element.append(node);
    } else {
      this.$element.appendChild(node);
    }

    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

// метод для создания html DOM элементов
$.create = (tagName, classes = "") => {
  const element = document.createElement(tagName);
  if (classes) {
    element.classList.add(classes);
  }
  return $(element);
};

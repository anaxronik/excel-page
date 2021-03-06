class Dom {
  constructor(selector) {
    this.$element =
      typeof selector === "string" ? document.querySelector(selector) : selector
  }

  html(html) {
    //   метод для работы с элементами
    if (typeof html === "string") {
      // если что-то переданно, то помещает это внутрь
      this.$element.innerHTML = html
      return this
    }
    // если ничего не переданно, то возвращает содержимое
    return this.$element.outerHTML.trim()
  }

  clear() {
    //   метод для очистки содержимого элемента
    this.html("")
    return this
  }

  append(node) {
    // метод для добавления элементов в указанный элемент
    if (node instanceof Dom) {
      node = node.$element
    }

    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.$element.appendChild(node)
    }

    return this
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$element.closest(selector))
  }

  getCoords() {
    return this.$element.getBoundingClientRect()
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$element.style[key] = styles[key]
    })
  }

  find(selector) {
    return $(this.$element.querySelector(selector))
  }

  addClass(className) {
    this.$element.classList.add(className)
  }

  removeClass(className) {
    this.$element.classList.remove(className)
  }

  data() {
    return this.$element.dataset
  }

  id(parse) {
    const id = this.$element.dataset.id
    const parsedId = id.split(":")
    if (parse) {
      return { row: +parsedId[0], col: +parsedId[1] }
    } else {
      return id
    }
  }

  text(text) {
    // если передан параметр назначет содержимое элемента
    if (typeof text === "string") {
      this.$element.textContent = text
      return this
    }
    // если параметр не пердан
    // если элемент является инпутом
    if (this.$element.tagName.toLowerCase() === "input") {
      return this.$element.value.trim()
    }
    // в остальных случаях возвращет содержимое элемента
    return this.$element.textContent.trim()
  }

  // метод для назначения фокуса на ячейку
  focus() {
    this.$element.focus()
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

// метод для создания html DOM элементов
$.create = (tagName, classes = "") => {
  const element = document.createElement(tagName)
  if (classes) {
    element.classList.add(classes)
  }
  return $(element)
}

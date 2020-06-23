export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event = "", ...args) {
    // уведомление слушателей
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener) => {
        listener(...args)
      })
    }
  }

  subscribe(event, fn) {
    // добавление нового слушателя
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      )
    }
  }

  unsubscribe(event, fn) {}
}

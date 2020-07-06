import { DomListener } from "./DomListener"

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ""
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store

    this.prepare()
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // возвращает шаблон компонента
  toHTML() {
    return ""
  }

  // метод инициализации компонента
  init() {
    this.initDomListeners()
  }

  //удаляет все слушатели
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach((unsub) => unsub())
  }

  // метод запускаемый до init
  prepare() {}

  // уведомление слушателей о событии
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемся на событие
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // сюда приходят только изменения по тем полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
}

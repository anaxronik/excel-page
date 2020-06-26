import { DomListener } from "./DomListener"

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ""
    this.emitter = options.emitter
    this.unsubscribers = []
    this.store = options.store

    this.prepare()
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
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
    this.storeSub.unsubscribe()
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
}

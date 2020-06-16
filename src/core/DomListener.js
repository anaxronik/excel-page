export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No $root in constructor in Dom listener!");
    }
    this.root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    console.log("Listeners: ", this.listeners);
  }
  removeDomListeners() {}
}

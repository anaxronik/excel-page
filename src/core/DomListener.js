export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error("No $root in constructor");
    }
    this.root = $root;
  }
}

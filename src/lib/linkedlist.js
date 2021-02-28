
export class Node {
  // private fields
  #nextList
  #lastList

  constructor({thing} = {}) {
    this.thing = thing;
    this.#nextList = [];
    this.#lastList = [];
  }

  get nextList() {
    // Array.from ?
    return this.#nextList;
  }

  get lastList() {
    return this.#lastList;
  }

  set nextList(nothing) {
    throw new TypeError(`Cannot set successors for all lists, use setNextAtList(i, node) instead.`);
  }

  setNext(i, node) {
    if ( node ) {
      node.#lastList[i] = this;
    }
    return this.#nextList[i] = node;
  }
}


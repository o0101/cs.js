/// singly linked list

export default class SingList {
  // private fields
    // root and length
    #root
    #length

  // API
    constructor(data) {
      this.#root = new SingNode();

      if ( Array.isArray(data) ) {
        data = data.slice(0);
        data.reverse();
        for( const thing of data ) {
          this.head = new SingNode(thing);
        }
      }
    }

    get head() {
      return this.#root.next; 
    }

    set head(node) {
      const oldHead = this.#root.next;
      if ( node !== oldHead ) {
        this.#root.next = node;
        // if it's not the head already, and it doesn't have a next, 
        // we assume it is not in the list so add 1 to length
        // but this doesn't prevent cycles forming.
        // could add that with a list self reference inside each node
        // node.list = this; and check first
        if ( node.next === undefined ) {
          this.#length += 1;
        }
        node.next = oldHead;
      }
    }

    reverse() {
      let node = this.#root;
      let nextNode = node.next;
      let lastNode;

      while(nextNode) {
        // next node in forward direction becomes current node
        node = nextNode
        // its next node in forward direction becomes next current node
        nextNode = node.next;
        // set the current node's next to the previous node in forward direction (reversal step)
        node.next = lastNode;
        // save the last node to be the current node (so the next node can point back to it)
        lastNode = node;
      }

      this.#root.next = node;
    }

    recursiveReverse() {
      return this.#recursiveReverse(undefined, this.head);
    }

    #recursiveReverse(lastNode, node) {
      const nextNode = node.next;
      node.next = lastNode;

      if ( nextNode === undefined ) {
        this.#root.next = node;
        return node;
      }

      return this.#recursiveReverse(node, nextNode);
    }

    get [Symbol.iterator]() {
      return iterator.bind(this);

      function *iterator() {
        let node = this.#root;
        while(node.next) {
          node = node.next;
          yield node.thing;
        }
      }
    }

    get length() {
      return this.#length;
    }

    static get Node() {
      return SingNode;
    }
}

export const Class = SingList;

export function create(...args) {
  return new SingList(...args);
}

class SingNode {
  #next
  #thing

  constructor(thing) {
    this.#thing = thing;
    this.#next = null;
  }

  get next() {
    return this.#next;
  }

  set next(node) {
    this.#next = node;
  }

  get thing() {
    return this.#thing;
  }

  set thing(thing) {
    this.#thing = thing;
  }
}

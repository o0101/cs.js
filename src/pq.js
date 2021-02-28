import Heap from './heap.js';
import {Empty} from './lib/tree.js';

const DEFAULT_OPTS = {
  max: true,
  compare: function (A, B) {
    const {priority:pA = Empty} = A;
    const {priority:pB = Empty} = B;

    if ( pB == Empty ) {
      return 1;
    } else if ( pA == Empty ) {
      return -1;
    }

    if ( pA > pB ) {
      return this.config.max ? 1 : -1;
    } else if ( pA == pB ) {
      return 0;
    } else {
      return !this.config.max ? 1 : -1;
    }
  }
};

export default class PQ {
  // private fields
    // store
    #store

  // API
    // public instance methods
      constructor(opts = DEFAULT_OPTS, data) {
        opts = Object.assign({}, DEFAULT_OPTS, opts);

        this.config = Object.freeze(opts);

        const heapOpts = {
          max: opts.max,
          compare: opts.compare,
          asTree: false,
          arity: 4
        };

        this.#store = new Heap(heapOpts, data);
      }

      isEmpty() {
        return this.#store.size === 0;
      }

      insert(thing, priority) {
        const blob = {thing, priority};    
        this.#store.push(blob);
      }

      pull() {
        return this.#store.pop();
      }

      top() {
        return this.#store.peek();
      }

      get size() {
        return this.#store.size;
      }
    
    // static class methods
      static print(pq) {
        Heap.print(pq.#store, thing => thing.priority);
      }
}

export const Class = PQ;
export function create(...args) {
  return new PQ(...args);
}



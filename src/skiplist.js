/* DEV LOG
  I implemented this on Feb 24 2021
  from the Wikipedia article on heaps
  https://en.wikipedia.org/wiki/Heap_(data_structure)
*/

// constants
  const DEFAULT_OPTIONS = {
    p: 1/2,                 /* probability node lifts to higher levels */
    randomized: true,       /* if we base lifting on randomizedation   */
      // false uses a deterministic lifting scheme

  };

  const OptionKeys = new Set(Object.keys(DEFAULT_OPTIONS));

export default class SkipList {
  // private fields
  #size
  #root

  // API
    constructor(options, ...data) {
      if ( ! options ) {
        options = DEFAULT_OPTIONS;
      }
      options = Object.assign(clone(DEFAULT_OPTIONS), options);

      guardValidOptions(options);

      this.config = Object.freeze(clone(options));
    }

    get size() {
      return this.#size;
    }


  // static methods
    static print(skiplist) {
      let row = 0;

      console.log('\n\n');
    }

    static merge(slist1, slist2) {

    }
}

export const Class = SkipList;
export function create(...args) {
  return new SkipList(...args);
}

class Node {
  // private fields
  #listNext

  constructor({thing, listNext} = {}) {
    Object.assign(this, {thing});
    if ( Array.isArray(listNext) ) {
      this.#listNext = listNext;
    } else {
      this.#listNext = [];
    }
  }

  get listNext() {
    return Array.from(this.#listNext);
  }

  set listNext(nothing) {
    throw new TypeError(`Cannot set successors for all lists, use setNextAtList(i, node) instead.`);
  }

  getNextAtList(i) {
    return this.#listNext[i];
  }

  setNextAtList(i, node) {
    return this.#listNext[i] = node;
  }
}

// helper methods
  function guardValidOptions(opts) {
    const OptionTypes = {
      asTree: 'boolean',         
      max: 'boolean',              
      arity: 'number',              
      compare: ['undefined', 'function']
    };

    const errors = [];
    const typesValid = Object
      .entries(opts)
      .every(([key, value]) => {
        const type = OptionTypes[key]
        let valid;
        if ( Array.isArray(type) ) {
          valid = type.includes(typeof value);
        } else {
          valid = typeof value === type;
        }
        if ( ! valid ) {
          errors.push({
            key, value, 
            message: `
              Option ${key} must be a ${type} if given. 
              It was ${value}.
            `
          });
        }
        return valid;
      });

    const keysValid = Object
      .keys(opts)
      .every(key => {
        const valid = OptionKeys.has(key);
        if ( ! valid ) {
          errors.push({
            key,
            message: `
              Options contained an unrecognized key: ${key}
            `
          });
        }
        return valid;
      });

    const isValid = typesValid && keysValid;

    if ( ! isValid ) {
      console.warn(JSON.stringify({errors,keysValid, typesValid}, null, 2));
      throw new TypeError(`Options were invalid.`);
    }
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
 

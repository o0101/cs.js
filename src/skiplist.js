/* DEV LOG
  I implemented this on Feb 24 2021
  from the Wikipedia article on heaps
  https://en.wikipedia.org/wiki/Heap_(data_structure)
*/

// constants
  const DEFAULT_OPTIONS = {
  };

  const OptionKeys = new Set(Object.keys(DEFAULT_OPTIONS));

export default class SkipList {
  // private fields
  #size

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
  #children

  constructor({parent, thing, children} = {}) {
    Object.assign(this, {parent, thing});
    if ( children !== undefined ) {
      this.children = children;
    }
  }

  get children() {
    return Array.from(this.#children || []);
  }

  set children(newChildren) {
    if ( Array.isArray(newChildren) ) {
      this.#children = Array.from(newChildren);
    } else throw new TypeError(`Children can only be an array. Received: ${newChildren}`);
  }

  addChild(newChild) {
    const children = this.children;
    children.push(newChild);
    newChild.parent = this;
    this.children = children;
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
 

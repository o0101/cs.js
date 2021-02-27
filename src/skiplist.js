/* DEV LOG
  I implemented this on Feb 24 2021
  from the Wikipedia article on heaps
  https://en.wikipedia.org/wiki/Heap_(data_structure)
*/

// constants
  const DEFAULT_OPTIONS = {
    max: false,             /* increasing order, true gives decreasing order */
    p: 1/2,                 /* probability node lifts to higher levels */
    randomized: true,       /* if we base lifting on randomizedation   */
      // false uses a deterministic lifting scheme
  };

  const OptionKeys = new Set(Object.keys(DEFAULT_OPTIONS));

export default class SkipList {
  // private fields
  #size
  #root
  #depth

  // API
    constructor(options, ...data) {
      if ( ! options ) {
        options = DEFAULT_OPTIONS;
      }
      options = Object.assign(clone(DEFAULT_OPTIONS), options);

      guardValidOptions(options);

      // implementation progress option checkso

      if ( !options.randomized ) {
        throw new TypeError(`Deterministic node lifting has not been implemented yet.`);
      }

      this.config = Object.freeze(clone(options));
    }

    get #depth() {
      return Math.floor(
        Math.log(this.#size) /
        Math.log(1/this.config.p)
      );
    }

    get size() {
      return this.#size;
    }

    insert(thing) {
      const liftUpdates = [];
      let inserted = false;
      let lastNode;
      let node = this.#root;
      let level = node.levelNext.length - 1;

      while(!inserted && node !== undefined && level >= 0 &&) {
        const next = node.levelNext[level];

        // if there are no more nodes at this level
        if ( next == undefined ) {
          // go down
          level -= 1;
        }

        const comparison = this.#compare(thing, next.thing);

        if ( comparison > 0 ) { // if thing comes before next.thing
          // go down
          level -= 1;
        } else if ( comparison < 0 ) { // if it comes after next.thing
          // save last node
          lastNode = node;
          // save this node for possible update on lifting
          liftUpdates[level] = node;
          // go across
          node = next; 
        } else { // if it equals next thing
          if ( this.config.dupeslicatesOkay ) { // and duplicates are OK
            // save last node
            lastNode = node;
            // save this node for possible update on lifting
            liftUpdates[level] = node;
            // go across 
            node = next;
          } else { // if we don't allow duplicates
            inserted = true;
          }
        }
      }

      if ( ! inserted ) {
        const newNode = new Node({thing});

        if ( node == undefined ) {
          // we reached the end of the bottom path
          

          // for dev let's just check our condition is true
          // that we ARE on the bottom path
            if ( level !== 0 ) {
              throw new TypeError(`Post loop path end can only occur on bottom path. 
                Something is UP with your skiplist.
              `);
            }
        
          lastNode.setLevelNext(0, newNode);
        } else if ( level < 0 ) {
          // we are somewhere in the middle of the bottom path 

          // so insert between node and node.next
          const postNewNode = node.next;

          node.setLevelNext(0, newNode);
          newNode.setLevelNext(0, postNewNode);
        }

        inserted = true;

        this.#liftUp(newNode, liftUpdates); // lift up the inserted node
      }

      return inserted;
    }

  // private instance methods
    // life a node up to higher levels
    #lift(node) {
      if ( this.config.randomized ) {

      } else {

      }
    }

    // determine order between two things
    #compare(aThing, bThing) {
      if ( this.config.compare ) {
        return this.config.compare(aThing, bThing);
      } else {
        // order comparison
        if ( aThing > bThing ) {
          return this.config.max ? 1 : -1;
        } else if ( aThing == bThing ) {
          return 0;
        } else {
          return !this.config.max ? 1 : -1;
        }
      }
    }

  // static methods
    static print(skiplist) {
      let row = 0;
      

      // print each level 


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
  #levelNext

  constructor({thing} = {}) {
    Object.assign(this, {thing});
  }

  get levelNext() {
    return Array.from(this.#levelNext);
  }

  set levelNext(nothing) {
    throw new TypeError(`Cannot set successors for all lists, use setNextAtList(i, node) instead.`);
  }

  setNext(i, node) {
    return this.#levelNext[i] = node;
  }
}

// helper methods
  function guardValidOptions(opts) {
    const OptionTypes = {
      p: 'number',         
      randomized: 'boolean',
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

    const extraValid = opts.p < 1.0 && opts.p > 0;

    if ( ! extraValid ) {
      errors.push({
        key: 'p', value: opts.p, 
        message: `
          Option p (node lifting probability) must be between 0 and 1 exclusive.
          It was ${opts.p}.
        `
      });
    }

    const isValid = typesValid && keysValid && extraValid;

    if ( ! isValid ) {
      console.warn(JSON.stringify({opts, errors, keysValid, typesValid, extraValid}, null, 2));
      throw new TypeError(`Options were invalid.`);
    }
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
 

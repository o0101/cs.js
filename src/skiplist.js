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
    duplicatesOkay: false,  /* only insert each thing once, true allows dupes */
    _breakLinearize: false, /* don't only use the lower level. This is a dev setting */
      // mainly used to compare time between linear vs higher level #locate 
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

      // implementation progress option checkso

      if ( !options.randomized ) {
        throw new TypeError(`Deterministic node lifting has not been implemented yet.`);
      }

      this.config = Object.freeze(clone(options));

      this.#root = new Node();
    }

    get depth() {
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
      let newNode;
      let doInsert = false;
      let inserted = false;

      let {node, has} = this.#locate(thing, liftUpdates);

      if ( has ) {
        if ( this.config.duplicatesOkay ) {
          // node will be the last in the chain of 'thing' nodes
          doInsert = true;
        }
      } else {
        doInsert = true;
      }

      if ( doInsert ) {
        newNode = new Node({thing});
        if ( node == undefined ) {
          this.#root = newNode;
        } else {
          const post = node.nextList[0];
          node.setNext(0, newNode);
          if ( post !== undefined ) {
            newNode.setNext(0, post);
          }
        }
        inserted = true;
      }

      if ( inserted ) {
        // lift up the inserted node
        this.#liftUp(newNode, liftUpdates); 
      }

      return inserted;
    }

    has(thing) {
      return this.#locate(thing).has;
    }

  // private instance methods
    #locate(thing, updates = []) {
      let found = false;
      let lastNode;
      let node = this.#root;
      let level;

      if ( node == undefined ) {
        return {node: undefined, has: false};
      } else {
        level = node.nextList.length - 1;

        if ( this.config._breakLinearize ) {
          level = 0;
        }

        while(node !== undefined && level >= 0 && ! found) {
          const next = node.nextList[level];

          // if there are no more nodes at this level
          if ( next == undefined ) {
            // save this node for possible update on lifting
            updates[level] = node;
            // go down
            level -= 1;
          } else { // there are more nodes at this level and we could go across
            // so we need to compare the next
            const comparison = this.#compare(thing, next.thing);

            if ( comparison > 0 ) { // if thing comes before next.thing
              // save this node for possible update on lifting
              updates[level] = node;
              // go down
              level -= 1;
            } else if ( comparison < 0 ) { // if it comes after next.thing
              // save last node
              lastNode = node;
              // save this node for possible update on lifting
              updates[level] = node;
              // go across
              node = next; 
            } else { // if it equals next thing
              if ( this.config.dupeslicatesOkay ) { // and duplicates are OK
                found = true;
                // save last node
                lastNode = node;
                // save this node for possible update on lifting
                updates[level] = node;
                // go across 
                node = next;
              } else { // if we don't allow duplicates
                found = true;
              }
            }
          }
        }
      }

      if ( node == undefined ) {
        // we reached the end of the bottom path
        // for dev let's just check our condition is true
        // that we ARE on the bottom path
          if ( level !== 0 ) {
            throw new TypeError(`Post loop path end can only occur on bottom path. 
              Something is UP with your skiplist.
            `);
          }
      
        // save for possible lift updates
        updates[level] = lastNode;
        node = lastNode;
      } else if ( level < 0 ) {
        // we are somewhere in the middle of the bottom path 

        updates[0] = node;
      }

      return {node, has: found}
    }

    // life a node up to higher levels
    #liftUp(node, updates) {
      if ( node == this.#root ) return;
      if ( this.config.randomized ) {
        let level = 0;
        while(true) {
          const val = Math.random(); 
          if( val <= this.config.p ) {
            level += 1;
            const prior = updates[level] || this.#root;
            node.setNext(level, prior.nextList[level]);
            prior.setNext(level, node);
          } else break;
        }
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
      const rows = [];
      if ( ! skiplist.#root ) return;
      const nextList = skiplist.#root.nextList;

      // print each level 

      for( let i = nextList.length - 1; i >= 0; i-- ) {
        const row = [];   
        let node = skiplist.#root;
        rows[i] = row;
        while(node != undefined) {
          row.push(node.thing);
          node = node.nextList[i];
        }
      }


      for( let i = rows.length - 1; i >= 0; i-- ) {
        const row = rows[i];
        console.log(`Row: ${i}: ${row.join(' ')}`);
      }

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
  #nextList

  constructor({thing} = {}) {
    Object.assign(this, {thing});
    this.#nextList = [];
  }

  get nextList() {
    return Array.from(this.#nextList);
  }

  set nextList(nothing) {
    throw new TypeError(`Cannot set successors for all lists, use setNextAtList(i, node) instead.`);
  }

  setNext(i, node) {
    return this.#nextList[i] = node;
  }
}

// helper methods
  function guardValidOptions(opts) {
    const OptionTypes = {
      p: 'number',         
      max: 'boolean',
      randomized: 'boolean',
      duplicatesOkay: 'boolean',
      _breakLinearize: 'boolean',
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
 

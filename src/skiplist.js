import {Node} from './lib/linkedlist.js';

// constants
  const DEFAULT_OPTIONS = {
    max: false,             /* increasing order, true gives decreasing order */
    p: 1/2,                 /* probability node lifts to higher levels */
    randomized: true,       /* if we base lifting on randomizedation   */
      // false uses a deterministic lifting scheme
    duplicatesOkay: false,  /* only insert each thing once, true allows dupes */
    _breakLinearize: false, /* don't only use the lower level. This is a dev setting */
      // mainly used to compare time between linear vs higher level #locate 
    compare: undefined      /* custom comparator function */
  };

  const OptionKeys = new Set(Object.keys(DEFAULT_OPTIONS));

export default class SkipList {
  // private fields
  #size
  #root

  // API
    constructor(options, data) {
      if ( ! options ) {
        options = DEFAULT_OPTIONS;
      }
      options = Object.assign({}, DEFAULT_OPTIONS, options);

      guardValidOptions(options);

      // implementation progress option checkso
        if ( !options.randomized ) {
          throw new TypeError(`Deterministic node lifting has not been implemented yet.`);
        }

        if ( options._breakLinearize ) {
          console.warn(`You are using a developer option designed to test performance.
            It deliberately degrades performance to a linearized linked-list level,
            so that it can be compared to the speedup provided by skiplist.
            Everything will be SO much slower. 
          `);
        }

      this.config = Object.freeze(options);

      this.#root = new Node();
      this.#size = 0;

      if ( data !== undefined ) {
        try {
          for( const thing of data ) {
            this.insert(thing);
          }
        } catch(e) {
          console.warn({e, data});
          if ( e.toString().includes('iterable') ) {
            throw new TypeError(`Parameter 'data' needs to be iterable, if provided. It was not.`);
          } else {
            throw e;
          }
        }
      }
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

    has(thing) {
      return this.#locate(thing).has;
    }

    insert(thing) {
      const liftUpdates = [];
      let doInsert = false;
      let newNode;

      let {node, has} = this.#locate(thing, liftUpdates);

      if ( has ) {
        // node will be the last in the chain of 'thing' nodes
        if ( this.config.duplicatesOkay ) doInsert = true;
      } else doInsert = true;

      if ( doInsert ) {
        newNode = new Node({thing});

        if ( node !== undefined ) {
          const post = node.nextList[0];
          if ( post !== undefined ) newNode.setNext(0, post);
          node.setNext(0, newNode);
        } else this.#root = newNode;

        // lift up the inserted node
        this.#liftUp(newNode, liftUpdates); 
        this.#size += 1;
      }

      return doInsert;
    }

    delete(thing) {
      let deleted = false;

      let {node, has} = this.#locate(thing);

      if ( has ) {
        for( let i = 0; i < Math.max(node.lastList.length, node.nextList.length); i++ ) {
          const next = node.nextList[i];
          const lastNode = node.lastList[i];
          if ( lastNode ) {
            lastNode.setNext(i, next);
          }
        }

        deleted = true;

        this.#size -= 1;
      }

      return deleted;
    }

  // private instance methods
    // locate a thing, and save any update path 
    #locate(thing, updates = []) {
      let node = this.#root;
      let found = false;
      let level;
      let lastNode;

      if ( node !== undefined ) {
        level = node.nextList.length - 1;

        if ( this.config._breakLinearize ) level = 0;

        while(node !== undefined && level >= 0 && ! found) {
          const next = node.nextList[level];
          //console.log({next, level, node});

          // if there are no more nodes at this level
          if ( next == undefined ) {
            goDown();
          } else { // there are more nodes at this level and we could go across
            // so we need to compare the next
            const comparison = this.#compare(thing, next.thing);

            if ( comparison > 0 ) { // if thing comes before next.thing
              goDown();
            } else if ( comparison < 0 ) { // if it comes after next.thing
              goAcross(next);
            } else { // if it equals next thing
              found = true;
              node = next;
              if ( this.config.dupeslicatesOkay ) { 
                // move toward the last duplicate
                goAcross(next);
              }
            }
          }
        }

        if ( node == undefined ) {
          // we reached the end of the bottom path
          node = lastNode;
        }

        updates[0] = node;
      }

      return {node, has: found}

      // helper closures
        function goDown() {
          // save this node for possible update on lifting
          updates[level] = node;
          // go down
          level -= 1;
        }

        function goAcross(next) {
          // save this node for possible update on lifting
          updates[level] = node;
          // save for possible insertion
          lastNode = node;
          // go across
          node = next;
        }
    }

    // life a node up to higher levels
    #liftUp(node, updates) {
      if ( node == this.#root ) return;
      if ( this.config.randomized ) {
        let level = 0;

        /* eslint-disable no-constant-condition */
        while(true) {
          const val = Math.random(); 
          if ( val <= this.config.p ) {
            level += 1;
            const prior = updates[level] || this.#root;
            node.setNext(level, prior.nextList[level]);
            prior.setNext(level, node);
          } else break;
        }
        /* eslint-enable no-constant-condition */
      } else {
        throw new TypeError(`Need to implement deterministic lifting.`);
      }
    }

    // determine order between two things
    #compare(aThing, bThing) {
      if ( this.config.compare ) {
        return this.config.compare.call(this, aThing, bThing);
      } else {
        // order comparison
        if ( aThing > bThing ) {
          return this.config.max ? 1 : -1;
        } else if ( aThing === bThing ) {
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

      console.log(`Size: ${skiplist.size}`);

      console.log('\n\n');
    }

    static merge(slist1, slist2) {
      console.log({slist1,slist2});
      throw new TypeError(`Need to implement skip list merge.`);
    }

  // debug methods
    _debugShowWork(thing) {
      const updates = [];
      const {node, has} = this.#locate(thing, updates);
      console.log({node, has, nextList: node.nextList, lastList: node.lastList, updates});
      return has;
    }
}

export const Class = SkipList;
export function create(...args) {
  return new SkipList(...args);
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
 

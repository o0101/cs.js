import {Node} from './lib/linkedlist.js';

// constants
  const DEFAULT_OPTIONS = {
    max: false,               /* increasing order, true gives decreasing order */
    p: 1/2,                   /* probability node lifts to higher levels */
    randomized: true,         /* if we base lifting on randomizedation   */
      // false uses a determ  inistic lifting scheme
    duplicatesOkay: false,    /* only insert each thing once, true allows dupes */
    _breakLinearize: false,   /* don't only use the lower level. This is a dev setting */
      // mainly used to compare time between linear vs higher level #locate 
    compare: undefined,       /* custom comparator function */
    indexOptimization: false, /* don't try to speed up how we count indexes, true is try */
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
      this.#root.nextWidth = [0];
      this.#root.lastWidth = null;
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

    get(thing) {
      const {node, has, index} = this.#locate(thing);
      let value;
      if ( has ) {
        ({value} = node);
      }
      return {has, value, index};
    }

    getSlot(index) {
      const {node, has} = this.#locateByIndex(index);

      let thing, value;

      if ( has ) {
        ({thing, value} = node);
      }
      return {has, thing, value};
    }

    has(thing) {
      return this.#locate(thing).has;
    }

    insert(thing, value = true) {
      const liftUpdates = {nodes:[], indexes:[]};
      let doInsert = false;
      
      let {node, has, index} = this.#locate(thing, liftUpdates);

      if ( has ) {
        // node will be the last in the chain of 'thing' nodes
        if ( this.config.duplicatesOkay ) doInsert = true;
      } else doInsert = true;

      if ( doInsert ) {
        const newNode = new Node({thing});
        newNode.nextWidth = [0];
        newNode.lastWidth = [0];

        // lift up the inserted node
        this.#liftUp(newNode, liftUpdates, index); 
        this.#size += 1;

        node = newNode;
      }

      node.value = value;

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

    *entries() {
      let node = this.#root;
      while(node.nextList[0] !== undefined) {
        node = node.nextList[0];
        yield [node.thing, node.value];
      }
    }

    *keys() {
      let node = this.#root;
      while(node.nextList[0] !== undefined) {
        node = node.nextList[0];
        yield node.thing;
      }
    }

    *values() {
      let node = this.#root;
      while(node.nextList[0] !== undefined) {
        node = node.nextList[0];
        yield node.value;
      }
    }

    get [Symbol.iterator]() {
      return this.entries.bind(this);
    }

  // alias
    set(thing, value) {
      return this.insert(thing, value);
    }

  // private instance methods
    // insert on row 0 and lift a node up to higher levels
    #liftUp(node, updates, targetIndex = 0) {
      if ( this.config.randomized ) {
        let level = 0;

        /* eslint-disable no-constant-condition */
        while(true) {
          const val = Math.random(); 
          if ( level === 0 || val <= this.config.p ) {
            let prior = updates.nodes[level];
            if ( prior === undefined ) {
              updates.nodes[level] = this.#root;
              updates.indexes[level] = 0;
            }
            prior = updates.nodes[level];

            node.setNext(level, prior.nextList[level]);
            prior.setNext(level, node);
          } else break;
          level += 1;
        }
        /* eslint-enable no-constant-condition */

        for( let i = 0; i < updates.nodes.length; i++ ) {
          const prior = updates.nodes[i];
          if ( prior === undefined ) continue;
          prior.nextWidth[i] = targetIndex - updates.indexes[i];
          prior.nextWidth[i] += 1;
        }
      } else {
        throw new TypeError(`Need to implement deterministic lifting.`);
      }
    }

    // locate a thing, 
      // if the thing is there, returns its node,
      // otherwise return the node that would be before it, if it were there,
      // also, return its index 
      // and save any update path (the path we traverse to get there,
      // and which needs to be updated on insert/delete)
    // locate the thing
    #locate(thing, updates = {nodes: [], indexes: []}) {
      let node = this.#root;
      let found = false;
      let index = 0;
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

        updates.nodes[0] = node
        updates.indexes[0] = index;
      }

      return {node, has: found, index}

      // helper closures
        function goDown() {
          // save this node for possible update on lifting
          updates.nodes[level] = node;
          updates.indexes[level] = index;
          // go down
          level -= 1;
        }

        function goAcross(next) {
          // save this node for possible update on lifting
          updates.nodes[level] = node;
          updates.indexes[level] = index;
          // save for possible insertion
          lastNode = node;
          index += node.nextWidth[level];
          // go across
          node = next;
        }
    }

    // locate a thing by index
    #locateByIndex(index) {
      // why do we add 1 here?
        // actually our skiplist's regular nodes are 1-indexed
        // with the inner root is at index 0
        // which accounts for the 1 width links from root to head
      index += 1;       
      let sum = 0;
      let node = this.#root;
      let found = false;
      let level;

      if ( node !== undefined ) {
        level = node.nextList.length - 1;

        if ( this.config._breakLinearize ) level = 0;

        while(node !== undefined && level >= 0 && ! found) {
          const linkWidth = node.nextWidth[level];
          const next = node.nextList[level];
          //console.log({next, level, node});

          // if there are no more nodes at this level
          if ( next == undefined ) {
            goDown();
          } else { // there are more nodes at this level and we could go across
            // so we need to compare the next

            if ( (sum + linkWidth) > index ) { // if thing comes before next.thing
              goDown();
            } else if ( (sum + linkWidth) < index ) { // if it comes after next.thing
              goAcross(next, linkWidth);
            } else { // if it equals next thing
              found = true;
              node = next;
            }
          }
        }
      }

      return {node, has: found}

      // helper closures
        function goDown() {
          // save this node for possible update on lifting
          sum += 0;
          // go down
          level -= 1;
        }

        function goAcross(next, linkWidth) {
          // save this node for possible update on lifting
          sum += linkWidth;
          // go across
          node = next;
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
    static print(skiplist, showWidths = false) {
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
          if ( showWidths ) {
            row.push(`(${node.nextWidth[i]})`);
          }
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
      const updates = {nodes:[], indexes:[]};
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
      compare: ['undefined', 'function'],
      indexOptimization: 'boolean'
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
 

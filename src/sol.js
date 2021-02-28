import {LinkedList, Node} from './lib/linkedlist.js';

// constants
  const UNITY_THRESH = 1e-5;
  const DEFAULT_OPTS = {
    asLinkedList: false,        /* underlying store is linked list, false is array */
    moveToFront: 0.8,           /* MTF reorganize scheme probability */
    swap: 0.2,                  /* swap reorganize scheme probability */
    dupesOK: false,             /* duplicate keys are not OK, true they are */
    _breakNoReorganize: false,  /* debug option to compare performance with simple list */
  };
  const OptionKeys = new Set(Object.keys(DEFAULT_OPTS));

export default class SOL {
  // private slots
  #store
  #lastAccessedKey

  // API
    constructor(opts) {
      if ( ! opts ) {
        opts = DEFAULT_OPTS;
      }

      const options = Object.assign(clone(DEFAULT_OPTS), opts);

      guardValidOptions(options, opts);

      this.config = Object.freeze(clone(options));

      if ( this.config.asLinkedList ) {
        this.#store = new LinkedList();
      } else {
        this.#store = [];
      }
      this.#lastAccessedKey = null;
    }

    set(key, value) {
      const {index, copy} = this.#findOnly(key);
      if ( copy !== undefined && ! this.config.dupesOK ) {
        if ( this.config.asLinkedList ) {
          copy.thing = {key, value};
        } else {
          this.#store[index] = {key, value};
        }
      } else {
        if ( this.config.asLinkedList ) {
          this.#store.tail = new Node({thing:{key,value}});
        } else {
          this.#store.push({key, value});
        }
      }
    }

    has(key) {
      const result = this.#findOnly(key);
      if ( result.copy === undefined ) return false;
      return true;
    }

    get(key) {
      const {copy} = this.#locateAndReorganize(key);
      if ( this.config.asLinkedList ) {
        if ( copy !== undefined ) return copy.thing; 
      } else {
        return copy;
      }
    }

    delete(key) {
      const {index, copy: obj} = this.#findOnly(key);
      if ( obj !== undefined ) {
        if ( this.config.asLinkedList ) {
          this.#store.delete(obj);
          return obj.thing;
        } else {
          this.#store.splice(index, 1);
          return obj;
        }
      }
    }

    get length() {
      return this.#store.length;
    }

    get [Symbol.iterator]() {
      return solIterator.bind(this);

      function *solIterator() {
        for(const thing of this.#store) {
          yield thing;
        }
      }
    }

  // public static methods
    static print(sol) {
      //console.log(`SOl: ${JSON.stringify(sol.#store)}`);
      if ( sol.config.asLinkedList ) {
        console.log(`SOL first 5: ${JSON.stringify([...sol.#store].slice(0,5))}`);
      } else {
        console.log(`SOL first 5: ${JSON.stringify(sol.#store.slice(0,5))}`);
        console.log(`SOL length: ${sol.length}`);
      }
    }

  // private instance methods
    #findOnly(key) {
      if ( this.config.asLinkedList ) {
        let index = 0;
        let copy;
        for( const node of this.#store ) {
          if ( node.thing !== undefined && node.thing.key === key ) {
            copy = node;
            break;
          }
          index += 1;
        }

        if ( copy === undefined ) {
          index = -1;
        }

        return {index, copy};
      } else {
        const index = this.#store.findIndex(({key:target}) => target === key);
        const copy = this.#store[index];
        return {index, copy};
      }
    }

    #locateAndReorganize(key) {
      let obj;
      let index;

      ({copy: obj, index} = this.#findOnly(key));

      const item = obj;

      if ( obj === undefined ) {
        return {index: undefined, copy: undefined};
      }

      if ( this.config.asLinkedList ) {
        obj = obj.thing;
      }

      const copy = {key,value: obj.value};

      if ( index == 0 ) return {index, copy};

      const val = Math.random();

      let method;
      if ( val <= this.config.moveToFront ) {
        method = 'mtf';
      } else {
        method = 'swap';
      }

      if ( !this.config._breakNoReorganize ) {
        if ( this.config.asLinkedList ) {
          if ( method === 'mtf' ) {
            this.#store.head = item;
          } else {
            this.#store.advance(item);
          }
        } else {
          if ( method === 'mtf' ) {
            this.#store.splice(index, 1);
            index = 0;
            this.#store.splice(index, 0, copy);
          } else {
            const formerAhead = this.#store[index-1]; 
            this.#store[index-1] = copy;
            this.#store[index] = formerAhead;
            index = index - 1;
          }
        }
        this.#lastAccessedKey = key;
      } else {
        //console.log('No reorg');
      }

      return {index, copy};
    }
}

export const Class = SOL;
export function create(...args) {
  return new SOL(...args);
}

// helpers
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function guardValidOptions(options, opts) {
    const OptionTypes = {
      asLinkedList: 'boolean',        
      moveToFront: 'number',           
      swap: 'number',                  
      dupesOK: 'boolean',             
      _breakNoReorganize: 'boolean',  
    };

    const errors = [];
    const typesValid = Object
      .entries(options)
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
      .keys(options)
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

    let extraValid = true;
    
    // ensure probabilities are good
      // if you give both probs, then they must sum to 1.0 within a threshold
      // if you give just one, we will calculate the other one for you,
      // but the one you give must not be greater than 1
        if ( opts.moveToFront !== undefined && opts.swap !== undefined ) {
          const probabilities_sum_to_certainty = (1 - (opts.moveToFront + opts.swap)) < UNITY_THRESH;

          if ( ! probabilities_sum_to_certainty ) {
            errors.push({
              key: 'moveToFront AND swap',
              message: `
                If both provided, then moveToFront and swap MUST sum to 1.0 within
                a threshold of ${UNITY_THRESH}. Their sum was ${opts.moveToFront + opts.swap}
              `
            });
            extraValid = false;
          }
        } else if ( opts.moveToFront === undefined && opts.swap !== undefined ) {
          if ( opts.swap <= 1 && opts.swap >= 0 ) {
            opts.moveToFront = 1.0 - opts.swap;
          } else {
            errors.push({
              key: 'swap',
              message: `
                swap is a probability. If given,
                it must be a positive rational number, 
                not greater than 1. It was ${opts.swap}
              `
            });
            extraValid = false;
          }
        } else if ( opts.swap === undefined && opts.moveToFront !== undefined ) {
          if ( opts.moveToFront <= 1 && opts.moveToFront >= 0 ) {
            opts.swap = 1.0 - opts.moveToFront;
          } else {
            errors.push({
              key: 'moveToFront',
              message: `
                moveToFront is a probability. If given, 
                it must be a positive rational number, 
                not greater than 1. It was ${opts.moveToFront}
              `
            });
            extraValid = false;
          }
        } 

    const isValid = typesValid && keysValid && extraValid;

    if ( ! isValid ) {
      console.warn(JSON.stringify({errors,keysValid, typesValid}, null, 2));
      throw new TypeError(`Options were invalid.`);
    }
  }




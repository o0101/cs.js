// constants
  const UNITY_THRESH = 1e-5;
  const DEFAULT_OPTS = {
    asLinkedList: false,        /* underlying store is linked list, false is array */
    moveToFront: 0.5,           /* MTF reorganize scheme probability */
    swap: 0.5,                  /* swap reorganize scheme probability */
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

      this.#store = [];
      this.#lastAccessedKey = null;
    }

    set(key, value) {
      const {index, copy} = this.#findOnly(key);
      if ( copy !== undefined ) {
        this.#store[index] = {key, value};
      } else {
        this.#store.push({key, value});
      }
    }

    has(key) {
      const result = this.#findOnly(key);
      if ( result.copy === undefined ) return false;
      return true;
    }

    get(key) {
      return this.#locateAndReorganize(key).copy;
    }

    delete(key) {
      const {index, copy: obj} = this.#findOnly(key);
      if ( index >= 0 ) {
        this.#store.splice(index, 1);
      }
      return obj;
    }

    get length() {
      return this.#store.length;
    }

  // public static methods
    static print(sol) {
      //console.log(`SOl: ${JSON.stringify(sol.#store)}`);
      console.log(`SOL first 5: ${JSON.stringify(sol.#store.slice(0,5))}`);
      console.log(`SOL length: ${sol.length}`);
    }

  // private instance methods
    #findOnly(key) {
      const index = this.#store.findIndex(({key:target}) => target === key);
      const copy = this.#store[index];
      return {index, copy};
    }

    #locateAndReorganize(key) {
      let obj;
      let index;

      ({copy: obj, index} = this.#findOnly(key));

      if ( obj === undefined ) {
        return {index: undefined, copy: undefined};
      }

      const copy = {key,value: obj.value};

      if ( index == 0 ) return {index, copy};

      if ( !this.config._breakNoReorganize ) {
        if ( this.#lastAccessedKey == key ) {           // if two access in row and
          if ( index > 1 ) {                            // if in 3rd place or later, 
            // squeeze into 2nd place
            this.#store.splice(index, 1);
            index = 1;
            this.#store.splice(index, 0, copy);
          } else {                                      // if in 2nd place already swap to 1st place
            const formerTop = this.#store[0];
            this.#store[0]  = copy;
            this.#store[1] = formerTop;
            index = 0;
          }
        } else {                                        // or swap with lower index neighbour
          const formerAhead = this.#store[index-1]; 
          this.#store[index-1] = copy;
          this.#store[index] = formerAhead;
          this.#lastAccessedKey = key;
          index = index - 1;
        }
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

    const isValid = typesValid && keysValid;

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

    if ( ! isValid ) {
      console.warn(JSON.stringify({errors,keysValid, typesValid}, null, 2));
      throw new TypeError(`Options were invalid.`);
    }
  }




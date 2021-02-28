// constants
  const DEFAULT_OPTS = {
    asArray: true,              /* underlying store is array, false is linked list */
    dupesOK: false,             /* duplicate keys are not OK, true they are */
    _breakNoReorganize: false,   /* debug option to compare performance with simple list */
  };

export default class SOL {
  // private slots
  #array
  #lastAccessedKey

  // API
    constructor(opts) {
      if ( ! opts ) {
        opts = DEFAULT_OPTS;
      }

      opts = Object.assign(clone(DEFAULT_OPTS), opts);

      this.config = Object.freeze(clone(opts));

      this.#array = [];
      this.#lastAccessedKey = null;
    }

    set(key, value) {
      const {index, copy} = this.#findOnly(key);
      if ( copy !== undefined ) {
        this.#array[index] = {key, value};
      } else {
        this.#array.push({key, value});
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
        this.#array.splice(index, 1);
      }
      return obj;
    }

    get length() {
      return this.#array.length;
    }

  // public static methods
    static print(sol) {
      //console.log(`SOl: ${JSON.stringify(sol.#array)}`);
      console.log(`SOL first 5: ${JSON.stringify(sol.#array.slice(0,5))}`);
      console.log(`SOL length: ${sol.length}`);
    }

  // private instance methods
    #findOnly(key) {
      const index = this.#array.findIndex(({key:target}) => target === key);
      const copy = this.#array[index];
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
            this.#array.splice(index, 1);
            index = 1;
            this.#array.splice(index, 0, copy);
          } else {                                      // if in 2nd place already swap to 1st place
            const formerTop = this.#array[0];
            this.#array[0]  = copy;
            this.#array[1] = formerTop;
            index = 0;
          }
        } else {                                        // or swap with lower index neighbour
          const formerAhead = this.#array[index-1]; 
          this.#array[index-1] = copy;
          this.#array[index] = formerAhead;
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




// constants
  const DEFAULT_OPTS = {

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

      this.#array = [];
      this.#lastAccessedKey = null;
    }

    set(key, value) {
      this.#array.push({key, value});
    }

    get(key) {
      let index;
      const obj = this.#array.find(({key:target}, j) => {
        if ( target === key ) {
          index = j;
          return true;
        }
        return false;
      });

      if ( obj === undefined ) return;

      const copy = {key,value: obj.value};

      if ( index == 0 ) return copy;

      if ( this.#lastAccessedKey == key ) {           // if two access in row and
        if ( index > 1 ) {                            // in 3rd place or lower, move to 2nd place
          this.#array.splice(1, 0, copy);
        } else {                                      // if in 2nd place already move to 1st place
          const formerTop = this.#array[0];
          this.#array[0]  = copy;
          this.#array[1] = formerTop;
        }
      } else {                                        // swap with lower index neighbour
        const formerAhead = this.#array[index-1]; 
        this.#array[index-1] = copy;
        this.#array[index] = formerAhead;
        this.#lastAccessedKey = key;
      }

      return copy;
    }

    delete(key) {
      const index = this.#array.findIndex(({key:target}) => target === key);
      const obj = this.#array[index];
      if ( index >= 0 ) {
        this.#array.splice(index, 1);
      }
      return obj;
    }
}

export const Class = SOL;
export function create(...args) {
  return new SOL(...args);
}






let isValidNumber = function validateAsNumber(s) {
  //console.log({s});
  const End = Symbol.for(`[[End]]`);
  const VALID = 1;
  const INVALID = 0;
  const INTEGER = 2;
  const DECIMAL = 3;
  const DECIMAL_START = 4;
  const state = {
    [VALID]: {
      transition: symbol => {
        if ( symbol === End ) {
          return INVALID;
        } else if ( symbol.match(/\d/) ) {
          return INTEGER;
        }
        return INVALID;
      },
      get name() {
        return VALID;
      }
    },
    [INTEGER]: {
      transition: symbol => {
        if ( symbol === End ) {
          return VALID;
        } else if ( symbol.match(/\d/) ) {
          return INTEGER;
        } else if ( symbol === '.' ) {
          return DECIMAL_START;
        }
        return INVALID;
      },
      get name() {
        return INTEGER;
      }
    },
    [DECIMAL_START]: {
      transition: symbol => {
        if ( symbol === End ) {
          return INVALID;
        } else if ( symbol.match(/\d/) ) {
          return DECIMAL;
        }
        return INVALID;
      },
      get name() {
        return DECIMAL_START;
      }
    },
    [DECIMAL]: {
      transition: symbol => {
        if ( symbol === End ) {
          return VALID;
        } else if ( symbol.match(/\d/) ) {
          return DECIMAL;
        }
        return INVALID;
      },
      get name() {
        return DECIMAL;
      }
    },
    [INVALID]: {
      transition: symbol => INVALID,
      get name() {
        return INVALID;
      }
    }
  };

  const start = state[VALID];
  let current = start;

  for( const symbol of s ) {
    current = state[current.transition(symbol)];
    //console.log({symbol,state:current.name});
  }

  current = state[current.transition(End)];
  //console.log({symbol:End,state:current.name});

  return current.name === VALID;
}

console.log(isValidNumber('1231231'));
console.log(isValidNumber('123.1231'));
console.log(isValidNumber('.444'));
console.log(isValidNumber('34.'));
console.log(isValidNumber('.'));
console.log(isValidNumber('1.'));
console.log(isValidNumber(''));
console.log('Is this number valid 4.325? ' + isValidNumber("4.325"));
console.log('Is this number valid 1.1.1? ' + isValidNumber("1.1.1"));
console.log('Is this number valid 222? ' + isValidNumber("222"));
console.log('Is this number valid 22.? ' + isValidNumber("22."));
console.log('Is this number valid 0.1? ' + isValidNumber("0.1"));
console.log('Is this number valid 22.22.? ' + isValidNumber("22.22."));
console.log('Iis this number valid 1.? ' + isValidNumber("1."));


isValidNumber = function validateAsNumber(s) {

}

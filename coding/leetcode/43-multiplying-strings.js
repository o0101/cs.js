const DEBUG = false;
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2, ...radix) {
  if ( num1 === "0" || num2 === "0" ) return "0";

  const T = createTableaux(getUnits(num1, ...radix), getUnits(num2, ...radix));
  const Z = sumDiagonals(T);
  const N = carrySums(Z, ...radix);

  return [...N].reverse().map(u => toRep(u, ...radix)).join('');
};

const t = [
  multiply("2", "3"),
  multiply("123", "456"),
  multiply("444", "4567"),
  multiply("9999", "9999"),
  multiply("64135289477071580278790190170577389084825014742943447208116859632024532344630238623598752668347708737661925585694639798853367", "33372027594978156556226010605355114227940760344767554666784520987023841729210037080257448673296881877565718986258036932062711")
];
console.log(t);

function toRep(unit, base = 10, converter) {		
  if ( base < 2 || base > 36 || !Number.isInteger(base) ) {
    if ( typeof converter !== 'function' ) {
      throw new TypeError(`Provide a converter for conversion from base: ${base}`);
    }
  } else {
    converter = (u, b) => u.toString(b);
  }
 
  return converter(unit, base);
}

function getUnits(rep, base = 10, converter) {		
  if ( base < 2 || base > 36 || !Number.isInteger(base) ) {
    if ( typeof converter !== 'function' ) {
      throw new TypeError(`Provide a converter for conversion from base: ${base}`);
    }
  } else {
    converter = parseInt;
  }

  rep = Array.from(rep);

  rep.reverse();

  const units = rep.map(ru => converter(ru, base));

  DEBUG && console.log({units});

  return units;
}

function createTableaux(punits, qunits) {
  // p runs down rows, q across columns
  const T = new Array(punits.length);
  for( let row = 0; row < punits.length; row++ ) {
    const productRow = new Array(qunits.length);
    const pUnit = punits[row];
    for( let col = 0; col < qunits.length; col++ ) {
      const qUnit = qunits[col];
      const product = pUnit * qUnit;
      productRow[col] = product;
    }
    T[row] = productRow;
  }

  DEBUG && console.log({T});

  return T;
}

function sumDiagonals(T) {
  const LastRow = T.length - 1;
  const LastCol = T[0].length - 1;
  const K = LastRow + LastCol + 1;
  const Z = new Array(K).fill(0);
  for( let k = 0; k < K; k++ ) {
    const start = Math.max(0, k - LastCol);
    let z = 0;
    for( let i = start; i <= Math.min(LastRow, k); i++ ) {
      const row = i;    
      const column = k-i;
      DEBUG && console.log({K,Z,k,z,i,row,column,T});
      const unitProduct = T[row][column];
      z += unitProduct;
    }
    Z[k] = z;
  }
  return Z;
}

function carrySums(Z, base = 10, converter) {
  if ( base < 2 || base > 36 || !Number.isInteger(base) ) {
    if ( typeof converter !== 'function' ) {
      throw new TypeError(`Provide a converter for conversion from base: ${base}`);
    }
  } else {
    converter = parseInt;
  }

  const N = [];
  let carry = 0;

  for( let k = 0; k < Z.length; k++ ) {
    const sum = Z[k];
    const positionalUnit = sum + carry;
    const radixUnit = positionalUnit % base;
    carry = (positionalUnit - radixUnit) / base;
    N.push(radixUnit);
  }

  while(carry) {
    const radixUnit = carry % base; 
    carry = (carry - radixUnit) / base;
    N.push(radixUnit);
  }

  return N;
}

const R = {
  1000:   'M',
  500:    'D',
  100:    'C',
  50:     'L',
  10:     'X',
  5:      'V',
  1:      'I'
};
const SUB = {
  500:    [900, 'CM'],
  100:    [400, 'CD'],
  50:     [90, 'XC'],
  10:     [40, 'XL'],
  5:      [9, 'IX'],
  1:      [4, 'IV']
};
const Rk = Object.keys(R).sort((a,b) => Math.sign(b-a));

var intToRoman = function(num) {
  let s = '';
  while(num) {
    const largestLessThan = Rk.find(rk => rk <= num);
    const subThreshold = SUB[largestLessThan];
    if ( subThreshold && num >= subThreshold[0] ) {
      s += subThreshold[1]; 
      num -= subThreshold[0];
    } else {
      s += R[largestLessThan]; 
      num -= largestLessThan;
    }
  } 
  return s;
};

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const DEBUG = true;
var isMatch = function(S, P, s = 0, p = 0) {
  let starp = -1, stars = -1;
  while(s < S.length) {
    if ( S[s] === P[p] || P[p] === '?' ) {
      s++;
      p++;
    } else if ( P[p] === '*' ) {
      starp = p;
      stars = s;
      p++;
    } else if ( starp >= 0 ) {
      stars++;
      s = stars;
      p = starp+1;
    } else {
      return false;
    }
  }
  while(P[p] === '*') {
    p++;
  }
  return p >= P.length;
};

const T = [	
	["a",
	"?"
	],[
	"a",
	"*"
	],[
	"aa",
	"a"
	],[
	"aa",
	"*"
	],[
	"xyzabc",
	"*abc"
	],[
	"abc",
	"a?c"
	],[
	"abcjfjkad",
	"a?c*d"
	],[
	"acdcb",
	"a*c?b"
	],[
	"",
	"******"
	],[
	"a",
	"*"
	],[
	"abcabczzzde",
	"*abc???de*"
	],[
  "aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba",
  "a*******b"
  ],[
    "abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb",
    "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb"
  ]
].map(a => isMatch(...a));
console.log(T);

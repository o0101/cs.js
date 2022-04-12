class Q extends Array {
  constructor() {
    super();
  }
  
  nq(thing) {
    this.unshift(thing);
  }
  
  dq(thing) {
    return this.pop(thing);
  }
  
  peek() {
    return this[this.length-1];
  } 
  
  get size() {
    return this.length;
  }
  
  get isEmpty() {
    return this.length === 0; 
  }
}

var MyStack = function() {
  this.in = new Q(); 
  this.out = new Q();
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.in.nq(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
  const {['in']:In,out} = this;
  while(this.in.size > 1) {
    this.out.nq(this.in.dq());
  } 
  const t = this.in;
  this.in = this.out;
  this.out = t;
  return this.out.dq();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
  return this.in[0]; 
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.in.size === 0;
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */


const Empty = Symbol.for(`[[Empty]]`);
/**
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.list = new Array(k);
  this.list[0] = Empty;
  this.front = 0;
  this.rear = 0;
  this.k = k;
  this.full = false;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  if ( this.isEmpty() ) {
    this.list[this.rear] = value;
    return true;
  } else {
    if ( ((this.rear + 1) % this.k) === this.front ) {
      this.full = true;
      return false;
    }
    this.rear += 1;
    if ( this.rear >= this.k ) {
      this.rear %= this.k;
    }
    this.list[this.rear] = value;
    if ( ((this.rear + 1) % this.k) === this.front ) {
      this.full = true;
    }
    return true;
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  this.full = false;
  if ( this.isEmpty() ) return false;
  const out = this.list[this.front];
  this.list[this.front] = Empty;
  if ( this.front !== this.rear ) {
    this.front += 1;
  }
  if ( this.front >= this.k ) {
    this.front %= this.k;
  }
  return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  if ( this.isEmpty() ) return -1;
  return this.list[this.front];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  if ( this.isEmpty() ) return -1;
  //console.log(this.list, this.front, this.rear);
  return this.list[this.rear];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  return this.front === this.rear && this.list[this.rear] === Empty;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return this.full;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

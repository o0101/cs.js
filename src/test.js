import * as CS from './index.js';

const AS_TREE_SCALE_TEST_MAX = 1000;
const AS_LIST_SCALE_TEST_MAX = 10000000;
const ORDER_TEST_MAX = 1000;
const ORDER_TEST_RUNS = 3;
const LIST_SIZE = 1000;
const SLIST_SCALE_MAX = 100000;
const SOL_SCALE_MAX = 10000;
const DELETE_P = 0.25;

testAll();

export default {
  testAll
};

export function testAll() {
  //testHeap();
  //testSkipList();
  testSelfOrganizingList();
}

// self-organizing list tests
  function testSelfOrganizingList() {
    solScaleTest();
    solIteratorTest();
    solScaleTest({asLinkedList:true}); 
    solIteratorTest({asLinkedList:true});
  }

  function solScaleTest(opts) {
    console.group(`Self-organizing list scale test. Opts: ${JSON.stringify(opts)}`);
    console.time(`Self-organizing list scale test. Insert phase`);

    const sol = CS.SOL.create(opts);
    // the higher the skew the better the self-organizing list performs
    const list = randomNumberSkewedList(SOL_SCALE_MAX, 0.85);
    const deleteList = list.reverse().filter(() => Math.random() <= DELETE_P);

    const ISIZE = (new Set(list)).size;
    const DSIZE = (new Set(deleteList)).size;

    let valid = true;

    for(const num of list) {
      sol.set(num, `number ${num}`);
    }

    for(const num of deleteList) {
      sol.get(num);
    }

    for(const num of deleteList) {
      valid = valid && sol.has(num);
    }


    if ( valid ) {
      console.log(`Scale Has Test passed.`);
    } else {
      console.error(`Scale Has Test failed.`);
    }

    console.timeEnd(`Self-organizing list scale test. Insert phase`);
    console.time(`Self-organizing list scale test. Delete phase`);

    for(const num of deleteList) {
      sol.delete(num);
    }

    for(const num of deleteList) {
      const test = !sol.has(num);
      valid = valid && test
      if ( ! test ) {
        console.log(`Requested delete of ${num} 
          but skiplist still has it: ${JSON.stringify(sol.get(num))}`);
      }
    }

    if ( valid ) {
      console.log(`Scale Delete Test passed.`);
    } else {
      console.error(`Scale Delete Has Test failed.`);
    }
    
    console.timeEnd(`Self-organizing list scale test. Delete phase`);

    console.log(`Expected size: ${ISIZE - DSIZE}. Actual size: ${sol.length}`);

    CS.SOL.Class.print(sol);

    console.groupEnd();
    console.log();
  }

  function solIteratorTest(opts = {}) {
    console.group(`Self-organizing list iterator test. Opts: ${JSON.stringify(opts)}`);
    console.time(`Self-organizing list iterator test.`);

    opts.dupesOK = true;

    const sol = CS.SOL.create(opts);

    // the higher the skew the better the self-organizing list performs
    const list = randomNumberList(SOL_SCALE_MAX/10);

    let valid = true;

    for(const num of list) {
      sol.set(num, `number ${num}`);
    }

    let i = 0;

    for(const item of sol) {
      let num;

      if ( sol.config.asLinkedList ) {
        num = item.thing.key;
      } else {
        num = item.key;
      }

      valid = valid && num === list[i];
      i++;
    }

    if ( valid ) {
      console.log(`Iterator Test passed.`);
    } else {
      console.error(`Iterator Test failed.`);
    }

    console.timeEnd(`Self-organizing list iterator test.`);

    CS.SOL.Class.print(sol);

    console.groupEnd();
    console.log();
  }

// skiplist tests
  function testSkipList() {
    skipListInsertTest();
    skipListInsertTest({max:true});
    skipListInsertTest({max:true, _breakLinearize: true});

    skipListHasTest();
    skipListHasTest({max:true});
    skipListHasTest({duplicatesOkay:true});   // failing

    skipListScaleTest();
    skipListScaleTest({max:true});
    skipListScaleTest({p:1/4});
    //skipListScaleTest({p:1/4, _breakLinearize: true});

    skipListDeleteTest();
    skipListDeleteTest({max:true});
  }

  function skipListInsertTest(opts) {
    console.log(`Skiplist insert test. Opts: ${JSON.stringify(opts)}`);
    const slist = CS.SkipList.create(opts);

    slist.insert(0);
    slist.insert(1);
    slist.insert(2);
    slist.insert(3);
    slist.insert(4);
    slist.insert(5);
    slist.insert(6);

    CS.SkipList.Class.print(slist);
    console.log();
  }

  function skipListHasTest(opts) {
    console.log(`Skiplist has test. Opts: ${JSON.stringify(opts)}`);

    const slist = CS.SkipList.create(opts);
    const list = randomNumberList(LIST_SIZE);

    let valid = true;

    for(const num of list) {
      slist.insert(num);
    }

    for(const num of list) {
      valid = valid && slist.has(num);
      valid = valid && !slist.has('not in list');
    }

    CS.SkipList.Class.print(slist);
    
    if ( valid ) {
      console.log(`Test passed. All inserted numbers tested as present in skiplist.`);
    } else {
      console.error(`Test failed. Not all numbers inserted tested as present.`);
    }
    console.log();
  }

  function skipListScaleTest(opts) {
    console.time(`Skiplist scale test. Insert phase`);
    console.group(`Skiplist scale test. Opts: ${JSON.stringify(opts)}`);

    const slist = CS.SkipList.create(opts);
    const list = randomNumberList(SLIST_SCALE_MAX);

    let valid = true;

    for(const num of list) {
      slist.insert(num);
    }


    console.timeEnd(`Skiplist scale test. Insert phase`);
    console.time(`Skiplist scale test. Has phase`);

    for(const num of list) {
      valid = valid && slist.has(num);
    }

    if ( valid ) {
      console.log(`Scale Has Test passed.`);
    } else {
      console.error(`Scale Has Test failed.`);
    }
    
    console.timeEnd(`Skiplist scale test. Has phase`);
    console.groupEnd();
    console.log();
  }

  function skipListDeleteTest(opts) {
    console.log(`Skiplist delete test. Opts: ${JSON.stringify(opts)}`);

    const slist = CS.SkipList.create(opts);
    const list = randomNumberList(LIST_SIZE);
    const deleteList = list.filter(() => Math.random() <= DELETE_P);

    const ISIZE = (new Set(list)).size;
    const DSIZE = (new Set(deleteList)).size;

    let valid = true;

    for(const num of list) {
      slist.insert(num);
    }

    for(const num of list) {
      valid = valid && slist.has(num);
    }

    for(const num of deleteList) {
      slist.delete(num);
    }

    for(const num of deleteList) {
      const test = !slist.has(num);
      valid = valid && test
      if ( ! test ) {
        console.log(`Requested delete of ${num} but skiplist still has it.`);
        slist.has(num, true);
      }
    }

    CS.SkipList.Class.print(slist);
    
    if ( valid ) {
      console.log(`Test passed. All inserted numbers tested as present, and deleted numbers as absent, in skiplist.`);
    } else {
      console.error(`Test failed. Not all numbers inserted or deleted tested correctly.`);
    }

    console.log(`Expected size: ${ISIZE - DSIZE}. Actual size: ${slist.size}`);

    console.log();
  }

// heap tests
  function testHeap() {
    console.log({mainExport:CS});
    testHeapAsTree();
    testHeapAsList();
    scaleTest();
    orderTest({max:true, arity:2});
    orderTest({max:true, arity:4});
    orderTest({max:true, arity:8});
    orderTest({max:true, arity:5});
    orderTest({max:false, arity:2});
    orderTest({max:false, arity:4});
    orderTest({max:false, arity:8});
    orderTest({max:false, arity:5});
    orderTest({asTree: false, max:true, arity:2});
    orderTest({asTree: false, max:true, arity:4});
    orderTest({asTree: false, max:true, arity:8});
    orderTest({asTree: false, max:true, arity:5});
    orderTest({asTree: false, max:false, arity:2});
    orderTest({asTree: false, max:false, arity:4});
    orderTest({asTree: false, max:false, arity:8});
    orderTest({asTree: false, max:false, arity:5});
  }

  function testHeapAsTree() {
    const newHeap = CS.Heap.create();
    console.log('New heap');
    CS.Heap.Class.print(newHeap);

    console.log('Push 1');
    newHeap.push(1);
    CS.Heap.Class.print(newHeap);

    console.log('Push 2');
    newHeap.push(2);
    CS.Heap.Class.print(newHeap);

    console.log('Push 4');
    newHeap.push(4);
    CS.Heap.Class.print(newHeap);

    console.log('Push 3');
    newHeap.push(3);
    CS.Heap.Class.print(newHeap);

    console.log('Push 0');
    newHeap.push(0);
    CS.Heap.Class.print(newHeap);

    console.log('findMax');
    console.log({max:newHeap.peek()});
    console.log();

    console.log('Pop');
    newHeap.pop();
    CS.Heap.Class.print(newHeap);

    console.log('Push 1');
    newHeap.push(1);
    CS.Heap.Class.print(newHeap);

    console.log('findMax');
    console.log({max:newHeap.peek()});
    console.log();

    console.log('Replace max with 5');
    newHeap.replace(5);
    CS.Heap.Class.print(newHeap);

    console.log('findMax');
    console.log({max:newHeap.peek()});
    console.log();
  }

  function testHeapAsList() {
    const newHeap = CS.Heap.create({asTree:false});
    console.log('New heap');
    CS.Heap.Class.print(newHeap);

    console.log('Push 1');
    newHeap.push(1);
    CS.Heap.Class.print(newHeap);

    console.log('Push 2');
    newHeap.push(2);
    CS.Heap.Class.print(newHeap);

    console.log('Push 4');
    newHeap.push(4);
    CS.Heap.Class.print(newHeap);

    console.log('Push 3');
    newHeap.push(3);
    CS.Heap.Class.print(newHeap);

    console.log('Push 0');
    newHeap.push(0);
    CS.Heap.Class.print(newHeap);

    console.log('findMax');
    console.log({max:newHeap.peek()});
    console.log();

    console.log('Pop');
    newHeap.pop();
    CS.Heap.Class.print(newHeap);

    console.log('Push 1');
    newHeap.push(1);
    CS.Heap.Class.print(newHeap);

    console.log('findMax');
    console.log({max:newHeap.peek()});
    console.log();

    console.log('Replace max with 5');
    newHeap.replace(5);
    CS.Heap.Class.print(newHeap);

    console.log('findMax');
    console.log({max:newHeap.peek()});
    console.log();
  }

  function scaleTest() {
    {
      console.group(`Scale test heap as tree...`);
      console.time(`Heap As Tree ${AS_TREE_SCALE_TEST_MAX} insertions`);
      const newHeapAsTree = CS.Heap.create({max:true, arity:8});
      let max = -Infinity, min = Infinity;
      for( let i = 0; i < AS_TREE_SCALE_TEST_MAX; i++) {
        const randomNumber = Math.floor(Math.random()*AS_TREE_SCALE_TEST_MAX);
        newHeapAsTree.push(randomNumber);
        if ( randomNumber > max ) {
          max = randomNumber;
        } 
        if ( randomNumber < min ) {
          min = randomNumber;
        }
      }
      console.log({size:newHeapAsTree.size, heapTop:newHeapAsTree.peek(), actual: {min, max}});
      console.timeEnd(`Heap As Tree ${AS_TREE_SCALE_TEST_MAX} insertions`);
      console.groupEnd(`Done!`);
    }

    {
      console.group(`Scale test heap as list...`);
      console.time(`Heap As List ${AS_LIST_SCALE_TEST_MAX} insertions`);
      const newHeapAsList = CS.Heap.create({asTree:false,max:true, arity:8});
      let max = -Infinity, min = Infinity;
      for( let i = 0; i < AS_LIST_SCALE_TEST_MAX; i++) {
        const randomNumber = Math.floor(Math.random()*AS_LIST_SCALE_TEST_MAX);
        newHeapAsList.push(randomNumber);
        if ( randomNumber > max ) {
          max = randomNumber;
        } 
        if ( randomNumber < min ) {
          min = randomNumber;
        }
      }
      console.log({size: newHeapAsList.size, heapTop:newHeapAsList.peek(), actual:{min, max}});
      console.timeEnd(`Heap As List ${AS_LIST_SCALE_TEST_MAX} insertions`);
      console.groupEnd(`Done!`);
    }
  }

  function orderTest(opts) {
    console.log(`\n`);
    console.group(`Order test testing opts: ${JSON.stringify(opts)}`);
    let valid = true;
    let violations = 0;

    for( let r = 0; r < ORDER_TEST_RUNS; r++ ) {
      console.log(`Run: ${r+1}`);
      const heap = CS.Heap.create(opts);
      let last = heap.config.max ? Infinity : -Infinity;

      for( let i = 0; i < ORDER_TEST_MAX; i++ ) {
        heap.push(randomNumber(ORDER_TEST_MAX));
      }

      while(heap.size) {
        const next = heap.pop();
        if ( heap.config.max ) {
          valid = valid && (next <= last);
        } else {
          valid = valid && (next >= last);
        }

        if ( ! valid ) {
          console.log(`Heap property violation: ${last} -> ${next} does not satisfy ${
            heap.config.max ? 'max' : 'min'
          }`);
          violations ++;
        }

        last = next;
      }

      console.log(`End Run: ${r+1}`);
    }

    console.log(`Total ${violations} heap property violations across ${
      ORDER_TEST_RUNS
    } runs.`);

    if ( valid ) {
      console.log(`Test passed.`);
    } else {
      console.error(`Test failed.`);
    }

    console.log(`\n`);
    console.groupEnd();

    return valid;
  }

// helpers
  function randomNumber(n) {
    return Math.floor(Math.random()*n);
  }

  function randomNumberList(len) {
    const list = [];
    while(len--) {
      list.push(randomNumber(len));
    }
    return list;
  }

  function randomNumberSkewedList(len, Skew = 0.75) {
    const list = [];
    while(len--) {
      if ( Math.random() <= Skew ) {
        list.push(randomNumber(Math.log(len)));
        if ( list[list.length -1 ]  == -Infinity ) {
          list.pop();
          //console.log(`Why we get -Infinity here?`);
        }
      } else {
        list.push(randomNumber(len));
      }
    }
    return list;
  }

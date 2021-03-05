import SingList from './lib/singlist.js';
import {LinkedList} from './lib/linkedlist.js';
import * as CS from './index.js';

// constants
  const AS_TREE_SCALE_TEST_MAX = 5000;
  const AS_LIST_SCALE_TEST_MAX = 5000000;
  const ORDER_TEST_MAX = 10000;
  const ORDER_TEST_RUNS = 3;
  const LIST_SIZE = 1000;
  const SLIST_SCALE_MAX = 100000;
  const SOL_SCALE_MAX = 10000;
  const TRIE_SCALE_MAX = 100000;
  const TRIE_REPEAT_RUNS = 3;
  const DELETE_P = 0.25;
  const QUICKSORT_SCALE_MAX = 10000;
  const MERGESORT_SCALE_MAX = 100000;

testAll();

export default {
  testAll
};

export function testAll() {
  console.log(`\nRunning tests for cs.js / (cs101@npm)...\n`);
  
  testSkipList();
  return;

  testHeap();
  testMergeSort();
  testQuickSort();
  testSingList();
  testLinkedList();
  testSelfOrganizingList(); 
  testPQ();
  testTrie();

  console.log('Tests complete.\n\n');
}

// skiplist tests
  function testSkipList() {
    //skipListIndexTest();
    skipListIndexTestWithDeletion();

    return;

    skipListIteratorTests();
    skipListIndexTest();
    skipListMapTest();
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

  function skipListIteratorTests(opts) {
    console.log(`Skiplist iterator test. Opts: ${JSON.stringify(opts)}`);
    const MAX = 101;
    const slist = CS.SkipList.create(opts);
    let valid = true;

    for( let i = MAX; i >= 0; i-- ) {
      slist.insert(i, `number ${i}`);
    }

    const keys = [...slist.keys()];
    const values = [...slist.values()];
    const entries = [...slist.entries()];
    const normal = [...slist];

    for( let i = 0; i < MAX; i++ ) {
      const keyi = keys[i];
      const vali = values[i];
      const entryi = entries[i];
      const entryi2 = normal[i];

      const test =  keyi === i && 
                    vali === `number ${i}` && 
                    entryi.join(',') === `${i},number ${i}` &&
                    entryi2.join(',') === entryi.join(',');

      if ( ! test ) {
        console.error(`SkipList iterator test fails. Index: ${i} expects iterator values:
          ${JSON.stringify({key:i, value:`number ${i}`, entry:[i, `number ${i}`]})} but received
          ${JSON.stringify({keyi, vali, entryi, entryi2})}
        `);
      }

      valid = valid && test;
    }

    if ( ! valid ) { 
      console.error(`SkipList iterator tests failed.`);
    } else {
      console.log(`SkipList iterator tests passed.`);
    }
  }

  function skipListIndexTest(opts) {
    console.log(`Skiplist index test. Opts: ${JSON.stringify(opts)}`);
    const MAX = 1001;
    const slist = CS.SkipList.create(opts);
    let valid = true;

    for( let i = 0; i < MAX; i++ ) {
      slist.insert(i);
    }

    //CS.SkipList.Class.print(slist, true);

    for( let i = 0; i < MAX; i++ ) {
      const {thing} = slist.getSlot(i);
      const test = thing === i;
      if ( ! test ) {
        console.error(`SkipList index test fails. Index: ${i} expects thing value: ${i}.
          Received: ${node.thing}
        `);
      }
      valid = valid && test;
    }

    if ( ! valid ) { 
      console.error(`SkipList index test failed.`);
    } else {
      console.log(`SkipList index test passed.`);
    }
  }

  function skipListIndexTestWithDeletion(opts) {
    console.log(`Skiplist index test with deletion. Opts: ${JSON.stringify(opts)}`);
    const MAX = 101;
    const slist = CS.SkipList.create(opts);
    const list = [];
    let valid = true;

    for( let i = 0; i < MAX; i++ ) {
      slist.insert(i);
      list.push(i);
    }

    for( let i = 0; i < MAX; i += 3 ) {
      slist.delete(i);
      const spliceIndex = list.indexOf(i);
      list.splice(spliceIndex, 1 );
    }

    CS.SkipList.Class.print(slist, true);
    console.log(list);

    for( let i = 0; i < slist.size; i++) {
      const val = list[i];
      const {has, thing} = slist.getSlot(i);
      const test = thing === val;
      if ( ! test ) {
        console.error(`SkipList index test with deletion fails. Index: ${
            i
          } expects thing value: ${val}. It was ${thing}
        `);
      }
      valid = valid && test;
    }

    if ( ! valid ) { 
      console.error(`SkipList index test with deletion failed.`);
    } else {
      console.log(`SkipList index test with deletion passed.`);
    }
  }

  function skipListMapTest(opts) {
    console.log(`Skiplist insert test. Opts: ${JSON.stringify(opts)}`);
    const slist = CS.SkipList.create(opts);
    let valid = true;

    for( let i = 0; i < 1000;i++ ) {
      slist.set(i, i**2 + 1);
    }

    CS.SkipList.Class.print(slist);

    for( let i = 1000 - 1; i >= 0;i-- ) {
      const val = slist.get(i).value;
      const test = val === i**2 + 1;
      valid = valid && test;
      if ( ! test ) {
        console.error(`SkipList Map test violation. Value ${val} at i ${i} not ${i**2+1}.`);
      }
    }

    if ( ! valid ) { 
      console.error(`SkipList Map test failed.`);
    } else {
      console.log(`SkipList Map test passed.`);
    }
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
    slist.insert(-1);

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

    //CS.SkipList.Class.print(slist);
    
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

    //CS.SkipList.Class.print(slist);
    
    if ( valid ) {
      console.log(`Test passed. All inserted numbers tested as present, and deleted numbers as absent, in skiplist.`);
    } else {
      console.error(`Test failed. Not all numbers inserted or deleted tested correctly.`);
    }

    console.log(`Expected size: ${ISIZE - DSIZE}. Actual size: ${slist.size}`);

    console.log();
  }

// mergesort tests
  function testMergeSort() {
    mergeSortOrderTest();
    mergeSortOrderTest({invert:true});
    mergeSortOrderTest({compare:(a,b) => a - b <= 0 ? 1 : -1});
    mergeSortOrderTest({compare:(a,b) => a === b ? 0 : a - b <= 0 ? 1 : -1, invert: true});
  }

  function mergeSortOrderTest(opts = {}) {
    console.group(`\nMergeSort test: ${JSON.stringify({opts})}. Length: ${MERGESORT_SCALE_MAX}`);

    const list = randomNumberList(MERGESORT_SCALE_MAX);
    const compare = opts.compare;
    let valid = true;

    console.time(`MergeSort test`);
    const sortedList = CS.MergeSort.sort(list, opts);
    console.timeEnd(`MergeSort test`);

    let lastVal = CS.MergeSort.signedCompare(-1, 1, compare, opts.invert) < 0 ? Infinity : -Infinity;

    for( const val of sortedList ) {
      const comparison = CS.MergeSort.signedCompare(lastVal, val, compare, opts.invert);
      const test = comparison >= 0; // in order

      valid = valid && test;

      if ( ! test ) {
        console.error(`
          MergeSort test order violation. Value ${val} was not equal to or ${
            opts.invert ? 'less than' : 'greater than'
          } previous value ${lastVal}. It needs to be. ${comparison}
        `);
        break;
      }

      lastVal = val;
    }

    console.log({lastVal});

    if ( ! valid ) {
      console.error(`MergeSort test failed.`);
    } else {
      console.log(`MergeSort test passed.`);
    }

    console.groupEnd();
  }

// quicksort tests
  function testQuickSort() {
    quickSortOrderTest();
    quickSortOrderTest({invert:true});
    quickSortOrderTest({compare:(a,b) => a - b <= 0 ? 1 : -1});
    quickSortOrderTest({compare:(a,b) => a === b ? 0 : a - b <= 0 ? 1 : -1, invert: true});
  }

  function quickSortOrderTest(opts = {}) {
    console.group(`\nQuickSort test: ${JSON.stringify({opts})}. Length: ${QUICKSORT_SCALE_MAX}`);

    const list = randomNumberList(QUICKSORT_SCALE_MAX);
    const compare = opts.compare;
    let valid = true;

    console.time(`QuickSort test`);
    CS.QuickSort.sort(list, opts);
    console.timeEnd(`QuickSort test`);

    let lastVal = CS.QuickSort.signedCompare(-1, 1, compare, opts.invert) < 0 ? Infinity : -Infinity;

    for( const val of list ) {
      const comparison = CS.QuickSort.signedCompare(lastVal, val, compare, opts.invert);
      const test = comparison >= 0; // in order

      valid = valid && test;

      if ( ! test ) {
        console.error(`
          QuickSort test order violation. Value ${val} was not equal to or ${
            opts.invert ? 'less than' : 'greater than'
          } previous value ${lastVal}. It needs to be. ${comparison}
        `);
        break;
      }

      lastVal = val;
    }

    console.log({lastVal});

    if ( ! valid ) {
      console.error(`QuickSort test failed.`);
    } else {
      console.log(`QuickSort test passed.`);
    }

    console.groupEnd();
  }

// linkedlist tests
  function testSingList() {
    const sl = new SingList([1,2,3]);
    console.log([...sl]);
    sl.reverse();
    console.log([...sl]);
    sl.recursiveReverse(null, sl.head);
    console.log([...sl]);
  }

  function testLinkedList() {
    const ll = new LinkedList();
      
    const big = randomNumberList(1000);
    big.sort();

    for( const num of big ) {
      ll.push(num);
    }

    //console.log(big);

    ll.reverse();
    big.reverse();

    for( const num of big ) {
      const head = ll.unshift();
      //const head = ll.pop();
      //console.log(head);
      if ( head === num ) continue;
      else {
        console.error(`LinkedList reverse failed. Head ${head} !== ${num}`);
        break;
      }
    }
  }

// trie tests
  function testTrie() {
    basicTest();
    subtrieDeletionTest();
    trieScaleTest();
    trieScaleDeleteAndHasTest();
    trieKeyIteratorTest();
    repeatedIdempotentTest();
    edgecaseTrieIteratorTest();
  }

  function basicTest() {
    const trie = CS.Trie.create();

    console.group(`\nBasic trie test.`);
    console.log('Empty trie:\n');
    console.log(`size: ${trie.size}`);

    CS.Trie.Class.print(trie);

    trie.set('abc', 123);
    trie.set('ab', 9);
    trie.set('abracadabra', 12);

    console.log('Trie after 3 insertions:\n');
    console.log(`size: ${trie.size}`);
    CS.Trie.Class.print(trie);

    const trues = [
      {test: 'has abc', val: trie.has('abc') },
      {test: 'has ab', val: trie.has('ab') },
      {test: 'has abracadabra', val: trie.has('abracadabra') },
      {test: 'size is 3', val: trie.size === 3 },
    ]
    const falses = [
      {test: `has ''`, val: trie.has('') },
      {test: 'has xyz', val: trie.has('xyz') },
      {test: 'has abr', val: trie.has('abr') },
    ];

    trie.delete('ab');

    console.log('Trie after 1 deletion:\n');
    console.log(`size: ${trie.size}`);
    CS.Trie.Class.print(trie);

    falses.push({val: trie.has('ab'), test: 'has ab after delete'});

    trues.push(...[
      {test: 'get abc value is 123', val: trie.get('abc').value === 123 },
      {test: 'get abracadabra value is 12', val: trie.get('abracadabra').value === 12 },
      {test: 'size is 2', val: trie.size === 2 }
    ]);

    const truesValid = trues.every(test => test.val === true);
    const falsesValid = falses.every(test => test.val === false);

    const valid = truesValid && falsesValid;

    if ( valid ) {
      console.log(`Trie basic test passed.`);
    } else {
      console.error(`Trie basic test failed.`);
      const failedTrues = trues.filter(test => test.val !== true);
      const failedFalses = falses.filter(test => test.val !== false);
      console.log(JSON.stringify({failedTrues, failedFalses}, null, 2));
    }
    console.groupEnd();
  }

  function subtrieDeletionTest() {
    console.group(`\nSubtrie deletion test.`);
    const trie = CS.Trie.create();

    trie.insert('heliocopter', 999);
    trie.insert('heliocentric', 888);

    CS.Trie.Class.print(trie);

    trie.delete('heliocopter');

    CS.Trie.Class.print(trie);

    const expectFalse = Object.keys(CS.Trie.Class._testLocate(trie, 'helioc').node.children).length > 1;

    if ( expectFalse !== false ) {
      console.error(`Subtrie deletion test failed.`);
    } else {
      console.log(`Subtrie deletion test passed.`);
    }
    console.groupEnd();
  }

  function trieScaleTest() {
    console.group(`\nTrie scale test.`);

    const trie = CS.Trie.create();
    const list = randomWordList(TRIE_SCALE_MAX);
    let valid = true;

    console.time(`Trie scale test.`);

    for( const word of list ) {
      trie.insert(word, randomNumber(Math.floor(Math.log(TRIE_SCALE_MAX))));
    }

    for( const word of list ) {
      const test = trie.has(word);
      valid = valid && test;
      if ( ! test ) {
        console.log(`Scale test has failed: ${word} was not present`); 
      }
    }

    console.timeEnd(`Trie scale test.`);

    if ( ! valid ) {
      console.error(`Trie scale test failed.`);
    } else {
      console.log(`Trie scale test passed.`);
    }

    //CS.Trie.Class.print(trie);

    console.groupEnd();
  }

  function trieScaleDeleteAndHasTest() {
    console.group(`\nTrie scale delete and has test.`);

    const trie = CS.Trie.create();
    const list = [...new Set(randomWordList(TRIE_SCALE_MAX))];
    const deleteList = [...new Set(list.filter(() => Math.random() > 0.5))];
    const addSet = new Set(list);
    const deleteSet = new Set(deleteList);
    const neverAddedList = randomWordList(TRIE_SCALE_MAX).filter(word => !addSet.has(word));
    let valid = true;

    console.time(`Trie scale test.`);

    for( const word of list ) {
      trie.insert(word, randomNumber(Math.floor(Math.log(TRIE_SCALE_MAX))));
    }

    const postInsertTrieSize = trie.size;

    for( const word of deleteList ) {
      trie.delete(word);
      const test = !trie.has(word);
      valid = valid && test;
      if ( ! test ) {
        console.error(`Scale has test failed: ${word} was not present`); 
      }
    }

    for ( const word of neverAddedList ) {
      const test = !trie.has(word);
      if ( ! test ) {
        console.error(`Word ${word} was never added. But trie has it.`);
      }
      valid = valid && test;
    }

    const postDeleteTrieSize = trie.size;

    console.timeEnd(`Trie scale test.`);

    const sizeTest = postInsertTrieSize === addSet.size && postDeleteTrieSize === (addSet.size - deleteSet.size);

    if ( ! sizeTest ) {
      console.error(`Scale size test failed.
        Expected sizes: ${JSON.stringify({
          postInsertTrieSize: addSet.size, postDeleteTrieSize: addSet.size - deleteSet.size
        })}. 
        Actual sizes: ${JSON.stringify({
          postInsertTrieSize, postDeleteTrieSize
        })}.
      `);
    }

    valid = valid && sizeTest;

    if ( ! valid ) {
      console.error(`Trie scale test failed.`);
    } else {
      console.log(`Trie scale test passed.`);
    }

    //CS.Trie.Class.print(trie);

    console.groupEnd();
  }

  function trieKeyIteratorTest() {
    console.group(`\nTrie key iterator test.`);

    const trie = CS.Trie.create();

    trie.set('abc');
    trie.set('xyz');
    trie.set('wxy');
    trie.set('akka dakka');
    trie.set('wyx904');

    let keys = [...trie.keys()];

    keys.sort();

    const test = keys.join(',') === 'abc,akka dakka,wxy,wyx904,xyz';

    if ( ! test ) {
      console.error(`Trie key iterator test failed. Got: ${keys.join(',')}`);
    } else {
      console.log(`Trie key iterator short test passed.`);
    }

    keys.forEach(k => trie.delete(k));

    //CS.Trie.Class.print(trie);

    const list = [...new Set(randomWordList(TRIE_SCALE_MAX))];

    for( const word of list ) {
      trie.insert(word);  
    }

    list.sort();

    keys = [...trie.keys()];
    keys.sort();

    const longTest = list.join(',') === keys.join(',');

    if ( ! longTest ) {
      console.error(`Trie key iterator long test failed.`);
    } else {
      console.log(`Trie key iterator long test passed.`);
    }

    console.groupEnd();
  }

  function repeatedIdempotentTest() {
    console.group(`\nTrie repeated idempotent test.`);

    const trie = CS.Trie.create();
    const list = randomWordList(TRIE_SCALE_MAX);
    const addSet = new Set(list);
    let valid = true;

    console.time(`Trie repeated idempotent test.`);

    for( const word of list ) {
      trie.insert(word, word.length);
    }

    const firstRunKeys = [...trie.keys()].sort();

    for( let i = 1; i < TRIE_REPEAT_RUNS; i++ ) {
      for( const word of list ) {
        trie.insert(word, word.length);
      }

      for( const word of list ) {
        const test = trie.has(word);
        valid = valid && test;
        if ( ! test ) {
          console.log(`Scale test has failed: ${word} was not present`); 
        }
      }
    } 

    const postRepeatKeys = [...trie.keys()].sort();

    console.timeEnd(`Trie repeated idempotent test.`);

    const keyTest = firstRunKeys.join(',') === postRepeatKeys.join(',');

    if ( ! keyTest ) {
      console.error(`Key test failed. 
        Key set should in trie should be the same no matter how many times it is added.`);
    }

    const sizeTest = trie.size === addSet.size;

    if ( ! sizeTest ) {
      console.error(`Size test failed. 
        Trie size should be the same as the number of unique keys added,
        regardless of how many times those keys were added.
        Expected: ${addSet.size}
        Actual: ${trie.size}
      `);
    }

    valid = valid && keyTest && sizeTest;

    if ( ! valid ) {
      console.error(`Trie repeated idempotent test failed.`);
    } else {
      console.log(`Trie repeated idempotent test passed.`);
    }

    //CS.Trie.Class.print(trie);

    console.groupEnd();
  }

  function edgecaseTrieIteratorTest() {
    console.group(`\nTrie iterator edgecase test.`);

    const trie = CS.Trie.create();

    trie.set('abcdefghijklmnopq');
    trie.set('abx');

    let keys = [...trie.keys()];

    keys.sort();

    const test = keys.join(',') === 'abcdefghijklmnopq,abx';

    if ( ! test ) {
      console.error(`Trie iterator edgecase test failed. Got: ${keys.join(',')}`);
    } else {
      console.log(`Trie iterator edgecase test passed.`);
    }

    console.groupEnd();
  }

// heap tests
  function testHeap() {
    console.log({mainExport:CS});
    scaleTest();
    return;
    testHeapAsTree();
    testHeapAsList();
    orderTest({max:true, arity:2});
    orderTest({max:true, arity:4});
    orderTest({max:true, arity:8});
    orderTest({max:true, arity:5});
    orderTest({max:false, arity:2});
    orderTest({max:false, arity:4});
    orderTest({max:false, arity:8});
    orderTest({max:false, arity:5});
    orderTest({asTree: true, max:true, arity:2});
    orderTest({asTree: true, max:true, arity:4});
    orderTest({asTree: true, max:true, arity:8});
    orderTest({asTree: true, max:true, arity:5});
    orderTest({asTree: true, max:false, arity:2});
    orderTest({asTree: true, max:false, arity:4});
    orderTest({asTree: true, max:false, arity:8});
    orderTest({asTree: true, max:false, arity:5});
    testHeapify({max:true});
    testHeapify({max:false});
    testHeapify({arity: 4, max:true});
    testHeapify({arity: 4, max:false});
    testHeapify({asTree: true, max:true});
    testHeapify({asTree: true, max:false});
    testHeapify({arity: 4, asTree: true, max:true});
    testHeapify({arity: 4, asTree: true, max:false});
    testMerge();
    testMergeHuge();
  }

  function testMerge() {
    console.group(`Heap merge test`);
    const list = [1,2,3,4,5,5,6,7,8,9];
    const heapA = new CS.Heap.Class({asTree:true}, list.slice(0,5));
    const heapB = new CS.Heap.Class(null, list.slice(5));
    CS.Heap.Class.print(heapA);
    CS.Heap.Class.print(heapB);
    const heapC = CS.Heap.Class.merge(heapA, heapB);
    let valid = true;

    list.sort((a,b) => parseInt(a)-parseInt(b));

    while(heapC.size) {
      const heapNext = heapC.pop();
      const sortedListNext = list.pop();
      if ( heapNext !== sortedListNext ) {
        console.log(`Merged heap out of order: ${heapNext} !== ${sortedListNext}`); 
        valid = false;
      }
    }

    if ( valid ) {
      console.log(`Test passed.`);
    } else {
      console.error(`Test failed.`);
    }

    console.groupEnd();
    console.log(`\n`);
  }

  function testMergeHuge() {
    console.group(`Heap huge merge test`);
    const list = [...new Set(randomNumberList(ORDER_TEST_MAX))];
    const half = Math.ceil(list.length/2);
    const heapA = new CS.Heap.Class({asTree:true}, list.slice(0, half));
    const heapB = new CS.Heap.Class(null, list.slice(half));
    //CS.Heap.Class.print(heapA);
    //CS.Heap.Class.print(heapB);
    const heapC = CS.Heap.Class.merge(heapA, heapB);
    let valid = true;

    list.sort((a,b) => parseInt(a)-parseInt(b));

    const sizeTest = heapC.size === list.length && (heapA.size + heapB.size) === heapC.size;
    console.log(`Size test: ${sizeTest}`);

    while(heapC.size) {
      const heapNext = heapC.pop();
      const sortedListNext = list.pop();
      if ( heapNext !== sortedListNext ) {
        console.log(`Merged heap out of order: ${heapNext} !== ${sortedListNext}`); 
        valid = false;
      }
    }

    if ( valid ) {
      console.log(`Test passed.`);
    } else {
      console.error(`Test failed.`);
    }

    console.groupEnd();
    console.log(`\n`);
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
      const newHeapAsTree = CS.Heap.create({asTree: true, max:true, arity:8});
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
    console.group(`Order test testing opts: ${JSON.stringify(opts || '')}`);
    let valid = true;
    let violations = 0;

    for( let r = 0; r < ORDER_TEST_RUNS; r++ ) {
      console.log(`Run: ${r+1}`);
      const heap = CS.Heap.create(opts);
      let last = heap.config.max ? Infinity : -Infinity;

      const scaler = opts.asTree ? 10 : 1;

      for( let i = 0; i < ORDER_TEST_MAX/scaler; i++ ) {
        heap.push(randomNumber(ORDER_TEST_MAX));
      }

      //CS.Heap.Class.print(heap);

      console.log(`Post push size: ${heap.size}`);

      while(heap.size) {
        const next = heap.pop();
        if ( typeof next !== 'symbol' ) {
          if ( heap.config.max ) {
            valid = valid && (next <= last);
          } else {
            valid = valid && (next >= last);
          }
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

  function testHeapify(opts) {
    const list = [];
    const scaler = opts.asTree ? 10 : 1;
    let valid = true;
    let violations = 0;

    console.log(`\n`);
    console.group(`Heapify test testing opts: ${JSON.stringify(opts || '')}`);

    for( let i = 0; i < ORDER_TEST_MAX/scaler; i++ ) {
      list.push(randomNumber(ORDER_TEST_MAX));
    }

    const heap = CS.Heap.create(opts, list);
    let last = heap.config.max ? Infinity : -Infinity;

    //CS.Heap.Class.print(heap);

    console.log(`Post heapify size: ${heap.size}`);

    valid = valid && heap.size === list.length;

    console.log(`Size valid? ${valid}. Expected ${list.length} was ${heap.size}`);

    const pops = [];

    while(heap.size) {
      const next = heap.pop();
      if ( next === undefined ) break;
      pops.push(next);
      let test = true;
      if ( typeof next !== 'symbol' ) {
        if ( heap.config.max ) {
          test = (next <= last);
        } else {
          test = (next >= last);
        }
      }

      if ( ! test ) {
        console.log(`Heap property violation: ${last} -> ${next} does not satisfy ${
          heap.config.max ? 'max' : 'min'
        }`);
        violations ++;
      }

      valid = valid && test;

      last = next;
    }

    console.log(`Total ${violations} heap property violations.`);
    console.log(`Total pops: ${pops.length}`);


    if ( valid ) {
      console.log(`Test passed.`);
    } else {
      console.error(`Test failed.`);
    }

    console.log(`\n`);
    console.groupEnd();

    return valid;
  }

// PQ (priority queue) tests
  function testPQ() {
    pqOrderTest();
    pqOrderTest({max:false});
  }

  function pqOrderTest(opts) {
    console.log(`\n`);
    console.group(`PQ order test testing opts: ${JSON.stringify(opts || '')}`);
    let valid = true;
    let violations = 0;

    for( let r = 0; r < ORDER_TEST_RUNS; r++ ) {
      console.log(`Run: ${r+1}`);
      const pq = CS.PQ.create(opts);
      let last = pq.config.max ? {priority: Infinity} : {priority: -Infinity};

      for( let i = 0; i < ORDER_TEST_MAX; i++ ) {
        const num = randomNumber(ORDER_TEST_MAX);
        pq.insert({message: `hi i'm message number ${num}`, num}, num);
      }

      //CS.PQ.Class.print(pq);

      while(pq.size) {
        const next = pq.pull();
        let test;
        if ( pq.config.max ) {
          test = (next.priority <= last.priority);
        } else {
          test = (next.priority >= last.priority);
        }

        valid = valid && test;

        if ( ! test ) {
          console.log(`PQ property violation: ${last.priority} -> ${next.priority} does not satisfy ${
            pq.config.max ? 'max' : 'min'
          }`);
          violations ++;
        }

        last = next;
      }

      console.log(`End Run: ${r+1}`);
    }

    console.log(`Total ${violations} pq property violations across ${
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

// self-organizing list tests
  function testSelfOrganizingList() {
    solScaleTest();
    solIteratorTest();
    solScaleTest({asLinkedList:true}); 
    solIteratorTest({asLinkedList:true});

    solScaleTest({_breakNoReorganize:true});
    solIteratorTest({_breakNoReorganize:true});
    solScaleTest({asLinkedList:true,_breakNoReorganize:true}); 
    solIteratorTest({asLinkedList:true,_breakNoReorganize:true});
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

  function randomWordList(len) {
    return randomNumberList(len).map(num => num.toString(36));
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

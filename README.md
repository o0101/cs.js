# cs.js

Computer Science Data Structured and Algorithms in JavaScript ( Node.JS, ES ) in simple, clean, reusable code.

**DISCLAIMER: You will probably disagree with "simple", "clean", "reusable". I don't care what you think.** I'm OK you have your own view on it. Don't expect me to conform with yours, nor do I think there is :sparkles: *one true way* :sparkles: but I'm open to hear your open-minded suggestions of what you think works better, as long as you can respect that I'll have a different view maybe :smiley: and I don't think that makes either of us "right", nor do I think that either of us need to pretend the other is "wrong" if we disagree :heart: We can simply disagree :smiley:

[cs101](https://npmjs.com/package/cs101) on NPM.

# Contents

- [x] [Heap](src/heap.js)
- [x] [Skiplist](src/skiplist.js)
- [x] [Self-organizing list](src/sol.js) 
- [x] [Priority queue](src/pq.js)
- [x] [Trie](src/trie.js)
- [ ] Summary structure (count, sum, average, max, min, ~median?, ~membership?, etc without storing any data, just seeing it, online)
  - [ ] Structures for count distinct, hyperloglog, streaming 
  - one reference for something related https://github.com/marmarelis/rolling-quantiles
- [ ] [Treap](src/treap.js)
- [ ] Median heap
- [ ] [Balanced static BST](src/static-bst.js) ([Day–Stout–Warren algorithm](https://en.wikipedia.org/wiki/Day%E2%80%93Stout%E2%80%93Warren_algorithm))
- [ ] BIT/Fenwich Tree
- [ ] Segment Tree
- [ ] [Radix trie](src/trie.js) (Adaptive?)
- [ ] \*Sorted-linked-array 
- [ ] Heap X Circular buffer ( I have an idea for something like concentric circles, heap, each row / layer of heap is actually a circle, maybe like a linked list, or a circular buffer. Somehow combining some heap priority property with some FIFO or overwrite thing. Not sure yet, but maybe there is something )
- [ ] Circular queue (circular buffer, overwrite queue)
- [ ] Suffix trie
- [ ] Suffix array (something efficient from here about strings BWT, FM-index)
- [ ] Hashtable (discohash)
- [ ] Disjoint set union
- [ ] B-Tree
- [ ] Hierarchical/topological search tree
- [ ] Conflict-free replicated list
- [ ] conflict-free replicated map
- [ ] Conflict-free replicated JSON?

\* - invention

# To Do

- implement mergesort (iterative and recursive)
- implement quicksort (iterative and recursive)
- Improve skiplist performance. After adding index-ability, performance got a bit worse. Still very good, but it's 3x worse than original implementation without index-ability. Still ~1 second now for adding 100,000 keys, but used to be 300 ms.
- Add docs, complexity, and time benchmarks for all APIs

# Notes

## SkipList

- My favorite so far. Such a cool data structure. So simple, and yet so effective.
- O(lnn) for insert, delete, find, update, and maintains sorted key order, as well as can function as both a set and a map. Also, adding indexability is tricky at first, but is actually easy, and that this data structure can be extended to support random access is testament to how cool it is. SkipLists are great.
- Supports random access, insert, set (key, value), min or max orders on creation, custom comparators for key order, iterators (JS standard, keys, values, entries and naked iterator ([...skiplist]) for entries)

## Heap

- Implemented are variable arity (binary, ternary, n-ary) heaps using either a tree or a list as the storage.
- Interesting that the list implementation is around 500 times faster than the tree implementation.
- Heap as list can drop 10 million numbers in ~ 1 second on Intel(R) Xeon(R) CPU @ 2.00GHz
- Heap as tree can drop 1000 numbers in ~ 50 milliseconds on Intel(R) Xeon(R) CPU @ 2.00GHz
- Both implementations appear correct as they give the correct, independently verified max and min values, regardless of arity.
- There are some improvements I know about that can be made (in TODO) and also probably many improvements that I don't know about right now that can also be made. 
- I have a feeling that in some edge cases these results may be incorrect, but I have no idea what might produce that, and it's just a hunch.

## Sorted linked array

- Motivation: avoid the insertion cost of sorted arrays, and avoid the lack of random access and fast search for linked lists
- Similar work: skiplists solve this.
- The idea is you have a linked list layer that is the API for insertion and deletion, and then you have an index layer that is the API for binary search and random access
- The trick is how to keep these two layers in sync efficiently.
- the problems are that:
  - even you index a evenly distributed samply of the list at some point, after insertions and deletions, that sampling might be more accurate in some areas and less accurate in others, in that the gaps between adjacent samples may be shorter or longer than optimal
  - so the binary search on the sample list, can take you to the linked list nodes that bound the interval where you should find / insert / delete your element of interest
  - from there you still need to linear search that linked list interval
- but can we do better if we then recursively provide another layer of sampling?
- this is basically what skip lists do (the sampling means we skip over the elements we don't include in the representative sampling)
- a sampling is really just a snapshot of (or a snapshot of pointers to) an interval of linked list nodes at some point
- I think this is basically indexed skip lists. So in some sense I think skip lists are basically asymptotically optimal, since which every way you think of trying to solve this problem, you end up getting to skip list type structures. They're another fundamental, really, like trees, graphs, lista, and so on. Pretty fucking cool!

## Self organizing list

- move-to-front (2nd place) on double access, otherwise swap toward front

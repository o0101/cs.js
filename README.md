# cs.js

Computer Science Data Structured and Algorithms in JavaScript ( Node.JS, ES ) in simple, clean, reusable code

# Contents

- [x] [Heap](src/heap.js)


# Notes

## Heap

- Implemented are variable arity (binary, ternary, n-ary) heaps using either a tree or a list as the storage.
- Interesting that the list implementation is around 500 times faster than the tree implementation.
- Heap as list can drop 10 million numbers in ~ 1 second on Intel(R) Xeon(R) CPU @ 2.00GHz
- Heap as tree can drop 1000 numbers in ~ 50 milliseconds on Intel(R) Xeon(R) CPU @ 2.00GHz
- Both implementations appear correct as they give the correct, independently verified max and min values, regardless of arity.
- There are some improvements I know about that can be made (in TODO) and also probably many improvements that I don't know about right now that can also be made. 
- I have a feeling that in some edge cases these results may be incorrect, but I have no idea what might produce that, and it's just a hunch.

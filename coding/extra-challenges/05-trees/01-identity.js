/**
  Below is a recursive solution I copied from helpers.

  It's a recursive pre-order depth-first (root data before root.left check) check

  Other ways to implement are:

    - (two pass, O(N), O(N)) run the DFS using a loop and a stack into an array, one array for 
    each root, then check the data properties are the same at each poisition in the arrays, OR

    - (one pass, O(N), O(h)) run a single DFS, using two queues, one for each tree, and check 
    the data properties are the same each time we pop an item off the queue

**/
let areIdentical = function(root1, root2) {
	if ( root1 === root2 ) {
		return true;
	}

	if ( root1.data === root2.data ) {
		return areIdentical(root1.left, root2.left) && areIdentical(root1.right, root2.right);
	}

	return false;
};


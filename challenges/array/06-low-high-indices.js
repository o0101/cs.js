// My solution to this, before reading deeper into the challenge is an O(log N) 
// "dual binary range search". 
// Where we do binary range search (like for binary search on rotated array) but instead of  
// going into the 1 side where it isn't absent, we go into   
// both sides where it might be present and that are as far apart as possible. 
// We can do this with ranges as well, where we keep the left range
// low value to be less than key, and right range high value to be greater than key
// and the left range high value to be equal to key, as with the right range low value
// there may be a time where we are also ignoring 1 side, and where the other side contains the
// entire sequence of adjacent key entries
// So the binary search has two phases
// seek phase, where we find the min segment that contains the whole key sequence
// high > key, low < key
// and resolve phase, where we resolve the end points of that key sequence

var sum_to_n_a = function(n) {
    return n * (n + 1) / 2; // O(1) Time Complexity and O(1) Space Complexity
};

var sum_to_n_b = function(n) {
    var sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum; // Iterative: O(n) Time Complexity and O(1) Space Complexity
};

var sum_to_n_c = function(n) {
    // your code here
    if (n == 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1); // Recursive: O(n) Time Complexity and O(n) Space Complexity
};

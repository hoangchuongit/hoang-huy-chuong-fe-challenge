var sum_to_n_a = function(n) {
    let sum = 0;
    let i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    const helper = function(current, temp) {
        if (current > n) {
            return temp;
        }
        return helper(current + 1, temp + current);
    };
    return helper(1, 0);
};

var sum_to_n_c = function(n) {
    return n * (n + 1) / 2;
};
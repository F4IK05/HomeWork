function perfectNumber(num) {
    let sum = 0;

    for (let i = 1; i < num; i++) {
        if (num % i == 0) {
            sum += i;
        } 
    }

    if (sum == num) {
        return true;
    } else {
        return false;
    }
}

console.log(perfectNumber(6)) // 1 + 2 + 3 == 6
console.log(perfectNumber(7)) // 1 + 7 != 7
console.log(perfectNumber(28)) // 1 + 2 + 4 + 7 + 14 == 28

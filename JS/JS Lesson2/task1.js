function compareNumbers(num1, num2) {
    if (num1 < num2) {
        return -1;
    } else if (num1 > num2) {
        return 1;
    } else {
        return 0;
    }
}

console.log(compareNumbers(1,2))
console.log(compareNumbers(2,1))
console.log(compareNumbers(2,2))

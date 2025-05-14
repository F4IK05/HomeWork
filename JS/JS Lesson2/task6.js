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

function countOfPerfectNums(min, max) {
    let count = 0;
    for (let i = min; i <= max; i++) {
        if (perfectNumber(i)) {
            count++;
        }
    } 

    return count;
}

console.log(listOfPerfectNums(1,28))
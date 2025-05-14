function factorial(num) {
    let start = 1;
    for (let i = start + 1; i <= num; i++) {
        start *= i;
    }

    return start;
}

console.log(factorial(5))
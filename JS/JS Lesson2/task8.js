function timeInSeconds(hours, minutes=0, seconds=0) {
    return hours*60*60 + minutes*60 + seconds;
}

console.log(timeInSeconds(2, 40, 20))


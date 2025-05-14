function timeInSeconds(hours, minutes=0, seconds=0) {
    return hours*60*60 + minutes*60 + seconds;
}

function convertSeconds(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

function diffBtwnDates(hours1, minutes1, seconds1, hours2, minutes2, seconds2) {
    let inSecFirst = timeInSeconds(hours1, minutes1, seconds1);
    let inSecSecond = timeInSeconds(hours2, minutes2, seconds2);

    let diff = Math.abs(inSecFirst - inSecSecond);

    return convertSeconds(diff);
}

console.log(diffBtwnDates(1, 40, 0, 2, 0, 0));
console.log(diffBtwnDates(4, 50, 0, 1, 59, 40));
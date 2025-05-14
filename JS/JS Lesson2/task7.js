function time(hours, minutes=0, seconds=0) {
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    console.log(`${hours}:${mm}:${ss}`);
}

time(1,20)
time(2,40,2)
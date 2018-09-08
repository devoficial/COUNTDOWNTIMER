let countDown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime =  document.querySelector(".display__end-time");
const btns = document.querySelectorAll("[data-time]");

function timer(seconds){
    // clear the existing timer
    clearInterval(countDown);
    const now  = Date.now();
    const time =  now + seconds * 1000;
    console.log({now, time}); 
    displayTimeLeft(seconds);
    displayEndTime(time);

    countDown = setInterval(() => {
        const secondsLeft =Math.round((time - Date.now()) / 1000);
        // check when to stop
        if(secondsLeft < 0){
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000)
}

function  displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/ 60);
    const remainderSecs = seconds % 60;
    const display = `${minutes}:${remainderSecs < 10 ? "0":""}${remainderSecs}`;
    document.title = display;
    timerDisplay.textContent = display;
}
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours =  end.getHours();
    const secs = end.getSeconds();
    const minutes = end.getMinutes();
    const hoursIn12f = hours > 12 ?`0${hours -12}`: hour;
    const minsIn12f = minutes < 10 ?`0${minutes}`: minutes;
    const secsIn12f = secs < 10 ?`0${secs}`:secs;
    endTime.textContent = `Your time ends at - ${hoursIn12f}:${minsIn12f}:${secsIn12f}`;
}

function startTimer(e){
    const secs = parseInt(this.dataset.time);
    timer(secs)
}


[...btns].forEach(btn => btn.addEventListener("click", startTimer));

document.customForm.addEventListener("submit",function(e){
    e.preventDefault();
    const mins = this.minutes.value * 60;
    this.reset();
    timer(mins);
});
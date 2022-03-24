const fs = require("fs");
var startTime;
var interval;
var Time = 1;

// Converts number of seconds to an { hour : minute : second } format
function timeToString(time){
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    while(time >= 60){
        minutes++;
        time-=60;
    }
    seconds = time;
    while(minutes >= 60){
        hours++;
        minutes-=60;
    }
    return `${padTime(hours)} : ${padTime(minutes)} : ${padTime(seconds)}`
}

// Adds a zero to the beginning of any number less than 10 for aesthetic reasons
function padTime(time){
    if(time < 10){
        return `0${time}`;
    }
    else{return time}
}



window.addEventListener("DOMContentLoaded",()=>{
    let start = document.querySelector("button")
    start.addEventListener("click",()=>{
        interval = setInterval(()=>{
            updateCounter(timeToString(Time));
            Time++
        },1000);
    })
    document.querySelector("#stop").addEventListener("click",()=>{
        clearInterval(interval);
    })
})

// Updates the paragraph element holding the timer display
function updateCounter(content){
    document.querySelector("#counter").innerHTML = content
}
const fs = require("fs");
var startTime;
var interval;

// Converts Date objects to a { hour : minute : second } format
function timeToString(time){
    // Full disclosure I copied this code from w3schools
    var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours} : ${minutes} : ${seconds}`
}



window.addEventListener("DOMContentLoaded",()=>{
    let start = document.querySelector("button")
    start.addEventListener("click",()=>{
        startTime = Date.now();
        interval = setInterval(()=>{
            updateCounter(timeToString(Date.now() - startTime));
        });
    })
    document.querySelector("#stop").addEventListener("click",()=>{
        clearInterval(interval);
    })
})

// Updates the paragraph element holding the timer display
function updateCounter(content){
    document.querySelector("#counter").innerHTML = content
}
// I should have used REACT for this
const fs = require("fs");
const path = require('path');
const {ipcRenderer} = require("electron");

var interval;
var TimerActive = false;
var Time = 1;
var Timestr = timeToString(Time);
var TakeList = [];
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

class Take{
    constructor(startTime){
        this.start = startTime;
        this.end = "";
        this.active = true; 
    }
}

function AddTake(take){
    let div = document.querySelector(".takes");
    div.innerHTML += `<p class='left'>${take.start}`
}

window.addEventListener("DOMContentLoaded",()=>{
    let start = document.querySelector("button")
    // Onclick the stopwatch is started
    start.addEventListener("click",()=>{
        if(!TimerActive){
            TimerActive = true;
            interval = setInterval(()=>{
                Timestr = timeToString(Time);
                updateCounter(Timestr);
                
                Time++
            },1000);
        }
    })
    // Onclick the stopwatch is paused
    document.querySelector("#stop").addEventListener("click",()=>{
        clearInterval(interval);
        TimerActive = false;
    })
    document.querySelector(".startTake").addEventListener("click",()=>{
        let last = TakeList[TakeList.length-1]
        // Checking if new object needs to be pushed onto the TakeList
        if(last == undefined || !last.active){
            TakeList.push(new Take(Timestr))
        }
        else{
            last.start = Timestr;
        }
        populateList(TakeList);
    })
    document.querySelector(".endTake").addEventListener("click",()=>{
        let last = TakeList[TakeList.length-1]
        if(last.active){
            last.end = Timestr;
            last.active = false;
        }
        populateList(TakeList);
    })
    // document.querySelector(".export").addEventListener("click",test())
})

// Updates the paragraph element holding the timer display
function updateCounter(content){
    document.querySelector("#counter").innerHTML = content
}

// Updates DOM when state changes. 
function populateList(List){
    let div = document.querySelector(".takes");
    div.innerHTML = "";
    let style;
    let divide;
    for(let i=0;i<List.length;i++){
        if(List[i].active){
            style = "color:white;";
            divide = "";
        }
        else{
            style = "color:lightgrey;";
            divide = "|"
        }
        div.innerHTML += `<h3 style="${style}">${List[i].start} &ensp;${divide}&ensp; ${List[i].end}</h3>`
    }
}

ipcRenderer.on('save',save)

function save(_event,path){
    let str = `${document.querySelector(".nameInput").value}\n`;
    for(let i=0;i<TakeList.length;i++){
        str+= `${TakeList[i].start} | ${TakeList[i].end}\n`
    }
    console.log(str);
    console.log(path);
    fs.writeFile(path.filePath,str,()=>{})
}
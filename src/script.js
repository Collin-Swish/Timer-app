const fs = require("fs");
const Stopwatch = require("stopwatch")



window.addEventListener("DOMContentLoaded",()=>{
    console.log("finished")
    const button = document.querySelector("button")
    button.addEventListener("click",()=>{
        fs.mkdir("hello",()=>{})
    })
})

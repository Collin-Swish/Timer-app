const fs = require("fs");


window.addEventListener("DOMContentLoaded",()=>{
    console.log("finished")
    const button = document.querySelector("button")
    button.addEventListener("click",()=>{
        fs.mkdir("hello",()=>{})
    })
})

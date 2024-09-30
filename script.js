const root = document.querySelector(":root");

let xmasTrue = false;
let xmasHere = false;
let intervals = [];

function getTime(){
    let today = new Date();
    let year = today.getFullYear();
    let xmas = new Date("12/24/"+year)

    let startDate = 7776000000; // Converted to milliseconds the amount of days missing until it starts to show time until christmas
    let vars = getComputedStyle(root);

    let missingtime = new Date(xmas-today);
    if (xmas-today<=0){
        document.getElementById("timeLeft").innerText = "Merry Christmas!"
        root.style.setProperty("--percent", "100%");
        let timeEle = document.getElementById("timeLeft");
        timeEle.style.bottom = "50%";
        timeEle.style.color = "#120926";
        setTimeout(showtree, 300);
        xmasHere = true;
        return
    }
    let calcmiss = startDate-missingtime.getTime();
    if (missingtime.getTime() <= startDate){
        xmasTrue = true;
        let percentage = Math.floor((calcmiss/startDate)*100);
        console.log(percentage)
        root.style.setProperty("--percent", percentage+"%");
    }else{
        document.title = missingtime.getMonth() + ' months ' + (missingtime.getDate()) + ' days'
        document.getElementById("timeLeft").innerText = "Not even close"
        root.style.setProperty("--percent", "0%");
        let timeEle = document.getElementById("timeLeft");
        timeEle.style.bottom = "50%";
        timeEle.style.color = "snow";
        return
    }
    let timeEle = document.getElementById("timeLeft");

    let hours = missingtime.getUTCHours()
    hours = hours.toString().length == 1 ? "0"+hours : hours;

    let minutes = missingtime.getUTCMinutes()
    minutes = minutes.toString().length == 1 ? "0"+minutes : minutes;

    let seconds = missingtime.getUTCSeconds()
    seconds = seconds.toString().length == 1 ? "0"+seconds : seconds;

    timeEle.innerHTML = missingtime.getUTCMonth() + ' months ' + (missingtime.getUTCDate()-1) + ' days ' + hours + ':' + minutes + ':' + seconds + "<br><h2>Until Christmas</h2>";

    let percent = vars.getPropertyValue("--percent");

    if (percent>="85%"){
        let timeEle = document.getElementById("timeLeft");
        timeEle.style.bottom = "50%";
        timeEle.style.color = "#120926";
    }
}

getTime()
setInterval(getTime, 1000)

function createSnow(){
    let snow = document.createElement("div");
    let bg = document.getElementById("snow");
    snow.classList.add("snowfall");
    snow.style.left = Math.floor(Math.random()*90) + "%";
    snow.style.opacity = Math.floor(Math.random()*100)/100;
    snow.style.height = Math.floor(3+Math.random()*3) + "%";
    bg.appendChild(snow);
    setTimeout(()=>{
        bg.removeChild(snow);
    }, 15000)
}

function snowFall(amount, interval=100){
    let count = 0;
    let inter = setInterval(() => {
        if (count == amount){clearTimeout(inter)}
        createSnow()
        count++;
    }, interval);
    intervals.push(inter);
}

function showSanta(){
    let santa = document.getElementById("santa");
    santa.classList.add("moveSanta");
    setTimeout(() => {
        santa.classList.remove("moveSanta")
    }, 10000);
}

function randomCheck(){
    if(Math.floor(Math.random()*10) == 7){
        showSanta()
    }
}

if(xmasTrue && !xmasHere){
    document.title = "Xmas is coming!"
    intervals.push(setInterval(randomCheck, 10000));
    snowFall(-1, 250);
}

function showtree(){
    for(let i = 0; i<intervals.length; i++){
        clearInterval(intervals[i]);
    }
    document.getElementById("tree").id = "visibleTree"
}

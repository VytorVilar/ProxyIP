// TERMINAL

const terminal=document.getElementById("terminal")

const lines=[

"Booting cyber system...",
"Detecting network...",
"Locating IP address...",
"Scanning browser environment...",
"Checking hardware...",
"Loading geolocation...",
"Analysis complete ✔"

]

let i=0

function type(){

if(i<lines.length){

const div=document.createElement("div")

terminal.appendChild(div)

let j=0

const interval=setInterval(()=>{

div.innerHTML+=lines[i][j]

j++

if(j>=lines[i].length){

clearInterval(interval)
i++

setTimeout(type,500)

}

},30)

}

}

type()


// IP DATA

fetch("https://ipapi.co/json/")
.then(res=>res.json())
.then(data=>{

ip.innerText=data.ip
city.innerText=data.city
country.innerText=data.country_name
isp.innerText=data.org

const map=L.map("map").setView([data.latitude,data.longitude],10)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

L.marker([data.latitude,data.longitude]).addTo(map)

})


// BROWSER INFO

browser.innerText=navigator.userAgent
os.innerText=navigator.platform
lang.innerText=navigator.language

cpu.innerText=navigator.hardwareConcurrency
ram.innerText=navigator.deviceMemory || "N/A"


// CAMERA / MIC

navigator.mediaDevices.enumerateDevices().then(devices=>{

let cam=false
let mic=false

devices.forEach(device=>{

if(device.kind==="videoinput") cam=true
if(device.kind==="audioinput") mic=true

})

document.getElementById("cam").innerText=cam
document.getElementById("mic").innerText=mic

})


// MEMORY CHART

const chart=new Chart(

document.getElementById("memChart"),

{

type:"line",

data:{
labels:[],
datasets:[{
label:"JS Memory MB",
data:[]
}]
}

})

setInterval(()=>{

if(performance.memory){

const mem=(performance.memory.usedJSHeapSize/1048576).toFixed(2)

chart.data.labels.push("")
chart.data.datasets[0].data.push(mem)

if(chart.data.labels.length>20){

chart.data.labels.shift()
chart.data.datasets[0].data.shift()

}

chart.update()

}

},1000)
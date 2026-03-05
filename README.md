<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Matrix Security Panel</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<style>

body{
background:black;
color:#00ff9c;
font-family:Courier New;
margin:0;
overflow-x:hidden;
}

canvas{
position:fixed;
top:0;
left:0;
z-index:-1;
}

h1{
text-align:center;
padding:10px;
border-bottom:1px solid #00ff9c;
}

.container{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
padding:20px;
}

.painel{
border:1px solid #00ff9c;
padding:15px;
box-shadow:0 0 10px #00ff9c;
background:rgba(0,0,0,0.8);
}

#terminal{
height:200px;
overflow:auto;
}

#map{
height:350px;
}

.info{
margin:3px 0;
}

</style>
</head>

<body>

<canvas id="matrix"></canvas>

<h1>CYBER SECURITY MATRIX PANEL</h1>

<div class="container">

<div class="painel">

<h3>Terminal de Análise</h3>
<div id="terminal"></div>

</div>


<div class="painel">

<h3>Dados do Visitante</h3>

<div class="info">IP: <span id="ip"></span></div>
<div class="info">Cidade: <span id="city"></span></div>
<div class="info">Região: <span id="region"></span></div>
<div class="info">País: <span id="country"></span></div>
<div class="info">Latitude: <span id="lat"></span></div>
<div class="info">Longitude: <span id="lon"></span></div>

<div class="info">Provedor (ISP): <span id="isp"></span></div>
<div class="info">Organização: <span id="org"></span></div>
<div class="info">ASN: <span id="asn"></span></div>

<div class="info">Timezone: <span id="tz"></span></div>

<div class="info">Navegador: <span id="browser"></span></div>
<div class="info">Sistema: <span id="os"></span></div>
<div class="info">Idioma: <span id="lang"></span></div>

<div class="info">Resolução: <span id="res"></span></div>
<div class="info">Altura tela: <span id="height"></span></div>
<div class="info">Largura tela: <span id="width"></span></div>

<div class="info">CPU cores: <span id="cpu"></span></div>
<div class="info">Memória RAM: <span id="ram"></span></div>

<div class="info">Online: <span id="online"></span></div>
<div class="info">Cookies: <span id="cookies"></span></div>

<div class="info">Câmera detectada: <span id="cam"></span></div>
<div class="info">Microfone detectado: <span id="mic"></span></div>

</div>


<div class="painel" style="grid-column:span 2">

<h3>Mapa de Localização</h3>
<div id="map"></div>

</div>

</div>


<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>

// MATRIX EFFECT

const canvas=document.getElementById("matrix")
const ctx=canvas.getContext("2d")

canvas.height=window.innerHeight
canvas.width=window.innerWidth

const letters="01"
const fontSize=14
const columns=canvas.width/fontSize

const drops=[]

for(let x=0;x<columns;x++) drops[x]=1

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#0f0"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)]
ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
drops[i]=0

drops[i]++

}

}

setInterval(draw,33)


// TERMINAL

const terminal=document.getElementById("terminal")

const lines=[
"Iniciando análise do sistema...",
"Verificando conexão de rede...",
"Localizando endereço IP...",
"Consultando provedor de internet...",
"Coletando informações do navegador...",
"Verificando dispositivos disponíveis...",
"Carregando mapa de geolocalização...",
"Análise concluída ✔"
]

let i=0

function typeLine(){

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
setTimeout(typeLine,500)

}

},30)

}

}

typeLine()


// IP INFO

fetch("https://ipapi.co/json/")
.then(res=>res.json())
.then(data=>{

document.getElementById("ip").innerText=data.ip
document.getElementById("city").innerText=data.city
document.getElementById("region").innerText=data.region
document.getElementById("country").innerText=data.country_name
document.getElementById("lat").innerText=data.latitude
document.getElementById("lon").innerText=data.longitude

document.getElementById("isp").innerText=data.org
document.getElementById("org").innerText=data.org
document.getElementById("asn").innerText=data.asn

document.getElementById("tz").innerText=data.timezone


// MAP

const map=L.map('map').setView([data.latitude,data.longitude],10)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map)

L.marker([data.latitude,data.longitude]).addTo(map)

})


// BROWSER INFO

document.getElementById("browser").innerText=navigator.userAgent
document.getElementById("os").innerText=navigator.platform
document.getElementById("lang").innerText=navigator.language

document.getElementById("height").innerText=screen.height
document.getElementById("width").innerText=screen.width
document.getElementById("res").innerText=screen.width+"x"+screen.height

document.getElementById("cpu").innerText=navigator.hardwareConcurrency
document.getElementById("ram").innerText=navigator.deviceMemory || "N/A"

document.getElementById("online").innerText=navigator.onLine
document.getElementById("cookies").innerText=navigator.cookieEnabled


// CAMERA / MIC

navigator.mediaDevices.enumerateDevices()
.then(devices=>{

let cam=false
let mic=false

devices.forEach(device=>{
if(device.kind==="videoinput") cam=true
if(device.kind==="audioinput") mic=true
})

document.getElementById("cam").innerText=cam
document.getElementById("mic").innerText=mic

})

</script>

</body>
</html>

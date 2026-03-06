import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {

apiKey: "SUA_API_KEY",

authDomain: "SEU_PROJETO.firebaseapp.com",

databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",

projectId: "SEU_PROJETO",

storageBucket: "SEU_PROJETO.appspot.com",

messagingSenderId: "XXXX",

appId: "XXXX"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const terminal = document.getElementById("terminal");
const tabela = document.getElementById("tabela");
const online = document.getElementById("online");


function log(msg){

terminal.innerHTML += msg + "<br>";
terminal.scrollTop = terminal.scrollHeight;

}


async function registrarVisita(){

try{

log("Iniciando varredura de rede...");

const res = await fetch("https://ipapi.co/json/");

const dados = await res.json();

log("IP detectado: " + dados.ip);
log("Localização: " + dados.city + " / " + dados.country_name);

const visita = {

ip:dados.ip,
pais:dados.country_name,
cidade:dados.city,
navegador:navigator.userAgent,
sistema:navigator.platform,
data:new Date().toLocaleString()

};

await push(ref(db,"visitas"),visita);

log("Visitante registrado no banco");

}catch(e){

log("Erro ao registrar visitante");

console.error(e);

}

}


function carregarVisitantes(){

const visitasRef = ref(db,"visitas");

onValue(visitasRef,(snapshot)=>{

tabela.innerHTML="";

let contador=0;

snapshot.forEach((child)=>{

contador++;

const v = child.val();

const linha = `

<tr>

<td>${v.ip}</td>
<td>${v.pais}</td>
<td>${v.cidade}</td>
<td>${v.navegador}</td>
<td>${v.sistema}</td>
<td>${v.data}</td>

</tr>

`;

tabela.innerHTML += linha;

});

online.innerText = contador;

});

}


registrarVisita();

carregarVisitantes();

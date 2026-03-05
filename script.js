import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyBcvHd0Kg_hkur0X85pIkkSUljEd4nAROQ",
authDomain: "cyber-tracker-b1822.firebaseapp.com",
projectId: "cyber-tracker-b1822",
storageBucket: "cyber-tracker-b1822.firebasestorage.app",
messagingSenderId: "640630013098",
appId: "1:640630013098:web:5252369586ab63d5f6a4d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function registrarVisita(){

try{

let ipData = await fetch("https://ipapi.co/json/");
ipData = await ipData.json();

document.getElementById("ip").textContent = ipData.ip;
document.getElementById("pais").textContent = ipData.country_name;
document.getElementById("cidade").textContent = ipData.city;
document.getElementById("provedor").textContent = ipData.org;

document.getElementById("sistema").textContent = navigator.platform;
document.getElementById("navegador").textContent = navigator.userAgent;
document.getElementById("idioma").textContent = navigator.language;
document.getElementById("resolucao").textContent = screen.width + "x" + screen.height;

const visitante = {

ip: ipData.ip,
pais: ipData.country_name,
cidade: ipData.city,
provedor: ipData.org,
sistema: navigator.platform,
navegador: navigator.userAgent,
idioma: navigator.language,
resolucao: screen.width + "x" + screen.height,
url: window.location.href,
referer: document.referrer,
data: serverTimestamp()

};

await addDoc(collection(db,"visitas"), visitante);

document.getElementById("status").innerText = "Visitante registrado no banco";

}catch(e){

document.getElementById("status").innerText = "Erro ao registrar visitante";
console.error(e);

}

}

registrarVisita();

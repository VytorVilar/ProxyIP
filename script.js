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

let resposta = await fetch("https://ipapi.co/json");
let ipData = await resposta.json();

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
data: serverTimestamp()
};

await addDoc(collection(db,"visitas"), visitante);

document.getElementById("status").innerText = "Visitante registrado";

}catch(e){

console.error(e);
document.getElementById("status").innerText = "Erro ao registrar visitante";

}

}

registrarVisita();

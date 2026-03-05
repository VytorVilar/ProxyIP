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

    const visitante = {
      ip: ipData.ip,
      cidade: ipData.city,
      pais: ipData.country_name,
      provedor: ipData.org,
      navegador: navigator.userAgent,
      sistema: navigator.platform,
      idioma: navigator.language,
      resolucao: screen.width + "x" + screen.height,
      data: serverTimestamp()
    };

    await addDoc(collection(db, "visitas"), visitante);

    console.log("Nova visita registrada");

  }catch(e){
    console.error("Erro ao registrar visita", e);
  }

}

registrarVisita();

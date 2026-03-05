// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcvHd0Kg_hkur0X85pIkkSUljEd4nAROQ",
  authDomain: "cyber-tracker-b1822.firebaseapp.com",
  projectId: "cyber-tracker-b1822",
  storageBucket: "cyber-tracker-b1822.firebasestorage.app",
  messagingSenderId: "640630013098",
  appId: "1:640630013098:web:5252369586ab63d5f6a4d3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Conectar com banco de dados
const db = getFirestore(app);

// Função para coletar dados
async function coletarDados() {

  let ipData = await fetch("https://ipapi.co/json/");
  ipData = await ipData.json();

  const visitante = {
    ip: ipData.ip,
    pais: ipData.country_name,
    cidade: ipData.city,
    provedor: ipData.org,
    navegador: navigator.userAgent,
    sistema: navigator.platform,
    idioma: navigator.language,
    resolucao: screen.width + "x" + screen.height,
    data: new Date().toString()
  };

  // salvar no Firebase
  await addDoc(collection(db, "visitas"), visitante);

  console.log("Visitante registrado", visitante);
}

coletarDados();

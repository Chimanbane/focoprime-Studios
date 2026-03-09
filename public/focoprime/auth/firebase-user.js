import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// CONFIG
const firebaseConfig = {
apiKey: "AIzaSyD0e-w-clS29jxcGT1wL5HC8i-8nZJXV7o",
authDomain: "focoprime-a2913.firebaseapp.com",
projectId: "focoprime-a2913",
appId: "1:163306607632:web:bdb097981bef1c7c72e695"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db }


// ========================
// VERIFICAR SESSÃO
// ========================

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="../login/login.html";
return;

}

// guardar dados
localStorage.setItem("fp_user", JSON.stringify({
name:user.displayName,
email:user.email
}));

});


// ========================
// LOGOUT
// ========================

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click", async ()=>{

await signOut(auth);

localStorage.removeItem("fp_user");

window.location.href="../login/login.html";

});

}

// FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
updateProfile,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// CONFIG
const firebaseConfig = {
apiKey: "AIzaSyD0e-w-clS29jxcGT1wL5HC8i-8nZJXV7o",
authDomain: "focoprime-a2913.firebaseapp.com",
projectId: "focoprime-a2913",
appId: "1:163306607632:web:bdb097981bef1c7c72e695"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ========================
// SE USUÁRIO JÁ LOGADO
// ========================

onAuthStateChanged(auth,(user)=>{

if(user){

localStorage.setItem("fp_user", JSON.stringify({
name:user.displayName,
email:user.email
}));

window.location.href="../focoprime/focoprime.html";

}

});


// ========================
// LOGIN EMAIL
// ========================

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email = loginForm.querySelector('input[type="email"]').value;
const password = document.getElementById("loginPassword").value;

try{

await signInWithEmailAndPassword(auth,email,password);

}catch(err){

alert(err.message);

}

});

}


// ========================
// REGISTRO
// ========================

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const name = registerForm.querySelector('input[type="text"]').value;
const email = registerForm.querySelector('input[type="email"]').value;
const password = document.getElementById("registerPassword").value;

try{

const userCredential = await createUserWithEmailAndPassword(auth,email,password);

await updateProfile(userCredential.user,{
displayName:name
});

alert("Conta criada com sucesso!");

}catch(err){

alert(err.message);

}

});

}


// ========================
// GOOGLE LOGIN
// ========================

const googleBtns = document.querySelectorAll(".social-btn");

googleBtns.forEach(btn=>{

if(btn.textContent.includes("Google")){

btn.addEventListener("click", async ()=>{

const provider = new GoogleAuthProvider();

try{

await signInWithPopup(auth,provider);

}catch(err){

alert(err.message);

}

});

}

});
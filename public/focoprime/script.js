// ==========================
// APP LOADER
// ==========================

const loader = document.getElementById("appLoader")
const loaderProgress = document.getElementById("loaderProgress")

let progress = 0

const fakeLoad = setInterval(()=>{

progress += Math.random() * 20

if(progress >= 90){
progress = 90
}

loaderProgress.style.width = progress + "%"

},200)

function finishLoading(){

clearInterval(fakeLoad)

loaderProgress.style.width = "100%"

setTimeout(()=>{

loader.style.opacity = "0"

setTimeout(()=>{
loader.style.display = "none"
},400)

},400)

}

import { auth, db } from "./auth/firebase-user.js"

import {
collection,
addDoc,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const menuBtn = document.getElementById("menuBtn")
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("menuOverlay")

function openMenu(){

sidebar.classList.add("active")
overlay.classList.add("active")

}

function closeMenu(){

sidebar.classList.remove("active")
overlay.classList.remove("active")

}

menuBtn.addEventListener("click",()=>{

if(sidebar.classList.contains("active")){
closeMenu()
}else{
openMenu()
}

})

overlay.addEventListener("click",closeMenu)

// ==========================
// THEME SYSTEM
// ==========================

const themeBtn = document.getElementById("themeToggle")
const html = document.documentElement

function setTheme(theme){

if(theme === "dark"){

html.setAttribute("data-theme","dark")
themeBtn.classList.replace("ri-moon-line","ri-sun-line")

}else{

html.removeAttribute("data-theme")
themeBtn.classList.replace("ri-sun-line","ri-moon-line")

}

localStorage.setItem("theme",theme)

}

// carregar tema salvo
const savedTheme = localStorage.getItem("theme")

if(savedTheme){

setTheme(savedTheme)

}else{

// detectar sistema
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
setTheme(systemDark ? "dark" : "light")

}

// botão troca tema
themeBtn.addEventListener("click",()=>{

const current = html.getAttribute("data-theme") === "dark" ? "dark" : "light"

setTheme(current === "dark" ? "light" : "dark")

})

// ==========================
// SYSTEM THEME CHANGE
// ==========================

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", e => {

if(!localStorage.getItem("theme")){

setTheme(e.matches ? "dark" : "light")

}

})

// ==========================
// MOBILE SWIPE MENU
// ==========================

let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart",(e)=>{

touchStartX = e.changedTouches[0].screenX

})

document.addEventListener("touchend",(e)=>{

touchEndX = e.changedTouches[0].screenX
handleSwipe()

})

function handleSwipe(){

// swipe direita abre menu
if(touchEndX - touchStartX > 70){

openMenu()

}

// swipe esquerda fecha menu
if(touchStartX - touchEndX > 70){

closeMenu()

}

}

// THEME MODERNO COM IMAGEMS
const toggle = document.getElementById("themeToggle");
const body = document.body;
const logo = document.getElementById("themeLogo");

toggle.addEventListener("click", () => {

body.classList.toggle("dark");

if(body.getAttribute("data-theme") === "dark"){

body.removeAttribute("data-theme");

changeLogo("light");

}else{

body.setAttribute("data-theme","dark");

changeLogo("dark");

}

});

function changeLogo(theme){

logo.classList.add("logo-switch");

setTimeout(()=>{

if(theme === "dark"){
logo.src = "../images/groq.png";
}else{
logo.src = "../images/black.png";
}

logo.classList.remove("logo-switch");

},200);

}

// ==========================
// USER DATA
// ==========================

const userData = JSON.parse(localStorage.getItem("fp_user"));

if(userData){

// SIDEBAR
const account = document.querySelector(".account span");
const avatar = document.querySelector(".avatar");

account.textContent = userData.email;
avatar.textContent = userData.name
? userData.name.charAt(0).toUpperCase()
: userData.email.charAt(0).toUpperCase();


// BARRA DE DADOS
document.getElementById("userName").textContent =
userData.name || "User";

document.getElementById("userEmail").textContent =
userData.email;

document.getElementById("userAvatar").textContent =
userData.name
? userData.name.charAt(0).toUpperCase()
: userData.email.charAt(0).toUpperCase();

}

// FUNÇÃO PARA ABRIR GRIDS
function openTool(tool){

switch(tool){

case "chat":
window.location.href = "tools/chat.html"
break

case "image":
window.location.href = "tools/image.html"
break

case "writer":
window.location.href = "tools/writer.html"
break

case "bot":
window.location.href = "tools/botbuilder.html"
break

}

}


// ==========================
// USER DATA
// ==========================



// ==========================
// COINS SYSTEM
// ==========================

let coins = localStorage.getItem("fp_coins");

if(!coins){

coins = 30;
localStorage.setItem("fp_coins",30);

}

document.getElementById("userCoins").textContent = coins;

// barra de start building 
const startBtn = document.querySelector(".start-btn")
const centerCard = document.querySelector(".center-card")
const buildPanel = document.getElementById("buildPanel")

startBtn.addEventListener("click", () => {
    centerCard.style.opacity = "0"
    centerCard.style.transform = "translateY(-20px)"

    setTimeout(() => {
        centerCard.style.display = "none"
        // Antes de adicionar a classe, define display
        buildPanel.style.display = "flex"
        // Força reflow para que a animação funcione
        void buildPanel.offsetWidth
        buildPanel.classList.add("active")
    }, 300)
})

function createAI(){

window.location.href = "builder/create-ai.html"

}

// ==========================
// PROMPT SYSTEM
// ==========================

const promptsArea = document.getElementById("promptsArea")
const promptsGrid = document.getElementById("promptsGrid")

let prompts = JSON.parse(localStorage.getItem("fp_prompts")) || []

async function loadPrompts(){

const user = auth.currentUser

if(!user){
finishLoading()
return
}

promptsGrid.innerHTML=""

const snapshot = await getDocs(
collection(db,"users",user.uid,"prompts")
)

if(snapshot.empty){

// NÃO TEM PROMPTS
centerCard.style.display="flex"
buildPanel.style.display="none"
promptsArea.style.display="none"

finishLoading()
return
}

// TEM PROMPTS
promptsArea.style.display="block"
centerCard.style.display="none"
buildPanel.style.display="none"

snapshot.forEach(docSnap=>{

const prompt = docSnap.data()
const id = docSnap.id

const card = document.createElement("div")
card.className="prompt-card"

card.innerHTML=`

<div class="prompt-title">${prompt.title}</div>

<div class="prompt-status">
<i class="ri-checkbox-circle-line"></i>
Ready
</div>

<div class="prompt-actions">

<button class="prompt-btn"
onclick="openPublic('${prompt.slug}')">

<i class="ri-share-line"></i>
Open

</button>

<button class="prompt-btn" onclick="editPrompt('${id}','${prompt.task}')">
<i class="ri-edit-line"></i> Customize
</button>

<button class="prompt-btn" onclick="runPrompt(\`${prompt.task}\`)">
<i class="ri-play-line"></i> Run
</button>

</div>

`

promptsGrid.appendChild(card)

})
finishLoading()

}

// ==========================
// CREATE PROMPT
// ==========================

async function openPromptBuilder(){

const user = auth.currentUser

if(!user){
alert("Login required")
return
}

const title = prompt("Prompt name?")
if(!title) return

const task = prompt("What should AI do?")
if(!task) return

const slug = title
.toLowerCase()
.replace(/\s+/g,"-")
.replace(/[^a-z0-9-]/g,"")

await addDoc(
collection(db,"users",user.uid,"prompts"),
{
title:title,
task:task,
slug:slug,
created:Date.now()
}
)

loadPrompts()

}

// ==========================
// COPY PROMPT
// ==========================

function copyPrompt(text){

navigator.clipboard.writeText(text)

alert("Prompt copied!")

}

// ==========================
// EDIT PROMPT
// ==========================

async function editPrompt(id,oldTask){

const user = auth.currentUser

const newTask = prompt("Edit prompt:",oldTask)

if(!newTask) return

await updateDoc(
doc(db,"users",user.uid,"prompts",id),
{
task:newTask
}
)

loadPrompts()

}

// ==========================
// INIT
// ==========================

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

onAuthStateChanged(auth,(user)=>{

if(user){
loadPrompts()
}

})


window.openPromptBuilder = openPromptBuilder
window.copyPrompt = copyPrompt
window.editPrompt = editPrompt

async function runPrompt(text){

const response = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
prompt:text
})
})

const data = await response.json()

console.log("Groq response:",data)

if(data.error){
alert("Error: "+data.error)
return
}

const result = data?.choices?.[0]?.message?.content

alert(result || "No response from AI")

}

window.runPrompt = runPrompt

function openPublic(slug){

window.open(`/focoprime/p/?slug=${slug}`,"_blank")

}

window.openPublic = openPublic



// ELEMENTOS
const searchInput = document.querySelector(".search-box input");
const aiResponse = document.getElementById("aiResponse");
const aiText = document.getElementById("aiText");

// FUNÇÃO PARA ENVIAR PROMPT
async function sendPrompt(prompt) {
  if(!prompt) return;

  // Mostrar animação inicial
  aiText.textContent = "AI is typing...";
  aiResponse.classList.add("show");

  try {
    // Chamada à sua API (você pode apontar para /api/chat)
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "Sem resposta da IA.";

    // Simular digitação animada
    aiText.textContent = "";
    let i = 0;
    const typeWriter = setInterval(() => {
      if(i < reply.length){
        aiText.textContent += reply.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, 25);

  } catch (err) {
    aiText.textContent = "Erro na IA: " + err.message;
  }
}

// EVENTO: ENTER na barra de pesquisa
searchInput.addEventListener("keypress", e => {
  if(e.key === "Enter") {
    sendPrompt(searchInput.value);
    searchInput.value = "";
  }
});

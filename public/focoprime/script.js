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

startBtn.addEventListener("click",()=>{

centerCard.style.opacity = "0"
centerCard.style.transform = "translateY(-20px)"

setTimeout(()=>{

centerCard.style.display = "none"
buildPanel.classList.add("active")

},300)

})

function createAI(){

window.location.href = "builder/create-ai.html"

}

function createPrompt(){

window.location.href = "builder/create-prompt.html"

}
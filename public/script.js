// animação simples nos botões

document.querySelectorAll("button").forEach(btn => {

btn.addEventListener("mouseenter",()=>{
btn.style.opacity="0.8";
})

btn.addEventListener("mouseleave",()=>{
btn.style.opacity="1";
})

})

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav-links");
const icon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {

nav.classList.toggle("active");

if(nav.classList.contains("active")){
icon.classList.remove("ri-menu-line");
icon.classList.add("ri-close-line");
}else{
icon.classList.remove("ri-close-line");
icon.classList.add("ri-menu-line");
}

});


// PRICING PLANS
const billingToggle = document.getElementById("toggleBilling")
const monthlyBtn = document.getElementById("monthlyBtn")
const yearlyBtn = document.getElementById("yearlyBtn")

const monthlyPrices = document.querySelectorAll(".monthly")
const yearlyPrices = document.querySelectorAll(".yearly")

billingToggle.onclick = () => {

billingToggle.classList.toggle("active")

const yearlyActive = billingToggle.classList.contains("active")

monthlyPrices.forEach(el=>{
el.style.display = yearlyActive ? "none" : "inline"
})

yearlyPrices.forEach(el=>{
el.style.display = yearlyActive ? "inline" : "none"
})

monthlyBtn.classList.toggle("active", !yearlyActive)
yearlyBtn.classList.toggle("active", yearlyActive)

}

/* ===============================
   FOCO PRIME AI BACKGROUND
================================ */

const canvas = document.getElementById("aiCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let particleCount = 80;

if(window.innerWidth < 768){
particleCount = 35;
}

function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = document.querySelector(".mav").offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* PARTICLE */

class Particle{

constructor(){
this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;

this.vx = (Math.random()-0.5)*0.5;
this.vy = (Math.random()-0.5)*0.5;

this.size = Math.random()*2 + 1;
}

move(){

this.x += this.vx;
this.y += this.vy;

if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
if(this.y < 0 || this.y > canvas.height) this.vy *= -1;

}

draw(){

ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fillStyle = "#2b6cff";
ctx.fill();

}

}

/* CRIAR PARTICULAS */

for(let i=0;i<particleCount;i++){
particles.push(new Particle());
}

/* LINHAS */

function connectParticles(){

for(let a=0;a<particles.length;a++){

for(let b=a;b<particles.length;b++){

let dx = particles[a].x - particles[b].x;
let dy = particles[a].y - particles[b].y;

let distance = dx*dx + dy*dy;

if(distance < 40000){

ctx.beginPath();
ctx.strokeStyle="rgba(43,108,255,0.15)";
ctx.lineWidth=1;

ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);

ctx.stroke();

}

}

}

}

/* ANIMAÇÃO */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.move();
p.draw();
});

connectParticles();

requestAnimationFrame(animate);

}

animate();

/* INTERAÇÃO COM MOUSE */

let mouse = {
x:null,
y:null
};

window.addEventListener("mousemove",(e)=>{

mouse.x = e.x;
mouse.y = e.y;

particles.forEach(p=>{

let dx = p.x - mouse.x;
let dy = p.y - mouse.y;

let dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 100){
p.vx += dx*0.0005;
p.vy += dy*0.0005;
}

});

});

const aiBtn = document.getElementById("aiButton");
aiBtn.addEventListener("click", () => {
  // Abre modal ou página AI
  window.open("ai/chat.html", "_blank"); // ou ajusta para a tua lógica
});

/* =========================
   CODE EXAMPLES developers
========================= */

const codeExamples = {

js: `import FocoPrime from "focoprime";

const ai = new FocoPrime({
  apiKey: "YOUR_API_KEY"
});

const response = await ai.chat({
  model: "focoprime-ai",
  message: "Explain how AI works"
});

console.log(response);`,

python: `from focoprime import FocoPrime

client = FocoPrime(api_key="YOUR_API_KEY")

response = client.chat(
    model="focoprime-ai",
    message="Explain how AI works"
)

print(response)`,

curl: `curl https://api.focoprime.ai/chat \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
 "model":"focoprime-ai",
 "message":"Explain how AI works"
}'`

}

const codeBlock = document.getElementById("codeBlock")
const tabs = document.querySelectorAll(".tab")
const copyBtn = document.querySelector(".copy-btn")

let currentCode = codeExamples.js

/* DIGIT EFFECT */

function typeCode(text){

codeBlock.textContent = ""

let i = 0

const interval = setInterval(()=>{

codeBlock.textContent += text[i]

i++

if(i >= text.length) clearInterval(interval)

},10)

}

/* iniciar */

typeCode(currentCode)

/* tabs */

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"))

tab.classList.add("active")

const lang = tab.dataset.code

currentCode = codeExamples[lang]

typeCode(currentCode)

})

})

/* copy */

copyBtn.addEventListener("click",()=>{

navigator.clipboard.writeText(currentCode)

copyBtn.innerHTML = '<i class="ri-check-line"></i> Copied'

setTimeout(()=>{

copyBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copy'

},2000)

})



/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

const windowHeight = window.innerHeight;

reveals.forEach(section => {

const sectionTop = section.getBoundingClientRect().top;

const revealPoint = 120;

if(sectionTop < windowHeight - revealPoint){
section.classList.add("active");
}

});

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================
   CURSOR AI GLOW
========================= */

const glow = document.getElementById("cursorGlow");

window.addEventListener("mousemove",(e)=>{

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";

});


/* =========================
   HERO AI TYPING EFFECT
========================= */

const heroTitle = document.getElementById("heroTitle");

const heroText = "Creating safe Artificial Intelligence";

let heroIndex = 0;

function typeHero(){

if(heroIndex < heroText.length){

heroTitle.textContent += heroText.charAt(heroIndex);

heroIndex++;

setTimeout(typeHero,40);

}

}

typeHero();



// =========================
// Navbar Glass on Scroll
// =========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// REDIMENSIONAMENTO PARA LOGIN
// REDIRECIONAR PARA LOGIN

function openLogin(){

document.body.classList.add("page-leave");

setTimeout(()=>{

window.location.href = "login/login.html";

},400);

}

// botão do topo
const getStartedBtn = document.querySelector(".get-started");
if(getStartedBtn){
  getStartedBtn.addEventListener("click", openLogin);
}

// botão do menu mobile
const mobileGetStarted = document.querySelector(".mobile-get-started");
if(mobileGetStarted){
  mobileGetStarted.addEventListener("click", openLogin);
}

// botão do footer
const footerGetStarted = document.querySelector(".cta-btn");
if(footerGetStarted){
  footerGetStarted.addEventListener("click", openLogin);
}

// 1 M DE USUÁRIOS BARRA */
const counter = document.querySelector(".trust-number");

const updateCounter = () => {

const target = +counter.getAttribute("data-target");
let count = +counter.innerText;

const increment = target / 120;

if(count < target){

count += increment;

counter.innerText = Math.floor(count).toLocaleString();

setTimeout(updateCounter,20);

}else{

counter.innerText = "1M+";

}

};

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

updateCounter();
observer.disconnect();

}

});

});

observer.observe(counter);

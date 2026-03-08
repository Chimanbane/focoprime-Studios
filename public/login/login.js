(function() {
'use strict';

/* ========================================
   Theme Toggle
======================================== */
function initThemeToggle() {

const themeToggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggleBtn) {

themeToggleBtn.addEventListener('click', function() {

const currentTheme = html.getAttribute('data-theme');

const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

html.setAttribute('data-theme', newTheme);

localStorage.setItem('theme', newTheme);

});

}

}

/* ========================================
   Checkbox Toggle
======================================== */
function initCheckboxes() {

document.querySelectorAll('.checkbox-wrapper').forEach(function(wrapper){

wrapper.addEventListener('click', function(){

const checkbox = wrapper.querySelector('.checkbox');

if (checkbox){

checkbox.classList.toggle('checked');

}

});

});

}

/* ========================================
   Password Toggle
======================================== */
function initPasswordToggle(){

document.querySelectorAll('.password-toggle').forEach(function(btn){

btn.addEventListener('click', function(){

const targetId = btn.dataset.target;

const input = document.getElementById(targetId);

if(input){

input.type = input.type === 'password' ? 'text' : 'password';

}

});

});

}

/* ========================================
   Password Strength
======================================== */
function initPasswordStrength(){

const passwordInput = document.getElementById('registerPassword');

const strengthBars = document.querySelectorAll('.strength-bar');

if(passwordInput && strengthBars.length){

passwordInput.addEventListener('input', function(){

const password = passwordInput.value;

let strength = 0;

if(password.length >= 8) strength++;

if(/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;

if(/\d/.test(password)) strength++;

if(/[^a-zA-Z0-9]/.test(password)) strength++;

strengthBars.forEach(function(bar,index){

bar.classList.remove('weak','medium','strong');

if(index < strength){

if(strength <= 1) bar.classList.add('weak');

else if(strength <= 2) bar.classList.add('medium');

else bar.classList.add('strong');

}

});

});

}

}

/* ========================================
   Auth Tabs
======================================== */
function initAuthTabs(){

const authTabs = document.querySelectorAll('.auth-tab');

const loginForm = document.getElementById('loginForm');

const registerForm = document.getElementById('registerForm');

const formHeader = document.querySelector('.form-header');

authTabs.forEach(function(tab){

tab.addEventListener('click', function(){

authTabs.forEach(function(t){

t.classList.remove('active');

});

tab.classList.add('active');

if(tab.dataset.form === 'login'){

loginForm.classList.add('active');

registerForm.classList.remove('active');

formHeader.querySelector('h1').textContent = 'Welcome Back';

formHeader.querySelector('p').textContent = 'Enter your credentials to access your account';

}

else{

registerForm.classList.add('active');

loginForm.classList.remove('active');

formHeader.querySelector('h1').textContent = 'Create Account';

formHeader.querySelector('p').textContent = 'Start your crypto journey today';

}

});

});

const switchToRegister = document.getElementById('switchToRegister');

if(switchToRegister){

switchToRegister.addEventListener('click', function(e){

e.preventDefault();

authTabs[1].click();

});

}

}

/* ========================================
   INIT
======================================== */
function init(){

initThemeToggle();

initCheckboxes();

initPasswordToggle();

initPasswordStrength();

initAuthTabs();

}

if(document.readyState === 'loading'){

document.addEventListener('DOMContentLoaded', init);

}else{

init();

}

})();

// PARTICULAS 
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particles = [];

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.6,
vy:(Math.random()-0.5)*0.6
});
}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width) p.vx*=-1;
if(p.y<0||p.y>canvas.height) p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,2,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,0.8)";
ctx.fill();

});

for(let a=0;a<particles.length;a++){
for(let b=a;b<particles.length;b++){

let dx=particles[a].x-particles[b].x;
let dy=particles[a].y-particles[b].y;
let dist=Math.sqrt(dx*dx+dy*dy);

if(dist<120){

ctx.beginPath();
ctx.moveTo(particles[a].x,particles[a].y);
ctx.lineTo(particles[b].x,particles[b].y);
ctx.strokeStyle="rgba(255,255,255,0.08)";
ctx.stroke();

}

}
}

requestAnimationFrame(draw);
}

draw();
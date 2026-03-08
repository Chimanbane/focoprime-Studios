/* =========================
   FOOTER PARTICLES
========================= */

const footerCanvas = document.getElementById("footerCanvas");
const footerCtx = footerCanvas.getContext("2d");

let footerParticles = [];

function resizeFooterCanvas(){
footerCanvas.width = footerCanvas.offsetWidth;
footerCanvas.height = footerCanvas.offsetHeight;
}

resizeFooterCanvas();
window.addEventListener("resize", resizeFooterCanvas);

class FooterParticle{

constructor(){
this.x = Math.random()*footerCanvas.width;
this.y = Math.random()*footerCanvas.height;

this.vx = (Math.random()-0.5)*0.3;
this.vy = (Math.random()-0.5)*0.3;

this.size = Math.random()*2;
}

move(){

this.x += this.vx;
this.y += this.vy;

if(this.x < 0 || this.x > footerCanvas.width) this.vx *= -1;
if(this.y < 0 || this.y > footerCanvas.height) this.vy *= -1;

}

draw(){

footerCtx.beginPath();
footerCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
footerCtx.fillStyle = "#2b6cff";
footerCtx.fill();

}

}

for(let i=0;i<40;i++){
footerParticles.push(new FooterParticle());
}

function connectFooter(){

for(let a=0;a<footerParticles.length;a++){

for(let b=a;b<footerParticles.length;b++){

let dx = footerParticles[a].x - footerParticles[b].x;
let dy = footerParticles[a].y - footerParticles[b].y;

let dist = dx*dx + dy*dy;

if(dist < 8000){

footerCtx.beginPath();
footerCtx.strokeStyle="rgba(43,108,255,0.15)";
footerCtx.moveTo(footerParticles[a].x,footerParticles[a].y);
footerCtx.lineTo(footerParticles[b].x,footerParticles[b].y);
footerCtx.stroke();

}

}

}

}

function animateFooter(){

footerCtx.clearRect(0,0,footerCanvas.width,footerCanvas.height);

footerParticles.forEach(p=>{
p.move();
p.draw();
});

connectFooter();

requestAnimationFrame(animateFooter);

}

animateFooter();

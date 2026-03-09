// pegar slug da URL
const slug = window.location.pathname.split("/").pop();

// carregar IA do localStorage
const aiData = JSON.parse(localStorage.getItem("fp_ai_" + slug));

const chatBox = document.getElementById("chatBox");
const userMessage = document.getElementById("userMessage");
const sendBtn = document.getElementById("sendBtn");
const aiTitle = document.getElementById("aiTitle");

if(!aiData){
  alert("IA não encontrada!");
  window.location.href = "../focoprime.html";
}

aiTitle.textContent = aiData.name;

// função adicionar mensagem
function addMessage(text, sender){
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// enviar para Groq API
async function sendMessage(){
  const msg = userMessage.value.trim();
  if(!msg) return;

  addMessage(msg, "user");
  userMessage.value = "";

  addMessage("Typing...", "ai");

  // API key da Groq
  const API_KEY = "SUA_API_KEY_AQUI"; // ⚠️ substituir pela sua

  try {
    const response = await fetch("https://api.groq.com/v1/completions", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+API_KEY
      },
      body: JSON.stringify({
        model: aiData.model,
        messages:[
          {role:"system", content:aiData.prompt},
          {role:"user", content:msg}
        ],
        temperature: parseFloat(aiData.temp)
      })
    });

    const data = await response.json();
    // remover typing
    const typingMsg = chatBox.querySelector(".message.ai:last-child");
    typingMsg.remove();

    const aiReply = data.choices[0].message.content || "No response";
    addMessage(aiReply, "ai");

  } catch(err){
    console.error(err);
    addMessage("Erro na API", "ai");
  }
}

sendBtn.addEventListener("click", sendMessage);
userMessage.addEventListener("keypress", e=>{
  if(e.key==="Enter" && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

const slug = window.location.pathname.split("/").pop();

async function loadAI() {
  try {
    const res = await fetch(`/api/get-ai?slug=${slug}`);
    if (!res.ok) throw new Error("AI not found");
    const aiData = await res.json();

    document.getElementById("aiTitle").textContent = aiData.name;

    // restante do código para chat com a API Groq
    window.aiData = aiData;

  } catch (err) {
    alert("AI não encontrada!");
    window.location.href = "../focoprime.html";
  }
}

loadAI();


const chatBox = document.getElementById("chatBox");
const userMessage = document.getElementById("userMessage");
const sendBtn = document.getElementById("sendBtn");
const aiTitle = document.getElementById("aiTitle");

// pegar slug
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (!slug) {
  alert("IA não encontrada!");
  window.location.href = "../focoprime.html";
}

// carregar IA
async function loadAI() {
  try {
    const res = await fetch(`/api/get-ai?slug=${slug}`);
    if (!res.ok) throw new Error("AI not found");
    const aiData = await res.json();
    window.aiData = aiData;
    aiTitle.textContent = aiData.name;
  } catch (err) {
    console.error(err);
    alert("IA não encontrada!");
    window.location.href = "../focoprime.html";
  }
}

// enviar mensagem
async function sendMessage() {
  const msg = userMessage.value.trim();
  if (!msg) return;

  const API_KEY = "SUA_API_KEY_AQUI"; // ⚠️ não deixar público em produção

  addMessage(msg, "user");
  userMessage.value = "";
  addMessage("Typing...", "ai");

  try {
    const response = await fetch("https://api.groq.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: window.aiData.model,
        messages: [
          { role: "system", content: window.aiData.prompt },
          { role: "user", content: msg }
        ],
        temperature: parseFloat(window.aiData.temp)
      })
    });

    const data = await response.json();
    const typingMsg = chatBox.querySelector(".message.ai:last-child");
    if (typingMsg) typingMsg.remove();

    const aiReply = data.choices[0]?.message?.content || "No response";
    addMessage(aiReply, "ai");

  } catch (err) {
    console.error(err);
    addMessage("Erro na API", "ai");
  }
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userMessage.addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

loadAI();

const historyList = document.getElementById("historyList");
const histories = JSON.parse(localStorage.getItem("chat_histories")) || [];

if (!histories.length) {
  historyList.innerHTML = "<p style='opacity:.6'>Nenhuma conversa guardada.</p>";
}

histories.forEach(chat => {
  const card = document.createElement("div");
  card.className = "history-card";

  const date = new Date(chat.date).toLocaleString("pt-PT");

  card.innerHTML = `
    <div class="history-info">
      <div class="history-title">${chat.title}</div>
      <div class="history-date">${date}</div>
    </div>
    <span class="material-symbols-rounded history-icon">chat</span>
  `;

  card.addEventListener("click", () => {
    alert("Abrir conversa em breve 😉");
    // aqui no futuro podes abrir a conversa completa
  });

  historyList.appendChild(card);
});

card.addEventListener("click", () => {
  localStorage.setItem("active_chat_id", chat.id);
  location.href = "../index.html";
});

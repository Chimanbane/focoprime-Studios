/* ===============================
   🔥 FIREBASE CONFIG
================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKwBNz6CkVP_FpUP9hxMsjj8J8NNbMk3M",
  authDomain: "focoprime-ai.firebaseapp.com",
  projectId: "focoprime-ai"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* ===============================
   📌 ELEMENTOS DOM
================================= */
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleLoginBtn");

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailLoginBtn = document.getElementById("emailLoginBtn");
const emailRegisterBtn = document.getElementById("emailRegisterBtn");

const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const photoInput = document.getElementById("photoInput");

const logoutBtn = document.getElementById("logoutBtn");
const logoutReal = document.getElementById("logoutReal");
const sideLogoutBtn = document.getElementById("sideLogoutBtn");

const userPanel = document.getElementById("userPanel");
const overlay = document.getElementById("userPanelOverlay");
const closePanel = document.getElementById("closeUserPanel");

const userEmail = document.getElementById("userEmail");
const userName = document.getElementById("userName");
const saveUserName = document.getElementById("saveUserName");

const heading = document.querySelector(".heading");
const userPhoto = document.getElementById("userPhoto");
const userChipName = document.getElementById("userChipName");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

/* ===============================
   🟢 FUNÇÃO TOAST
================================= */
function showToast(message, type = "success") {
  toastMessage.textContent = message;
  toast.classList.remove("success", "error");
  toast.classList.add(type, "show");

  setTimeout(() => toast.classList.remove("show"), 4000);
}

/* ===============================
   🔐 LOGIN GOOGLE
================================= */
googleBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    userChipName.textContent = user.displayName?.split(" ")[0] || "Usuário";
    userPhoto.src = user.photoURL || "images/carta.png";
  } catch (error) {
    alert("Erro Google: " + error.message);
  }
});

/* ===============================
   📧 LOGIN EMAIL
================================= */
emailLoginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    alert("Erro: " + error.message);
  }
});

/* ===============================
   🔑 RESET PASSWORD
================================= */
forgotPasswordBtn.addEventListener("click", async () => {
  if (!emailInput.value) return showToast("Digite seu email primeiro.", "error");
  try {
    await sendPasswordResetEmail(auth, emailInput.value);
    showToast("Email de redefinição enviado com sucesso!", "success");
  } catch {
    showToast("Erro ao enviar email.", "error");
  }
});

/* ===============================
   📝 REGISTRO
================================= */
emailRegisterBtn.addEventListener("click", async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerEmail.value,
      registerPassword.value
    );

    const user = userCredential.user;

    let photoData = null;
    if (photoInput.files[0]) {
      const reader = new FileReader();
      photoData = await new Promise(resolve => {
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(photoInput.files[0]);
      });
    }

    await updateProfile(user, { displayName: registerName.value });
    if (photoData) localStorage.setItem("userPhoto_" + user.uid, photoData);

    await user.reload();
    const updatedUser = auth.currentUser;

    heading.textContent = "Olá, " + updatedUser.displayName;
    userChipName.textContent = updatedUser.displayName.split(" ")[0];
    userPhoto.src = photoData || "images/carta.png";

    alert("Conta criada com sucesso!");
    localStorage.setItem("user_name", registerName.value);
    updateSystemPrompt(registerName.value);

  } catch (error) {
    alert("Erro: " + error.message);
  }
});

/* ===============================
   👤 CONTROLE DE SESSÃO
================================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginModal.style.display = "none";
    logoutBtn.style.display = "flex";
    loginBtn.style.display = "none";

    heading.textContent = "Olá, " + (user.displayName || "Aluno");
    localStorage.setItem("user_name", user.displayName || "Aluno");
    if (typeof updateSystemPrompt === "function") updateSystemPrompt(user.displayName || "Aluno");

    userEmail.value = user.email;
    userName.value = user.displayName || "";
    userChipName.textContent = user.displayName?.split(" ")[0] || "Usuário";

    const savedPhoto = localStorage.getItem("userPhoto_" + user.uid);
    userPhoto.src = savedPhoto || user.photoURL || "images/carta.png";

  } else {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "flex";
  }
});

/* ===============================
   🧠 ATUALIZAR NOME
================================= */
saveUserName.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await updateProfile(user, { displayName: userName.value });
    heading.textContent = "Olá, " + userName.value;
    userChipName.textContent = userName.value.split(" ")[0];
    alert("Nome atualizado com sucesso!");
  } catch (error) {
    alert("Erro: " + error.message);
  }
});

/* ===============================
/* ===============================
   🚪 LOGOUT TOTAL
================================= */
async function logoutUser() {
  try {
    // 1️⃣ Sair do Firebase
    await signOut(auth);

    // 2️⃣ Limpar todo o localStorage
    localStorage.clear();

    // 3️⃣ Fechar painel de usuário
    closeUserPanel();

    // 4️⃣ Resetar elementos visuais
    heading.textContent = "Olá, Aluno";
    userChipName.textContent = "Usuário";
    userPhoto.src = "images/carta.png";

    // 5️⃣ Mostrar botão login, esconder logout
    loginBtn.style.display = "flex";
    logoutBtn.style.display = "none";

    // 6️⃣ Opcional: reset de menu lateral
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    sideMenu?.classList.remove("active");
    menuOverlay?.classList.remove("active");

  } catch (error) {
    alert("Erro ao sair: " + error.message);
  }
}

// Botões de logout
logoutReal.addEventListener("click", logoutUser);
sideLogoutBtn?.addEventListener("click", logoutUser);

/* ===============================
   📂 PAINEL USUÁRIO
================================= */
logoutBtn.addEventListener("click", () => {
  userPanel.classList.add("open");
  overlay.classList.add("show");
});

function closeUserPanel() {
  userPanel.classList.remove("open");
  overlay.classList.remove("show");
}

closePanel.addEventListener("click", closeUserPanel);
overlay.addEventListener("click", closeUserPanel);

/* ===============================
   🟢 ABRIR LOGIN
================================= */
loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

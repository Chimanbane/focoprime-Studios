import { db } from "../auth/firebase-user.js"
import { collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const url = new URL(window.location.href)
const slug = url.searchParams.get("slug")

const title = document.getElementById("promptTitle")
const input = document.getElementById("promptInput")
const responseBox = document.getElementById("responseBox")

async function loadPrompt(){

const snapshot = await getDocs(collection(db,"users"))

snapshot.forEach(userDoc => {

})

}

async function runPrompt(){

const text = input.value

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

responseBox.textContent =
data?.choices?.[0]?.message?.content || "No response"

}

window.runPrompt = runPrompt

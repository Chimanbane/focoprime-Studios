import { db } from "../auth/firebase-user.js"

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const url = new URL(window.location.href)
const slug = url.searchParams.get("slug")

const title = document.getElementById("promptTitle")
const input = document.getElementById("promptInput")
const responseBox = document.getElementById("responseBox")

let basePrompt = ""

async function loadPrompt(){

const users = await getDocs(collection(db,"users"))

for(const userDoc of users.docs){

const prompts = await getDocs(
collection(db,"users",userDoc.id,"prompts")
)

for(const p of prompts.docs){

const data = p.data()

if(data.slug === slug){

title.textContent = data.title
basePrompt = data.task

return

}

}

}

title.textContent = "Prompt not found"

}

async function runPrompt(){

const userInput = input.value

const fullPrompt = basePrompt + "\n\nUser input:\n" + userInput

responseBox.textContent = "Running AI..."

const response = await fetch("/api/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
prompt:fullPrompt
})

})

const data = await response.json()

const result =
data?.choices?.[0]?.message?.content || "No response"

responseBox.textContent = result

}

function copyResult(){

navigator.clipboard.writeText(responseBox.textContent)

alert("Copied!")

}

function shareTool(){

navigator.clipboard.writeText(window.location.href)

alert("Link copied!")

}

window.runPrompt = runPrompt
window.copyResult = copyResult
window.shareTool = shareTool

loadPrompt()

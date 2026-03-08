const tempSlider = document.getElementById("aiTemp")
const tempValue = document.getElementById("tempValue")

tempSlider.value = 0.5

tempSlider.addEventListener("input",()=>{

tempValue.textContent = tempSlider.value

})

function publishAI(){

const name = document.getElementById("aiName").value
const description = document.getElementById("aiDescription").value
const prompt = document.getElementById("aiPrompt").value
const model = document.getElementById("aiModel").value
const temp = document.getElementById("aiTemp").value

if(!name || !prompt){

alert("Please fill AI name and prompt")
return

}

// criar slug
const slug = name
.toLowerCase()
.replaceAll(" ","-")

// guardar IA
const aiData = {

name,
description,
prompt,
model,
temp,
slug

}

localStorage.setItem("fp_ai_"+slug,JSON.stringify(aiData))

alert("AI created! Link:\n\nfocoprime.fp.site/"+slug)

}








const temp = document.getElementById("aiTemp");
const value = document.getElementById("tempValue");
const aiName = document.getElementById("aiName");
const aiDescription = document.getElementById("aiDescription");
const previewText = document.getElementById("previewText");

temp.addEventListener("input", () => {
  value.innerText = temp.value;
  temp.style.background = `linear-gradient(90deg, var(--color-primary) ${temp.value*100}%, #ddd ${temp.value*100}%)`;
});

aiName.addEventListener("input", updatePreview);
aiDescription.addEventListener("input", updatePreview);

function updatePreview() {
  previewText.innerText = `${aiName.value || "AI Name"} - ${aiDescription.value || "AI Description"}`;
}
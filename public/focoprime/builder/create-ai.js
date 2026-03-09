const tempSlider = document.getElementById("aiTemp")
const tempValue = document.getElementById("tempValue")

tempSlider.value = 0.5

tempSlider.addEventListener("input",()=>{

tempValue.textContent = tempSlider.value

})

async function publishAI() {
  const name = document.getElementById("aiName").value;
  const description = document.getElementById("aiDescription").value;
  const prompt = document.getElementById("aiPrompt").value;
  const model = document.getElementById("aiModel").value;
  const temp = document.getElementById("aiTemp").value;

  if (!name || !prompt) {
    alert("Please fill AI name and prompt");
    return;
  }

  const slug = name.toLowerCase().replaceAll(" ", "-");

  try {
    const res = await fetch("/api/create-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, prompt, model, temp, slug })
    });

    const data = await res.json();

    if (res.ok) {
      alert(`AI created! Link:\n\n${window.location.origin}/ai/${slug}`);
      window.location.href = `/ai/${slug}`;
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to create AI");
  }
}








const tempSlider = document.getElementById("aiTemp");
const tempValue = document.getElementById("tempValue");
const aiName = document.getElementById("aiName");
const aiDescription = document.getElementById("aiDescription");
const aiPrompt = document.getElementById("aiPrompt");
const aiModel = document.getElementById("aiModel");

tempSlider.value = 0.5;
tempValue.textContent = tempSlider.value;

tempSlider.addEventListener("input", () => {
  tempValue.textContent = tempSlider.value;
});

function updatePreview() {
  const previewText = document.getElementById("previewText");
  previewText.textContent = `${aiName.value || "AI Name"} - ${aiDescription.value || "AI Description"}`;
}

aiName.addEventListener("input", updatePreview);
aiDescription.addEventListener("input", updatePreview);

async function publishAI() {
  const name = aiName.value.trim();
  const description = aiDescription.value.trim();
  const prompt = aiPrompt.value.trim();
  const model = aiModel.value;
  const temp = tempSlider.value;

  if (!name || !prompt) {
    alert("Please fill AI name and prompt");
    return;
  }

  try {
    const res = await fetch("/api/save-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, prompt, model, temp })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao salvar");

    alert(`AI criada! Link:\nhttps://focoprime.fp.site/ai.html?slug=${data.slug}`);
  } catch (err) {
    console.error(err);
    alert("Erro ao criar AI");
  }
}

document.querySelector(".publish-btn").addEventListener("click", publishAI);condition ? true : false

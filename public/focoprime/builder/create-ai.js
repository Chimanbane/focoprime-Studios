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

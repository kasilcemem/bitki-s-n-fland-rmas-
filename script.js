let chat = document.getElementById("chat");
let input = document.getElementById("input");

let generator;

// Model yükleniyor (küçük ücretsiz model)
async function loadAI() {
  generator = await window.pipeline(
    "text-generation",
    "Xenova/distilgpt2"
  );
  addMessage("AI hazır! Yazmaya başlayabilirsin.", "ai");
}

loadAI();

function addMessage(text, type) {
  let div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  let text = input.value;
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("Düşünüyor...", "ai");

  let result = await generator(text, {
    max_new_tokens: 60
  });

  // son mesajı sil
  chat.lastChild.remove();

  addMessage(result[0].generated_text, "ai");
}
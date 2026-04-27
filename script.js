let chat = document.getElementById("chat");
let input = document.getElementById("input");

let generator;

function addMessage(text, type) {
  let div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function loadAI() {
  addMessage("AI yükleniyor...", "ai");

  const { pipeline } = window.transformers;

  generator = await pipeline(
    "text-generation",
    "Xenova/distilgpt2"
  );

  addMessage("AI hazır!", "ai");
}

loadAI();

async function sendMessage() {
  let text = input.value;
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("...", "ai");

  try {
    let result = await generator(text, {
      max_new_tokens: 50
    });

    chat.lastChild.remove();
    addMessage(result[0].generated_text, "ai");

  } catch (e) {
    chat.lastChild.remove();
    addMessage("Hata: model çalışmadı", "ai");
    console.log(e);
  }
}
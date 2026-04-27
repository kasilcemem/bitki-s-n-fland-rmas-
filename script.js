let chat = document.getElementById("chat");
let input = document.getElementById("input");

function add(text, type) {
  let div = document.createElement("div");
  div.className = "msg " + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  let text = input.value;
  if (!text) return;

  add(text, "user");
  input.value = "";

  add("AI düşünüyor...", "ai");

  try {
    let res = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: text
        })
      }
    );

    let data = await res.json();

    chat.lastChild.remove();

    let reply =
      data[0]?.generated_text || "Cevap alınamadı";

    add(reply, "ai");

  } catch (e) {
    chat.lastChild.remove();
    add("Hata oluştu", "ai");
  }
}

add("AI hazır 🚀", "ai");
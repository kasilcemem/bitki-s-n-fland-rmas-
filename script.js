const chat = document.getElementById("chat");
const input = document.getElementById("input");

function add(text,type){
let div=document.createElement("div");
div.className="msg "+type;
div.innerText=text;
chat.appendChild(div);
chat.scrollTop=chat.scrollHeight;
}

function aiReply(text){

text=text.toLowerCase();

if(text.includes("merhaba")) return "Merhaba 👋 Sana nasıl yardımcı olabilirim?";
if(text.includes("nasılsın")) return "Gayet iyiyim, görev başındayım 😎";
if(text.includes("adın ne")) return "Ben Kaş AI.";
if(text.includes("saat")) return "Şu an saati cihazından görebilirsin ⏰";
if(text.includes("hava")) return "Canlı hava için internet API gerekir ama bugün güzel olabilir ☀️";
if(text.includes("teşekkür")) return "Rica ederim 🙏";
if(text.includes("kim yaptı")) return "Beni senin için kodlayan ChatGPT yaptı.";

const smart = [
"Bunu biraz daha açabilir misin?",
"İlginç bir konu 👀",
"Bence burada iyi bir fikir var.",
"Bunu farklı açıdan düşünebiliriz.",
"Detay verirsen daha iyi yardımcı olurum.",
"Bu konuda sana destek olabilirim."
];

return smart[Math.floor(Math.random()*smart.length)];
}

function send(){
let text=input.value.trim();
if(!text) return;

add(text,"user");
input.value="";

setTimeout(()=>{
add(aiReply(text),"ai");
},300);
}

add("Kaş AI hazır 🚀", "ai");
const chat=document.getElementById("chat");
const input=document.getElementById("input");

const API_KEY="BURAYA_GROQ_API_KEY";

function add(t,c){
let d=document.createElement("div");
d.className="msg "+c;
d.innerText=t;
chat.appendChild(d);
chat.scrollTop=chat.scrollHeight;
}

add("Kaş AI hazır 🚀","ai");

async function sendMsg(){
let text=input.value.trim();
if(!text)return;

add(text,"user");
input.value="";
add("Düşünüyorum...","ai");

const res=await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+API_KEY
},
body:JSON.stringify({
model:"llama3-8b-8192",
messages:[
{role:"system",content:"Sen güçlü Türkçe yardımcı yapay zekasın."},
{role:"user",content:text}
]
})
});

const data=await res.json();

chat.lastChild.remove();

add(data.choices[0].message.content,"ai");
}
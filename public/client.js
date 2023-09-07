var socket=io();

let name;
do{
    name=prompt("please enter your name:");

}while(!name)


let msgarea=document.querySelector(".msgarea");
let text=document.querySelector("#input");
text.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        if(event.target.value){
        sendMessage(event.target.value);
        text.value="";
        }
    }
})
// msgarea.scrollTop = msgarea.scrollHeight;

function sendmsgbtn(){
    if(text.value){
    sendMessage(text.value);
    
    text.value="";
    }
}
function sendMessage(message){

     msg={
        user:name,
        message:message.trim(),
    }
    appendMessage(msg,"outgoing_msg","msg_out_content")

    //Send to server
    socket.emit("message",msg);
}

function appendMessage(msg,type,content_id){
 
    let maindiv=document.createElement('div');
    let className=type;
    maindiv.classList.add(className);

    let markup=`
    <div id="username">
        <h4>${msg.user}</h4>
    </div>
    <div class="${content_id}">
        <p>${msg.message}</p>
     </div>
    
    `
    maindiv.innerHTML=markup;
    msgarea.appendChild(maindiv);
    scrollToBottom();
}


//Received message

socket.on("message",(msg)=>{
  appendMessage(msg,"incoming_msg","msg_in_content");
  scrollToBottom();
})




function scrollToBottom(){
    msgarea.scrollTop=msgarea.scrollHeight;
}
const workbutton=document.getElementById("workbutton");
const attackbutton=document.getElementById("attackbutton");
const buttle_brame=document.getElementById("buttle-frame")
workbutton.onclick=()=>{
  let maou=buttle_brame.contentWindow.document.getElementById("maou");
  maou.setAttribute('animation-mixer',"clip: work");
}
attackbutton.onclick=()=>{
  let maou=buttle_brame.contentWindow.document.getElementById("maou");
  maou.setAttribute('animation-mixer',"clip: kogeki");
}
document.write("ふぁ");
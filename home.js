const skills_button=document.getElementById("skills-button");
const back_button=document.getElementById("back-button");
const skills=document.getElementById("skill-menue");
const action_buttons=document.getElementById("main-buttons");
const action_icons=document.getElementById("main-icons");
const blender_button=document.getElementById("blender-button");
const about_button=document.getElementById("about-button");
var iframe = document.getElementById('id_ifrem');


let ischanging=false;

let selection_name="about-me";

let select_hierarchy="action";
let sellection_numb=0;

const hierarchys={
  "about-button":[
  ],
  "skills-button" :[
    "blender-button","unity-button","html-button"
  ],
  "works-button":[
  ],
}


document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  switch(keyName){
    case "ArrowUp":
      selectByKey(sellection_numb-1);
      break;
    case "ArrowDown":
      selectByKey(sellection_numb+1);
      break;
    default:
      break;
    }
});

window.onload=()=>{
  console.log(iframe.contentWindow.document);
}

function selectByKey(next_numb){
  switch(select_hierarchy){
    case "action":{
      next_numb=isCanselect(next_numb,action_buttons.childElementCount-1);
      let next_button=action_buttons.children[next_numb].children[0];
      action_hover(next_button);
      return;
    }
    case "skills":{
      //liタグの数なんでちょっと少なめだけど問題なし。+1はback用
      next_numb=isCanselect(next_numb,skills.children[0].childElementCount-1+1);
      let next_button;
      //backじゃなきゃ、ulの中にいるliタグ。backならulと同じ階層にいるinputタグを所得
      if(next_numb===skills.children[0].childElementCount-1+1){
        next_button=skills.children[1];
      }else{
        next_button=skills.children[0].children[next_numb].children[0];  
      }
      skill_hover(next_button);
      return;
    }
  }
}


/***
 * キー入力で変わった数が-とかその階層での要素数を上まってたりとかだと正しい数にして、問題ないならそのまま返す関数。
 * @param {int} Numb 変わった数
 * @param {int} Max その階層での最大の数(要素数)。0始まりのやつ
 * @return {int} 問題有るなら問題ないように直して、問題ないならそのまま
 ***/

function isCanselect(Numb,Max){
  if(Numb<0){
    return Max;
  }
  if(Numb>Max){
    return 0;
  }
  return Numb;
}


let sellect_elem=about_button;

for(let i=0;i<action_buttons.childElementCount;i++){
  let this_button=action_buttons.children[i].children[0];
  this_button.addEventListener("mouseover", {button:this_button,handleEvent:action_hover}, false);
  this_button.addEventListener("click",{next:"action-next",handleEvent:ischangefade},false);
}

function action_hover(this_button) {
  if(ischanging===false){
    if(this.button===undefined){
      this.button=this_button;
    }
    sellect_elem.classList.remove("hover");
    sellect_elem=this.button;
    sellection_numb=action_numb(sellect_elem.id);
    console.log(sellection_numb);
    this.button.classList.add('hover');
  }
}

function action_numb(id){
  for(let i=0;i<Object.keys(hierarchys).length;i++){
    if(Object.keys(hierarchys)[i]===id){
      return i;
    }
  }
  return undefined;
}

for(let i=0;i<skills.children[0].childElementCount;i++){
  let this_button=skills.children[0].children[i].children[0];
  this_button.addEventListener("mouseover",{button:this_button,handleEvent:skill_hover}, false);
  this_button.addEventListener("click",{next:"action",handleEvent:ischangefade},false);
}

let this_button=skills.children[1];
this_button.addEventListener("mouseover",function(){
  sellect_elem.classList.remove("hover");
  this_button.classList.add('hover');

  sellect_elem.parentNode.children[1].classList.remove('fadein');
  sellect_elem.parentNode.children[1].classList.add('fadeout');
  sellect_elem.parentNode.children[1].style.display="none";

  sellect_elem=this_button;
}, false);
this_button.addEventListener("click",{next:"action",handleEvent:ischangefade},false);


function skill_hover(){
  if(ischanging===false){ 
    sellect_elem.classList.remove("hover");
    this.button.classList.add('hover');

    
    sellect_elem.parentNode.children[1].classList.remove('fadein');
    sellect_elem.parentNode.children[1].classList.add('fadeout');
    sellect_elem.parentNode.children[1].style.display="none";
    this.button.parentNode.children[1].classList.add('fadein');
    this.button.parentNode.children[1].classList.remove('fadeout');
    this.button.parentNode.children[1].style.display="block";
    sellect_elem=this.button;
    sellection_numb=skill_numb(sellect_elem.id);
  }
}
function skill_numb(id){
  for(let i=0;i<hierarchys["skills-button"].length;i++){
    if(hierarchys["skills-button"][i]===id){
      return i;
    }
  }
  return undefined;
}

function action_buttons_fadeOut(select_numb){
  for(i=0;i<action_buttons.childElementCount;i++){
    if(i===select_numb){
      action_buttons.children[i].classList.remove('fadein');
      action_buttons.children[i].classList.add('fadeout-select');
    }else{
      action_buttons.children[i].classList.remove('fadein');
      action_buttons.children[i].classList.add('fadeout');
    }
  }
  action_icons.classList.remove("go-right");
  action_icons.classList.add("go-left");
  setTimeout(function(){for(i=0;i<action_buttons.childElementCount;i++){
    action_buttons.style.display="none";
  }},500)
}

function action_buttons_fadeIn(){
  action_buttons.style.display="block";
  for(i=0;i<action_buttons.childElementCount;i++){
    action_buttons.children[i].classList.remove('fadeout');
    action_buttons.children[i].classList.remove('fadeout-select');
    action_buttons.children[i].classList.add('fadein');
  }
  action_icons.classList.remove("go-left");
  action_icons.classList.add("go-right");
  sellection_numb=0;
  select_hierarchy="action"
  sellect_elem=action_buttons.children[0].children[0];
  sellect_elem.classList.add('hover');
}

function skills_fadeIn(){
  skills.style.display="block"
  skills.classList.remove('fadeout');
  skills.classList.add('fadein');

  sellect_elem=skills.children[0].children[0].children[0];
  sellection_numb=0;
  select_hierarchy="skills";
  sellect_elem.parentNode.children[0].classList.add('hover');
  sellect_elem.parentNode.children[1].style.display="block";
}


//TODO... アニメーションからの消えるを実装
/***
 * スキルをフェードアウトさせる関数
 * @param {int} select_numb 選択された番号のスキルを「アニメーション→消える」、-1だと無視(未実装)
 ***/
function skills_fadeOut(select_numb){
  if(select_numb>0){
    skills.children[0].children[select_numb];
  }
  skills.classList.remove('fadein');
  skills.classList.add('fadeout');
  setTimeout(function(){
    skills.style.display="none"
  },500);
}

function ischangefade(){
  if(ischanging===false){
    ischanging=true;
    fadechange(this.next)
  }
}


function fadechange(next_sellects){
  sellect_elem.classList.remove("hover");
  if(sellect_elem.classList.contains("skill-button")){
    sellect_elem.parentNode.children[1].classList.remove('fadein');
    sellect_elem.parentNode.children[1].classList.add('fadeout');
    sellect_elem.parentNode.children[1].style.display="none";
  }
  if(next_sellects==="action-next"){
    if(sellection_numb===0){
      next_sellects="about"
    }
    else if(sellection_numb===1){
      next_sellects="skills"
    }
  }
  console.log();
  switch(select_hierarchy){
    case "skills":
      skills_fadeOut(sellection_numb);
      break;
      case "action":
      action_buttons_fadeOut(sellection_numb);
      break;
    }
  switch(next_sellects){
    case "skills":
      skills_fadeIn();
      break;
    case "action":
      action_buttons_fadeIn();
  }
  setTimeout(function(){
    ischanging=false;
  },500)
}



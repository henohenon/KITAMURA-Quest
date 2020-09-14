const skills_button=document.getElementById("skills-button");
const back_button=document.getElementById("back-button");
const skills=document.getElementById("skill-menue");
const action_buttons=document.getElementById("main-buttons");
const action_icons=document.getElementById("main-icons");
const blender_button=document.getElementById("blender-button");
const about_button=document.getElementById("about-button");
const about_menue=document.getElementById("about-menue");
const works_menue=document.getElementById("works-menue")
var iframe = document.getElementById('id_ifrem');
let tekiHP=1000;
let mikataHP=200;
let mikataMP=100;

const buttle=iframe.contentWindow.document.getElementById("buttle");
console.log(iframe.contentWindow.document);

const skill_param={
    "daiti-attack":{attackpoint:80,isteki:true,animation:"tuti-maho",use_mp:30},
    "heal":{ap:-80,isteki:false,animation:"kaihuku-maho",use_mp:20}
}
//"nomal_attack":70,
  

function sound(soundname)
{
  //console.log(document.getElementById(soundname));
	// [ID:sound-file]の音声ファイルを再生[play()]する
	//document.getElementById(soundname).play();
}



let ischanging=false;

let selection_name="about-me";

let select_hierarchy="action";
let sellection_numb=0;

const hierarchys={
  "about-button":[
    "about-menue"
  ],
  "skills-button" :[
    "blender-button","unity-button","html-button"
  ],
  "works-button":[
    "portfolio-button","game-button","-button"
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
    case " ":
      forward();
      break;
    case "ArrowRight":
      forward();
      break;
    case "ArrowLeft":
        back();
        break;
    case "w":
      selectByKey(sellection_numb-1);
      break;
    case "s":
      selectByKey(sellection_numb+1);
      break;
    default:
      console.log(keyName)
      break;
    }
});

function forward(){
  switch(select_hierarchy){
    case "action":
      fadechange("action-next");
      break;
    case "skills":
      fadechange("action");
      break;
    case "about":
      fadechange("action");
      break;
    case "works":
      fadechange("action");
      break;
  }
}
function back(){
  switch(select_hierarchy){
    case "action":
      break;
    case "skills":
      fadechange("action");
      break;
  }
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


about_menue.children[3].addEventListener("mouseover", {button:about_menue.children[3],handleEvent:action_hover}, false);
about_menue.children[3].addEventListener("click",{next:"action",handleEvent:ischangefade},false);




let sellect_elem=about_button;

for(let i=0;i<action_buttons.childElementCount;i++){
  let this_button=action_buttons.children[i].children[0];
  this_button.addEventListener("mouseover", {button:this_button,handleEvent:action_hover}, false);
  this_button.addEventListener("click",{next:"action-next",handleEvent:ischangefade},false);
}

function action_hover(this_button) {
  if(ischanging===false){
    sound("move")
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
    sound("move"); 
    sellect_elem.classList.remove("hover");
    this.button.classList.add('hover');

    
    sellect_elem.parentNode.children[1].classList.remove('move-down');
    sellect_elem.parentNode.children[1].classList.add('fadeout');
    sellect_elem.parentNode.children[1].style.display="none";
    this.button.parentNode.children[1].classList.add('move-down');
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

for(let i=0;i<works_menue.children[0].childElementCount;i++){
  let this_button=works_menue.children[0].children[i].children[0];
  this_button.addEventListener("mouseover",{button:this_button,handleEvent:work_hover}, false);
  this_button.addEventListener("click",{next:"action",handleEvent:ischangefade},false);
}

function work_hover(){
  if(ischanging===false){
    sound("move"); 
    sellect_elem.classList.remove("hover");
    this.button.classList.add('hover');

    
    sellect_elem.parentNode.children[1].classList.remove('fadein');
    sellect_elem.parentNode.children[1].classList.add('fadeout');
    sellect_elem.parentNode.children[1].style.display="none";
    this.button.parentNode.children[1].classList.add('fadein');
    this.button.parentNode.children[1].classList.remove('fadeout');
    this.button.parentNode.children[1].style.display="block";
    sellect_elem=this.button;
    sellection_numb=work_numb(sellect_elem.id);
  }
}
function work_numb(id){
  for(let i=0;i<hierarchys["works-button"].length;i++){
    if(hierarchys["works-button"][i]===id){
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
function works_fadeIn(){
  works_menue.style.display="block"
  works_menue.classList.remove('fadeout');
  works_menue.classList.add('fadein');

  sellect_elem=works_menue.children[0].children[0].children[0];
  sellection_numb=0;
  select_hierarchy="works";
  sellect_elem.parentNode.children[0].classList.add('hover');
  sellect_elem.parentNode.children[1].style.display="block";
}

function abouts_fadeIn(){
  about_menue.style.display="block"
  about_menue.classList.remove('fadeout');
  about_menue.classList.add('fadein');
  console.log("ふぁらみ")

  sellect_elem=about_menue.children[3];
  sellection_numb=0;
  select_hierarchy="about";
  sellect_elem.classList.add('hover');
}
function abouts_fadeOut(){
  about_menue.classList.remove('fadein');
  about_menue.classList.add('fadeout');
  console.log("むるみ")

  setTimeout(function(){
    about_menue.style.display="none"
  },500);
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

function works_fadeOut(select_numb){
  if(select_numb>0){
    works_menue.children[0].children[select_numb];
  }
  works_menue.classList.remove('fadein');
  works_menue.classList.add('fadeout');
  setTimeout(function(){
    works_menue.style.display="none"
  },500);
}



function ischangefade(){
  if(ischanging===false){
    ischanging=true;
    fadechange(this.next)
  }
}


function fadechange(next_sellects){
  sound("select");
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
    else if(sellection_numb===2){
      next_sellects="works"
    }
  }
  console.log(next_sellects);
  if(select_hierarchy==="skills"&&skills.childElementCount>=sellection_numb){
    skill();
  }
  switch(select_hierarchy){
    case "skills":
      skills_fadeOut(sellection_numb);
      break;
    case "works":
      works_fadeOut();
      break;
    case "action":
      action_buttons_fadeOut(sellection_numb);
      break;
    case "about":
      console.log("ふぅむ")
      abouts_fadeOut(sellection_numb);
      break;
    }
  switch(next_sellects){
    case "skills":
      skills_fadeIn();
      break;
    case "works":
      works_fadeIn();
      break;
    case "action":
      action_buttons_fadeIn();
      break;
    case "about":
      console.log("むふぅ")
      abouts_fadeIn();
      break;
  }
  setTimeout(function(){
    ischanging=false;
  },500)
}


function skill(){
  skill_kazu=0;
  skill_kazu+=Object.keys(skill_param).length;
  use_skill=Math.floor(Math.random() * Math.floor(skill_kazu));
  
  buttle.addAttribute('animation-mixer',{clip: skill_param[animation]});
  setTimeout(function(){
    tairyoku_change(use_skill[isteki],use_skill[attackpoint]);
    setTimeout(function(){
    },1000)
  },1000)
}

function tairyoku_change(isteki,ap){
  if(isteki){
    tekiHP-(ap+ Math.floor( Math.random() * 20)-10);
  }else{
    tekiHP-(ap+ Math.floor( Math.random() * 20)-10);
  }
}
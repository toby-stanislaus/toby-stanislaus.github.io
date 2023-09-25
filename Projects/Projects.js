function makeButtons(buttonName){

  const parentButton=WEXbutton=document.getElementById(buttonName);
  addButtonHover(parentButton,'grey');

  let parentButtonsFunctions=setUpParentButtonClick(buttonName,parentButton);

  // child buttons

  let [childButtonsFunctions,children]=setupChildClick([parentButton],buttonName);
  return [[parentButtonsFunctions,childButtonsFunctions],children];
}

function setupChildClick(children,buttonName){
  let buttonsFunctions=[];
  hideChildButtons(buttonIDs[buttonName]);

  buttonIDs[buttonName].forEach(childName => {
    const childButton=document.getElementById(childName);
    hideChildButtonAndReveal(childButton);
    function buttonClick(){
      resetChildButtonSize(buttonName);
      childButton.style.transform='scaleX(1.5) scaleY(1.5)';
      childButton.removeEventListener('mouseleave',buttonHoverOff);
      readFile(`/Projects/Texts/${buttonName}/${childName}.txt`);
    };
    function buttonHoverOver(){
      hoverOverButton(childButton, 'white');
    };
    function buttonHoverOff(){
      hoverOffButton(childButton);
    };


    buttonsFunctions.push([childButton,buttonClick,buttonHoverOver,buttonHoverOff]);
    children.push(childButton);
  })
  return [buttonsFunctions,children];
}
  



function resetChildButtonSize(buttonName){
  buttonIDs[buttonName].forEach(childName => {
    childButton=document.getElementById(childName);
    childButton.style.transform='';
  })
}



function hideChildButtonAndReveal(button){
  button.style.display='none';
  setTimeout(()=>{
    button.style.display='initial';
  },1)
}



function readFile(filePath){
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }).then(data => {
      if (data !== null) {
        writingSpace.innerHTML=data;
        writingSpace.style.height='auto';
      } else {
        console.log('An error occurred while reading the file.');
      }
    })
      .catch(error => {
        console.error('An unexpected error occurred:', error);
      });
  
}



function setUpParentButtonClick(buttonName,parentButton){
  function buttonClick(){
    parentButton=document.getElementById(buttonName);
    amount=findDifference(parentButton);
  
    hideChildren=translateButtons(buttonName,parentButton,amount,hideChildren);
  }

  document.querySelector(`.${buttonName}`).addEventListener('click',buttonClick);
  return [parentButton,buttonClick];
}

function findDifference(parentButton){
  const middleButton=document.getElementById('coding');

  parentMiddle=parentButton.getBoundingClientRect().left+
  (parentButton.getBoundingClientRect().width/2)

  middleMiddle=middleButton.getBoundingClientRect().left+
  (middleButton.getBoundingClientRect().width/2)

  return middleMiddle-parentMiddle;
}


function translateButtons(name,button,amount,hideChildren){
  if (hideChildren){
  
    toggleParentButtons(name,true)
    toggleChildButtons(name,true);

    clearTimeout(wipeAddingHoverID);
    childButtonsTransitions(name,true);
    removeButtonHoverEnlarge(button,false);

    button.style.transform=``;

    wipeParentsID=setTimeout(()=>{
      toggleParentButtons(name,false)
      changeParentButtons('visible');
      addButtonHover(button,'grey');
      writingSpace.innerHTML='';
    },1000);

    writingSpace.style.height='500px';
    writingSpace.innerHTML='';

    return false;
    
  }else{
    toggleParentButtons(name,true)
    clearTimeout(wipeParentsID);
    childButtonsTransitions(name,false);
    removeButtonHoverEnlarge(button,false);

    button.style.transform=
    `translateX(${amount}px) scaleX(1.5) scaleY(1.5)`;

    
    changeParentButtons('hidden');

    
    wipeAddingHoverID=setTimeout(()=>{

      toggleParentButtons(name,false);
      toggleChildButtons(name,false);
      addButtonHover(button,'grey');
    },1000)

    button.style.visibility='visible';
    return true;
  }
}

/*
if (removeHover){
  childButton.onmouseover = '';
  childButton.onmouseout = '';
}else{
  */

function changeParentButtons(state){
  wexButton.style.visibility=state;
  codingButton.style.visibility=state;
  activitiesButton.style.visibility=state;
}




//Toggle buttons usablity
function toggleChildButtons(buttonName,removeClick){
  let [parentButton,childButtons]=buttonsFunctions[buttonName];

  childButtons.forEach((buttonStuffs)=>{
    let [button,buttonClick,buttonHoverOver,buttonHoverOff]=buttonStuffs;
    if (removeClick){
      button.removeEventListener('mouseenter',buttonHoverOver);
      button.removeEventListener('mouseleave',buttonHoverOff);
      button.removeEventListener('click',buttonClick);
    }else{
      button.addEventListener('mouseenter',buttonHoverOver);
      button.addEventListener('mouseleave',buttonHoverOff);
      button.addEventListener('click',buttonClick);
    }
  })
  
}

function toggleParentButtons(buttonName,removeClick){
  let [parentButton,childButtons]=buttonsFunctions[buttonName];
  let [button,buttonFunc]=parentButton;
  if (removeClick){
    button.removeEventListener('click',buttonFunc);
  }else{
    button.addEventListener('click',buttonFunc);
  }
  
}
//---

function removeButtonsListeners(buttons){
  buttons.forEach(button=>{
    button.removeEventListener('click',)
  })
}


function changeButtonTransition(button,amount){
  removeButtonHoverEnlarge(button,true);
  button.style.transition=`transform 1s ease-in-out`;
  button.style.transform=`translate(${amount}px,0px)`;
}


function childButtonsTransitions(name,hideChildren){
  if (hideChildren){
    hideChildButtons(buttonIDs[name])
  }else{
    showChildButtons(buttonIDs[name]);
  }

}

//
function showChildButtons(childButtons){
  childButtons.forEach(childName => {
    let childButton=document.getElementById(childName);
    childButton.style.transform='';
  })
}

function hideChildButtons(childNames){
  childNames.forEach(childName => {
    let childButton=document.getElementById(childName);
    childRight=childButton.getBoundingClientRect().right+1;
    childButton.style.transform=`translateX(${-childRight}px)`;
  })
}


function hoverOverButton(button,colour) { 
  if (button.style.transform==='none'){
    button.style.transform='scaleX(1.5) scaleY(1.5)';
  }
 
  if (!button.style.transform.includes('scaleX(1.5) scaleY(1.5)')){
    button.style.transform+='scaleX(1.5) scaleY(1.5)';
  }

  button.style.backgroundColor= colour;
}


function hoverOffButton(button) {
  if (button.style.transform.includes('scaleX(1.5) scaleY(1.5)') 
  && !hideChildren
  ||button.classList.contains('button-child')){
    button.style.transform=button.style.transform.replace('scaleX(1.5) scaleY(1.5)','')
  }
  button.style.backgroundColor= '';
}


function addButtonHover(button,colour){
  button.onmouseover = () =>hoverOverButton(button,colour);
  button.onmouseout = () => hoverOffButton(button);
}


function removeButtonHoverEnlarge(button,childButton){
  if (childButton){
    button.onmouseover = () => button.style.backgroundColor='white';
    button.onmouseout = () => button.style.backgroundColor='white';
    
  }else{
    button.onmouseover =  () => button.style.backgroundColor='grey';
    button.onmouseout = () => button.style.backgroundColor='white';
  }
}




const text1='Input.txt';
const oldTitle=document.title;
const buttonIDs={'WEX':['wex1','wex2','wex3'],
               'coding':['code1','code2','code3'],
               'activities':['activity1','activity2','activity3']};


let windowInnerWidth=window.innerWidth;
let windowInnerHeight=window.innerHeight;

let hideChildren=false;
let stopShrink=false;

//IDs
let wipeParentsID;
let wipeAddingHoverID;

let childID;
let childIDs=[];

let middleButtonLeft;
let middleButtonWidth;

let buttons;

const writingSpace=document.querySelector('.writing-space');

[codingFunctions,buttons]=makeButtons('coding');
[codingButton,code1,code2,code3]=buttons;

[wexFunctions,buttons]=makeButtons('WEX');
[wexButton,wex1,wex2,wex3]=buttons;

[activitiesFunctions,buttons]=makeButtons('activities');
[activitiesButton,activity1,activity2,activity3]=buttons;

const buttonsFunctions={
  'coding':codingFunctions,
  'WEX':wexFunctions,
  'activities':activitiesFunctions
}




function makeButtons(buttonName){
  const parentButton=WEXbutton=document.getElementById(buttonName);
  addButtonHover(parentButton,'grey');
  middleButtonLeft=document.getElementById('coding').getBoundingClientRect().left;
  middleButtonWidth=document.getElementById('coding').getBoundingClientRect().width;
  setUpParentButton(buttonName,
    middleButtonLeft-parentButton.getBoundingClientRect().left);

  // child buttons
  let children=[parentButton];
  buttonIDs[buttonName].forEach(childName => {
    const childButton=document.getElementById(childName);
    childButton.style.display='none';
    childButton.style.transform=`translateX(-349px)`;
    childButton.addEventListener('click', ()=>{
      readFile(`/Projects/Texts/${buttonName}/${childName}.txt`);
    });
    children.push(childButton);
  });

  return children;
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
        document.querySelector('.writing-space').innerHTML=data;
      } else {
        console.log('An error occurred while reading the file.');
      }
    })
      .catch(error => {
        console.error('An unexpected error occurred:', error);
      });
  
}

//color==rgb(255, 194, 169)

//setting up all buttons
function setUpParentButton(buttonName,amount){
  document.querySelector(`.${buttonName}`).addEventListener('click',()=>{
    textShown=translateButtons(buttonName,amount,
    document.getElementById(buttonName),textShown);
  });
}


function translateButtons(name,amount,button,textShown){
  if (textShown){
    clearTimeout(wipeAddingHoverID);
    childButtonsTransitions(name,true);
    removeButtonHover(button,false);

    button.style.transform=``;

    wipeParentsID=setTimeout(()=>{
      changeParentButtons('visible');
      addButtonHover(button,'grey');
      document.querySelector('.writing-space').innerHTML='';
    },1000);

    document.querySelector('.writing-space').innerHTML='';
    return false;
    
  }else{
    clearTimeout(wipeParentsID);

    childButtonsTransitions(name,false);
    removeButtonHover(button,false);
    button.style.transform=
    `translateX(${amount}px) scaleX(1.5) scaleY(1.5)`;

    changeParentButtons('hidden');


    wipeAddingHoverID=setTimeout(()=>{
      addButtonHover(button,'grey');
    },1000)
    
  
    button.style.visibility='visible';

    return true;
  }
}


function changeParentButtons(state){
  wexButton.style.visibility=state;
  codingButton.style.visibility=state;
  activitiesButton.style.visibility=state;
}


function changeButtonTransition(button,amount){
  removeButtonHover(button,true);
  button.style.transition=`transform 1s ease-in-out`;
  button.style.transform=`translate(${amount}px,0px)`;
}


function childButtonsTransitions(name,hideChildButtons){
  const childButtons=[document.getElementById(buttonIDs[name][0]),
                      document.getElementById(buttonIDs[name][1]),
                      document.getElementById(buttonIDs[name][2])]
  clearTimeout(buttonVisibleID);
  buttonVisibleID=hideShowButtons(childButtons,buttonVisibleID,hideChildButtons);

  moveChildButtons(childButtons,hideChildButtons);
}

//
function hideShowButtons(childButtons,buttonVisibleID,hide){
  if (hide){
    buttonVisibleID=setTimeout(()=>{
      childButtons.forEach(childButton => {
        childButton.style.display='none';
      });
    },1000);
  }else{
    childButtons.forEach(childButton => {
      childButton.style.display='initial';
    });
  }
  return buttonVisibleID;
}


function moveChildButtons(childButtons,hideChildButtons){
  if (hideChildButtons){

    for (let i = childIDs.length - 1; i >= 0; i--) {
      clearTimeout(childIDs[i]);
      childIDs.splice(i, 1); 
    }

    childButtons.forEach(childButton=> {
      changeButtonTransition(childButton,-349);
    });

  }else{
    
    let middle=middleButtonLeft-(middleButtonLeft*0.7)+(middleButtonWidth/2);
    
    setTimeout(()=>{
      childButtons.forEach(childButton => {
        let childMiddle=childButton.getBoundingClientRect().left+
        (childButton.getBoundingClientRect().width/2);

        changeButtonTransition(childButton,middle-349-childMiddle)
        
        childID=setTimeout(()=>{
          addButtonHover(childButton,'white');
        },1000)

        childIDs.push(childID);
        middle+=middleButtonLeft*0.7;
      })
    },1);
    
  }
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


function hoverOffButton() {
  if (this.style.transform.includes('scaleX(1.5) scaleY(1.5)') 
  && !textShown
  ||this.classList.contains('button-child')){
    this.style.transform=this.style.transform.replace('scaleX(1.5) scaleY(1.5)','')
  }
  this.style.backgroundColor= '';
}


function addButtonHover(button,colour){
  button.onmouseover = () =>hoverOverButton(button,colour);
  button.onmouseout = hoverOffButton;
}


function removeButtonHover(button,childButton){
  if (childButton){
    button.onmouseover = () => button.style.backgroundColor='white';
    button.onmouseout = () => button.style.backgroundColor='white';
    
  }else{
    button.onmouseover =  () => button.style.backgroundColor='grey';
    button.onmouseout = () => button.style.backgroundColor='white';
  }
}


function refreshButtons(middleButtonLeft){

}


const text1='Input.txt';
const oldTitle=document.title;
let buttonIDs={'WEX':['wex1','wex2','wex3'],
               'coding':['code1','code2','code3'],
               'activities':['activity1','activity2','activity3']};


let windowInnerWidth=window.innerWidth;
let windowInnerHeight=window.innerHeight;

let textShown=false;

//IDs
let wipeParentsID;
let buttonVisibleID;
let wipeAddingHoverID;

let childID;
let childIDs=[];

let middleButtonLeft;
let middleButtonWidth;

[codingButton,code1,code2,code3]=makeButtons('coding');
[wexButton,wex1,wex2,wex3]=makeButtons('WEX');
[activitiesButton,activity1,activity2,activity3]=makeButtons('activities');



/*
wex1.style.display='initial';
console.log(wex1.getBoundingClientRect().left);
*/
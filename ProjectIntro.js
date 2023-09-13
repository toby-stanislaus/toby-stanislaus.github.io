const text1='Input.txt';
const oldTitle=document.title;

const WEXbutton=document.getElementById('WEX');
  const renishawButton=document.getElementById('renishaw')
  const siemensButton=document.getElementById('siemens');
  const denseAirButton=document.getElementById('dense-air');

const codingbutton=document.getElementById('coding');
  const code1=document.getElementById('code1');
  const code2=document.getElementById('code2');
  const code3=document.getElementById('code3');

const activitiesbutton=document.getElementById('activities');
  const activity1=document.getElementById('activity1');
  const activity2=document.getElementById('activity2');
  const activity3=document.getElementById('activity3');

let windowInnerWidth=window.innerWidth;
let windowInnerHeight=window.innerHeight;
let textShown=false;
let wipeParentsID;
let buttonVisibleID;
let wipeAddingHoverID;

//setting up buttons

//hiding child buttons
renishawButton.style.display='none';
siemensButton.style.display='none';
denseAirButton.style.display='none';

code1.style.display='none';
code2.style.display='none';
code3.style.display='none';

activity1.style.display='none';
activity2.style.display='none';
activity3.style.display='none';


//////
addButtonHover(WEXbutton,'grey')
setUpButtonMove('WEX',windowInnerWidth/3)



renishawButton.addEventListener('click', ()=>{
  read('/Texts/Renishaw.txt')
})

siemensButton.addEventListener('click', ()=>{
  read('/Texts/Siemens.txt')
})

denseAirButton.addEventListener('click', ()=>{
  read('/Texts/Dense-Air.txt')
})


//////
addButtonHover(codingbutton,'grey')
setUpButtonMove('coding',0)






///////
addButtonHover(activitiesbutton,'grey')
setUpButtonMove('activities',-windowInnerWidth/3)





i=0;
intervalID=setInterval(() => {
  if (i<3){
    document.title=oldTitle;
    i+=1;
  }else{
    document.title=`${oldTitle} - By Toby Stanislaus`;
    i=0;
  }
},2000);



function readFiles(filePath) {
  return fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    });
}

function read(filePath){
  
  readFiles(filePath)
    .then(data => {
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


function changeParentButtons(state){
  WEXbutton.style.visibility=state;
  codingbutton.style.visibility=state;
  activitiesbutton.style.visibility=state;
}


function findChildButtons(name){
  if (name==='WEX'){
    return [renishawButton,
    siemensButton,
    denseAirButton];
  }else if (name==='coding'){
    return [code1,
    code2,
    code3];
  }else if (name==='activities'){
    return [activity1,
      activity2,
      activity3];
  }

}


function changeButtonTransition(button,amount){
  removeButtonHover(button,true);

  button.style.transition=`transform 1s ease-in-out`;
  button.style.transform=`translateX(${amount}px)`;
  setTimeout(()=>{
    addButtonHover(button,'white');
  },1000)

}


function hideShowButtons(first,second,third,buttonVisibleID,hide){
  clearTimeout(buttonVisibleID);
  
  if (hide){
    buttonVisibleID=setTimeout(()=>{
      first.style.display='none';
      second.style.display='none';
      third.style.display='none';
    },1000);
  }else{
    first.style.display='initial';
    second.style.display='initial';
    third.style.display='initial';
  }
  return buttonVisibleID;
}


function buttonsTransitions(name,removeButtons){
  let first,second,third;
  [first,second,third]=findChildButtons(name);
  
  buttonVisibleID=hideShowButtons(first,second,third,buttonVisibleID,removeButtons);
  
  if (removeButtons){
    changeButtonTransition(first,-370);
    changeButtonTransition(second,-900);
    changeButtonTransition(third,-1400);
    
  }else{

    first.style.transform='translateX(-370px)';
    second.style.transform='translateX(-900px)';
    third.style.transform='translateX(-1400px)';

    setTimeout(()=>{
      changeButtonTransition(first,0); 
      changeButtonTransition(second,0);
      changeButtonTransition(third,0);
    },1);
  }
}


function translateButtons(name,amount,button,textShown){
  if (textShown){
    clearTimeout(wipeAddingHoverID);
    buttonsTransitions(name,true);
    
    removeButtonHover(button,false);
    button.style.transform=
    ``;

    wipeParentsID=setTimeout(()=>{
      changeParentButtons('visible');
      addButtonHover(button,'grey');
      document.querySelector('.writing-space').innerHTML='';
    },1000);



    document.querySelector('.writing-space').innerHTML='';
    return false;
    
  }else{
    clearTimeout(wipeParentsID);
    buttonsTransitions(name,false);

    removeButtonHover(button,false);
  
    button.style.transform=
    `translate(${amount}px,0px) scaleX(1.5) scaleY(1.5)`;
    changeParentButtons('hidden');


    wipeAddingHoverID=setTimeout(()=>{
      addButtonHover(button,'grey');
    },1000)
    
  
    document.getElementById(name).style.visibility='visible';
    
  
   
    
 
    return true;
  }
}


function changeBackgroundColorGrey(){
  this.style.backgroundColor='grey';
}


function changeBackgroundColorWhite(){
  this.style.backgroundColor='white';
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
  button.onmouseover = ()=>{
    hoverOverButton(button,colour)};

  button.onmouseout = hoverOffButton;
}

function removeButtonHover(button,childButton){
  if (!childButton){
  button.onmouseover = changeBackgroundColorGrey;
  button.onmouseout = changeBackgroundColorWhite;
  }else{
    button.onmouseover = changeBackgroundColorWhite;
    button.onmouseout = changeBackgroundColorWhite;
  }
}


function setUpButtonMove(buttonName,amount){
  document.querySelector(`.${buttonName}`).addEventListener('click',()=>{
    textShown=translateButtons(buttonName,amount,
    document.getElementById(buttonName),textShown);
  });
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
          entry.target.classList.add('show');
      } else {
          entry.target.classList.remove('show');
      }
  });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
  console.log(el);
  observer.observe(el)})



const text1='Input.txt';
const oldTitle=document.title;
const WEXbutton=document.getElementById('WEX');
const codingbutton=document.getElementById('coding');
const activitiesbutton=document.getElementById('activities');
let windowInnerWidth=window.innerWidth;
let windowInnerHeight=window.innerHeight;
let textShown=false;
let wipeParentsID;

WEXbutton.style.transform="scaleX(200px) scaleY(200px)";
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



async function readFiles(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    console.log(data); // This will log the content of the file
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function fetchData(filePath) {
  return fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // This returns a Promise that resolves to the text data
    });
}

function changeParentButtons(state){
  document.getElementById('WEX').style.visibility=state;
  document.getElementById('coding').style.visibility=state;
  document.getElementById('activities').style.visibility=state;
}
/*
function wipeChildButtons(){
  document.getElementById('button-child-WEX').style.visibility='hidden';
  document.getElementById('button-child-coding').style.visibility='hidden';
  document.getElementById('button-child-activities').style.visibility='hidden';
}
*/

function findChildButtons(name){
  if (name==='WEX'){
    return [document.getElementById('renishaw'),
    document.getElementById('siemens'),
    document.getElementById('other')];
  }

}


function changeButtonTransition(button,amount){
  button.style.transition=`2s`;
  button.style.transform=`translateX(${amount}px)`;
}


function buttonsTransitions(name,removeButtons){
  let first,second,third;
  [first,second,third]=findChildButtons(name);

  if (removeButtons){
    console.log('abcdef')
    changeButtonTransition(first,-370);
    changeButtonTransition(second,-900);
    changeButtonTransition(third,-1400);
  }else{
    changeButtonTransition(first,0);
    changeButtonTransition(second,0);
    changeButtonTransition(third,0);
  }
}







function translateButtons(name,amount,button,textShown){
  if (textShown){
    //hide all the child buttons
    buttonsTransitions(name,true);
    
    //wipeChildButtons();
    
    //moving the button back to its original position
    button.style.transform=
    ``;

    //making it so that you can hover and it will still work

    //returning all parent buttons
    wipeParentsID=setTimeout(()=>{
      changeParentButtons('visible');
      //remove again if someone tried to open the text again while in motiont
      document.querySelector('.writing-space').innerHTML='';
    },1500);
    console.log(wipeParentsID);

    //removes the text on the screen
    document.querySelector('.writing-space').innerHTML='';

    //just saying that the child buttons are now hidden (and text)
    return false;
  }else{
    clearTimeout(wipeParentsID);
    //moving the button into the middle
    button.style.transform=
    `translate(${amount}px,0px) scaleX(1.5) scaleY(1.5)`;

    //hiding all the parents buttons
    changeParentButtons('hidden');

    //shows the button that we want to see in the middle
    document.getElementById(name).style.visibility='visible';
    
    //
    buttonsTransitions(name,false);
    

    return true;
  }
}

function setUpButtons(button){
  button.onmouseover = function() {
    if (this.style.transform==='none'){
      this.style.transform='scaleX(1.5) scaleY(1.5)';
    }
    
    if (!this.style.transform.includes('scaleX(1.5) scaleY(1.5)')){
      this.style.transform+='scaleX(1.5) scaleY(1.5)';
    }
  
    this.style.backgroundColor= 'grey';
  };
  
  button.onmouseout = function() {
    if (this.style.transform==='scaleX(1.5) scaleY(1.5)'){
      this.style.transform='';
    }
    this.style.backgroundColor= '';
  };
  
}

function setUpButtonMove(buttonName){
  document.querySelector(`.${buttonName}`).addEventListener('click',()=>{
    textShown=translateButtons(`${buttonName}`,windowInnerWidth/3,WEXbutton,textShown);
  });
}

setUpButtons(document.getElementById('WEX'))
setUpButtonMove('WEX')

setUpButtons(document.getElementById('coding'))
setUpButtonMove('coding')

setUpButtons(document.getElementById('activities'))
setUpButtonMove('activities')

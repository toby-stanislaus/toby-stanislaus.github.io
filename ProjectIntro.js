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

function wipeAllButtons(){
  document.getElementById('WEX').style.visibility='hidden';
  document.getElementById('button-child-WEX').style.visibility='hidden';

  document.getElementById('coding').style.visibility='hidden';
  document.getElementById('button-child-coding').style.visibility='hidden';

  document.getElementById('activities').style.visibility='hidden';
  document.getElementById('button-child-activities').style.visibility='hidden';
}





function translateButtons(name,amount,button,textShown){
  if (textShown){
    document.querySelector('.writing-space').innerHTML='';
    button.style.transform=
    `translate(0px,0px) scaleX(1) scaleY(1)`;

    
    setTimeout(()=>{
      wipeAllButtons();
      WEXbutton.style.visibility='visible';
      codingbutton.style.visibility='visible';
      activitiesbutton.style.visibility='visible';
      button.style.transform='';
    },1000);

    setTimeout(()=>{
    document.querySelector('.writing-space').innerHTML='';
    },100);
    
    
    return false;
  }else{
    
    button.style.transform=
    `translate(${amount}px,0px) scaleX(1.5) scaleY(1.5)`;

    wipeAllButtons();
    document.getElementById(`button-child-${name}`).style.visibility='visible';
    document.getElementById(name).style.visibility='visible';
    return true;
  }
}





document.querySelector('.WEX').addEventListener('click',()=>{
  textShown=translateButtons('WEX',windowInnerWidth/3,WEXbutton,textShown);
});


document.querySelector('.coding').addEventListener('click',()=>{
  textShown=translateButtons('coding',0,codingbutton,textShown);
});


document.querySelector('.activities').addEventListener('click',()=>{
  textShown=translateButtons('activities',-windowInnerWidth/3,activitiesbutton,textShown);
});





document.querySelector('.renishaw').addEventListener('click',()=>{
  fetchData('/Texts/Renishaw.txt')
  .then(textData=>{
    document.querySelector('.writing-space').innerHTML=textData;
  })
})
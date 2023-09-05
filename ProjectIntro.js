const oldTitle=document.title;
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


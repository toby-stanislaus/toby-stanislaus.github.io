const helmCardTemplate=document.querySelector("[data-helm-template]");
const helmCardContainer=document.querySelector("[data-helm-cards-container]");
const searchInput=document.querySelector("[data-search]");

let helms=[];

searchInput.addEventListener("input",(e)=>{
    const value = e.target.value;
    helms.forEach(helm=>{
        const isVisible = 
        helm.name.toLowerCase().includes(value) || helm.boatName.toLowerCase().includes(value) || //lower case check letters
        helm.name.toUpperCase().includes(value) || helm.boatName.toUpperCase().includes(value);   // upper case check letters
        

        helm.element.classList.toggle("hide",!isVisible)
    })
    console.log(helms);
})



fetch("https://rhvzwuhewi.execute-api.eu-west-2.amazonaws.com/dev/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{allHelms{name,boatName,boatNumber,pY}}"})
  })
    .then(res => res.json())
    .then(data => {
        helms =data.data.allHelms.map(helm => {
            const card = helmCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body =card.querySelector("[data-body]");
            header.textContent=helm.name;
            body.textContent=`${helm.boatName} ${helm.boatNumber} ${helm.pY}`;
            helmCardContainer.append(card);
            return { name: helm.name, boatName: helm.boatName, boatNumber: helm.boatNumber, pY: helm.pY, element: card};
        })
    })
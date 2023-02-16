const userCardTemplate=document.querySelector("[data-user-template]");
const userCardContainer=document.querySelector("[data-user-cards-container]");
const searchInput=document.querySelector("[data-search]");

let helms=[];

searchInput.addEventListener("input",(e)=>{
    const value = e.target.value;
    helms.forEach(helm=>{
        const isVisible = 
        helm.name.toLowerCase().includes(value) || helm.boatNumber.toLowerCase().includes(value) || //lower case check letters
        helm.name.toUpperCase().includes(value) || helm.boatNumber.toUpperCase().includes(value);   // upper case check letters
        

        helm.element.classList.toggle("hide",!isVisible)
    })
    console.log(helms);
})



fetch("https://rhvzwuhewi.execute-api.eu-west-2.amazonaws.com/dev/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: `
      query {
        allHelms{
          name
          boatNumber
        }
      }
    `,
  }),
})
    .then(res => res.json())
    .then(data => {
        helms = data.data.allHelms.map(helm => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body =card.querySelector("[data-body]");
            header.textContent=helm.name;
            body.textContent=helm.boatNumber;
            userCardContainer.append(card);
            return { name: helm.name, boatNumber: helm.boatNumber, element: card};
        })
    })
const userCardTemplate=document.querySelector("[data-user-template]");
const userCardContainer=document.querySelector("[data-user-cards-container]");
const searchInput=document.querySelector("[data-search]");

let users=[];

searchInput.addEventListener("input",(e)=>{
    const value = e.target.value;
    users.forEach(user=>{
        const isVisible = 
        user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value) || //lower case check letters
        user.name.toUpperCase().includes(value) || user.email.toUpperCase().includes(value);   // upper case check letters
        

        user.element.classList.toggle("hide",!isVisible)
    })
    console.log(users);
})



fetch("https://jsonplaceholder.typicode.com/users")
    console.log(res)
    .then(res => res.json())
    console.log(res)
    .then(data => {
        users =data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body =card.querySelector("[data-body]");
            header.textContent=user.name;
            body.textContent=user.email;
            userCardContainer.append(card);
            return { name: user.name, email: user.email, element: card};
        })
    })
const projectCards= document.querySelectorAll(".project-card")
const dotsContainer= document.querySelector("slider-dots")

const totalCards= projectCards.length

for(let i= 0; i < totalCards; i++){

    const dot= document.createElement("span")
    dot.classList.add("dot")

    if(i === 0){

        dot.classList.add("active")
    }

    dot.addEventListener("click", () =>{

    })

    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");
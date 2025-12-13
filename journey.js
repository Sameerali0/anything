const playBtn= document.getElementById("playBtn")
const rewindBtn= document.getElementById("rewindBtn")
const pauseBtn= document.getElementById("pauseBtn")
const bar= document.getElementById("bar")
const cards= document.querySelectorAll(".card")
const cardsContainer= document.getElementById("cardsContainer")
const speedSlider= document.getElementById("speedSlider")

let barPrgress= 0
let timer

playBtn.addEventListener("click", ()=>{

    clearInterval(timer)

    timer= setInterval(()=>{

        if(barPrgress >= 100){

            clearInterval(timer)
        }else{

            barPrgress += 1
            bar.style.width= barPrgress + "%"

            updateCards()
        }

    }, 120 - speedSlider.value)

})


pauseBtn.addEventListener("click", ()=>{

    clearInterval(timer)

})


rewindBtn.addEventListener("click", ()=>{
    clearInterval(timer)

    timer= setInterval(()=>{

        if(barPrgress <= 0){
            clearInterval(timer)

        }else{

            barPrgress -= 1
            bar.style.width= barPrgress +"%"

            updateCards()

        }

    }, 120 - speedSlider.value)

})

function updateCards(){

    const percentPerCard= 100 / cards.length

    cards.forEach((card, cardIndex) =>{

        const cardStartPoint= cardIndex * percentPerCard
        const cardEndPoint= cardStartPoint + percentPerCard

        if(barPrgress >= cardStartPoint && barPrgress < cardEndPoint){

            card.classList.add("active")

            card.scrollIntoView({

                behavior: "smooth",
                inline: "center",
                block: "nearest"

            })

        }else{

            card.classList.remove("active")

        }

    })

}


window.addEventListener("load",() =>{

    cards[0].scrollIntoView({

        behavior: "smooth",
        inline: "center",
        block: "nearest"

    })

})

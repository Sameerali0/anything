const playBtn= document.getElementById("playBtn")
const rewindBtn= document.getElementById("rewindBtn")
const pauseBtn= document.getElementById("pauseBtn")
const bar= document.getElementById("bar")
const cards= document.querySelectorAll(".card")

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

    }, 50)

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

    }, 50)

})

function updateCards(){

    const percentPerCard= 100 / cards.length

    cards.forEach((card, cardIndex) =>{

        const cardStartPoint= cardIndex * percentPerCard
        const cardEndPoint= cardStartPoint + percentPerCard

        if(barPrgress >= cardStartPoint && barPrgress < cardEndPoint){

            card.classList.add("active")

        }else{

            card.classList.remove("active")

        }

    })

}

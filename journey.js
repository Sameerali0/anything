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

     if(barPrgress <= 100){

        barPrgress= 0
        bar.style.width= "0%"

        updateCards()

    }

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

    if(barPrgress <= 0){

        barPrgress= 100
        bar.style.width= "100%"

        updateCards()

    }

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

const SLACK_ID= "U099LG04GDN"

const totalProjects= document.getElementById("totalProjects")
const completedProjects= document.getElementById("completedProjects")
const totalCoins= document.getElementById("coins")
const projectsList= document.getElementById("projectsList")


fetch(`https://corsproxy.io/?https://siege.hackclub.com/api/public-beta/user/${SLACK_ID}`)

    .then(res => res.json())
    .then( data =>{

        console.log("Siege Data:", data)

        const allProjects= data.projects

        const finishedProjects= allProjects.filter(

            project => project.status === "finished"
        )

        totalProjects.textContent= allProjects.length
        completedProjects.textContent= finishedProjects.length
        totalCoins.textContent= data.coins

        allProjects.forEach(project =>{

            const projectCard= document.createElement("div")
            projectCard.className= "projects"

            const projectName= project.name
            const projectStatus= project.status
            const projectWeek= project.week_badge_text

            projectCard.innerHTML= `
                <h4>${projectName}</h4>
                <p>Status: <span>${projectStatus}</span></p>
                <p>${projectWeek}</p>
            `;

            projectsList.appendChild(projectCard)

        })

    })

    .catch(error =>{

    console.error("Siege API error:", error)

  })


window.addEventListener("load", ()=>{

    const loading= document.querySelector(".loading-page")

    setTimeout(() =>{

        loading.classList.add("hide")

    }, 1000)

})

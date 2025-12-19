const playBtn= document.getElementById("playBtn")
const rewindBtn= document.getElementById("rewindBtn")
const pauseBtn= document.getElementById("pauseBtn")
const bar= document.getElementById("bar")
const cards= document.querySelectorAll(".card")
const speedSlider= document.getElementById("speedSlider")
const siegeStatsBtn= document.getElementById("siegeStatsBtn")
const siegeStats= document.getElementById("siegeStats")

let barProgress= 0
let timer

siegeStatsBtn.addEventListener("click",() =>{

    if(siegeStats.style.display === "none" || siegeStats.style.display === ""){

        siegeStats.style.display= "flex"
        siegeStats.scrollIntoView({ behavior: "smooth" })

    }else{

        siegeStats.style.display= "none"

    }

})


playBtn.addEventListener("click", ()=>{

    if(timer){
        
        clearInterval(timer)

    }

    if(barProgress >= 100){

        barProgress= 0
        bar.style.width= "0%"

        updateCards()

    }

    timer= setInterval(()=>{

        if(barProgress >= 100){

            clearInterval(timer)
        }else{

            barProgress += 1
            bar.style.width= barProgress + "%"

            updateCards()
        }

    }, 120 - speedSlider.value)

})


pauseBtn.addEventListener("click", ()=>{

    if(timer){
        
        clearInterval(timer)
    }

})


rewindBtn.addEventListener("click", ()=>{
    clearInterval(timer)

    if(barProgress <= 0){

        barProgress= 100
        bar.style.width= "100%"

        updateCards()

    }

    timer= setInterval(()=>{

        if(barProgress <= 0){
            clearInterval(timer)

        }else{

            barProgress -= 1
            bar.style.width= barProgress +"%"

            updateCards()

        }

    }, 120 - speedSlider.value)

})

function updateCards(){

    const percentPerCard= 100 / cards.length

    cards.forEach((card, cardIndex) =>{

        const cardStartPoint= cardIndex * percentPerCard
        const cardEndPoint= cardStartPoint + percentPerCard

        if(barProgress >= cardStartPoint && barProgress < cardEndPoint){

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
    if(cards.length > 0){

        cards[0].scrollIntoView({

            behavior: "smooth",
            inline: "center",
            block: "nearest"

        })
    }    

    const loading= document.querySelector(".loading-page")

    setTimeout(() =>{

        loading.classList.add("hide")

    }, 1000)

})

const SLACK_ID= "U099LG04GDN"

const totalProjects= document.getElementById("totalProjects")
const completedProjects= document.getElementById("completedProjects")
const totalCoins= document.getElementById("coins")
const projectsList= document.getElementById("projectsList")


fetch(`https://corsproxy.io/?https://siege.hackclub.com/api/public-beta/user/${SLACK_ID}`)

    .then(res => res.json())
    .then( data =>{

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


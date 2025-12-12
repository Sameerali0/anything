const playBtn= document.getElementById("playBtn")
const rewindBtn= document.getElementById("rewindBtn")
const pauseBtn= document.getElementById("pauseBtn")
const bar= document.getElementById("bar")

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

        }

    }, 50)

})


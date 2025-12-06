const projectCards= document.querySelectorAll(".project-card")
const dotsContainer= document.querySelector(".slider-dots")
const sliderRow= document.querySelector(".slider-row")
const previousBtn= document.querySelector(".slider-btn.prev")
const nextBtn= document.querySelector(".slider-btn.next")

let currentIndex= 0
const totalCards= projectCards.length

for(let i= 0; i < totalCards; i++){

    const dot= document.createElement("span")
    dot.classList.add("dot")

    if(i === 0){

        dot.classList.add("active")
    }

    dot.addEventListener("click", () =>{

        jumpToSlide(i)
        resetAutoSlide()

    })

    dotsContainer.appendChild(dot)

}

const dots= document.querySelectorAll(".dot")

function slider(){

    projectCards.forEach((card, index) =>{

        card.classList.remove("prev", "active", "next")

        if(index === currentIndex){

            card.classList.add("active")

        }else if (index === currentIndex -1 || (currentIndex === 0 && index === totalCards - 1)){

            card.classList.add("prev")

        }else if (index === currentIndex +1 || (currentIndex === totalCards - 1 && index === 0)){

            card.classList.add("next")

        }
    })

    const cardWidth= projectCards[0].offsetWidth + 20
    const sliderShift= -currentIndex * cardWidth
    sliderRow.style.transform= `translateX(${sliderShift}px)`

    dots.forEach(dot => dot.classList.remove("active"))
    dots[currentIndex].classList.add("active")

}


function showNextSlide(){

    currentIndex= (currentIndex + 1) % totalCards

    slider()

}

function showPrevSlide(){

    currentIndex= (currentIndex - 1 + totalCards) % totalCards

    slider()

}

function jumpToSlide(index){

    currentIndex= index

    slider()

}

let autoSlideTimer= setInterval(showNextSlide, 3000)

function resetAutoSlide(){

    clearInterval(autoSlideTimer)
    autoSlideTimer= setInterval(showNextSlide, 3000)

}

slider()


nextBtn.addEventListener("click",() =>{

    showNextSlide()
    resetAutoSlide()

})

previousBtn.addEventListener("click",() =>{

    showPrevSlide()
    resetAutoSlide()

})
const projectCards= document.querySelectorAll(".project-card")
const dotsContainer= document.querySelector(".slider-dots")
const sliderRow= document.querySelector(".slider-row")
const previousBtn= document.querySelector(".slider-btn.prev")
const nextBtn= document.querySelector(".slider-btn.next")
const sliderWidth= document.querySelector(".slider-view").offsetWidth
const sections= document.querySelectorAll("section")
const navLinks= document.querySelectorAll("nav ul li a")
const navline= document.querySelector(".nav-underline")

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
    const centerGap= (sliderWidth / 2) - (cardWidth / 2)
    const sliderShift= centerGap - (currentIndex * cardWidth)
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


const themeBtn= document.querySelector(".toggle")

if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light")
    themeBtn.innerHTML= `<i class="fa-solid fa-sun"></i>`

}

themeBtn.addEventListener("click",() =>{

    document.body.classList.toggle("light")

    
    if(document.body.classList.contains("light")){

        localStorage.setItem("theme", "light")
        themeBtn.innerHTML=`<i class="fa-solid fa-sun"></i>`

    }else{

        localStorage.setItem("theme", "dark")
        themeBtn.innerHTML= `<i class="fa-solid fa-moon"></i>`
    }

})

window.addEventListener("load", ()=>{

    const loading= document.querySelector(".loading-page")

    setTimeout(() =>{

        loading.classList.add("hide")

    }, 1000)

})

function line(activeLink){

    const linkPos= activeLink.getBoundingClientRect()
    const navPos= document.querySelector("nav").getBoundingClientRect()

    navline.style.width= linkPos.width +"px"
    navline.style.left= (linkPos.left - navPos.left) +"px"

}

window.addEventListener("scroll",() =>{

    let currentSection= ""

    sections.forEach(section =>{

        const sectionTop= section.offsetTop - 150
        const sectionHeight= section.clientHeight

        if(pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight){

            currentSection= section.id

        }

    })

    navLinks.forEach(link =>{

        link.classList.remove("active")

        if(link.getAttribute("href") === `#${currentSection}`){

            link.classList.add("active")
            line(link)

        }

    })

})

line(navLinks[0])

const contactForm= document.querySelector(".contact-form")
const formMessage= document.querySelector(".form-message")

function message(msg, isError =false){

    formMessage.innerHTML= msg

    if(isError){
        formMessage.classList.add("error")

    }else{

        formMessage.classList.remove("error")
    }

    formMessage.style.display="block"

    setTimeout(() =>{

        formMessage.style.display= "none"

    }, 3000)
    
}

contactForm.addEventListener("submit", function(e){
    e.preventDefault()

    const formData= new FormData(contactForm)

    fetch(contactForm.action,{

        method: "POST",
        body: formData,

    })

    .then(()=>{

        message("Your message has been sent successfully!")

        contactForm.reset()

    })
    .catch(()=>{

        message("Something went wrong! Please try again.", true)

    })

})
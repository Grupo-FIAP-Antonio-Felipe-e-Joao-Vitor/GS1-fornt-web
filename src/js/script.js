const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add("active-left")
        }
        else {
            entry.target.classList.remove("active-left")
        }
    })
})

const elements = document.querySelectorAll(".hidden-left")
elements.forEach((element) => {
    myObserver.observe(element)
})

const cards = document.querySelectorAll(".card")


cards.forEach((card) => {
    card.addEventListener("click", () => {
        const secaoCard = card.closest(".secao-card")
        
        secaoCard.classList.toggle("active")
    })
})

let count = 0

const imagens = [
    "../assets/Imagem1-sobre.png",
    "../assets/Imagem2-sobre.png",
    "../assets/Imagem3-sobre.png",
]

function slideShow () {
    
    const campoBanner = document.querySelector(".imagem")
    

    campoBanner.src = imagens[count]
    count += 1
    if (count == imagens.length) {
        count = 0
    }

    campoBanner.classList.toggle("active-right")
    setTimeout(slideShow, 2000);
}

slideShow()
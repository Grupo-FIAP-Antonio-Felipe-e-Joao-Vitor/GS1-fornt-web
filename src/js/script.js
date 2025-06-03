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
        const texto = secaoCard.querySelector(".card-container .card-info")

        texto.classList.toggle("hidden")
        console.log(texto)
    })
})

let count = 0


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
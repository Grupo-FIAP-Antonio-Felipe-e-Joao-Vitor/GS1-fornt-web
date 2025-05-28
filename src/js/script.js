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



const card1 = document.getElementById("card1")
const card2 = document.getElementById("card2")
const card3 = document.getElementById("card3")


card1.addEventListener("click", () => {
    const card1Titulo = document.getElementById('card1Titulo')
    const card1Info = document.getElementById('card1Info')
    card1Titulo.classList.toggle("hidden")
    card1Info.classList.toggle("show")
})

card2.addEventListener("click", () => {
    const card2Titulo = document.getElementById('card2Titulo')
    const card2Info = document.getElementById('card2Info')
    card2Titulo.classList.toggle("hidden")
    card2Info.classList.toggle("show")
    

})

card3.addEventListener("click", () => {
    const card3Titulo = document.getElementById('card3Titulo')
    const card3Info = document.getElementById('card3Info')

    card3Titulo.classList.toggle("hidden")
    card3Info.classList.toggle("show")
})

const imagens = [
    "../assets/Imagem1-sobre.png",
    "../assets/Imagem2-sobre.png",
    "../assets/Imagem3-sobre.png",
]

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

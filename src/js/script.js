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
    let clicado = false

    if (clicado == false) {
        clicado = true
        card1Titulo.style.display = "none"
        card1Info.style.display = "block"
    }

    else {
        card1Titulo.style.display = "block"
        card1Info.style.display = "none"
        clicado = false
    }
})

card2.addEventListener("click", () => {
    const card2Titulo = document.getElementById('card2Titulo')
    const card2Info = document.getElementById('card2Info')
    let clicado = false

    if (clicado == false) {
        clicado = true
        card2Titulo.style.display = "none"
        card2Info.style.display = "block"
    }

    else {
        card2Titulo.style.display = "block"
        card2Info.style.display = "none"
        clicado = false
    }
})

card3.addEventListener("click", () => {
    const card3Titulo = document.getElementById('card3Titulo')
    const card3Info = document.getElementById('card3Info')
    let clicado = false

    if (clicado == false) {
        clicado = true
        card3Titulo.style.display = "none"
        card3Info.style.display = "block"
    }

    else {
        card3Titulo.style.display = "block"
        card3Info.style.display = "none"
        clicado = false
    }
})
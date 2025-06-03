const menuHamburguer = document.getElementById("mobile-header")
const menuHamburguerImg = document.getElementById("hamburguer")
const pagina = document.body

menuHamburguerImg.addEventListener("click", () => {
    console.log(menuHamburguer)
    menuHamburguer.classList.toggle("active")
    if (menuHamburguer.classList.contains("active")) {
        pagina.style.overflowY = "hidden"
    } else {
        pagina.style.overflowY = "auto"
    }
})
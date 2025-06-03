const menuHamburguer = document.getElementById("mobile-header")
const menuHamburguerImg = document.getElementById("hamburguer")

menuHamburguerImg.addEventListener("click", () => {
    console.log(menuHamburguer)
    menuHamburguer.classList.toggle("active")
})
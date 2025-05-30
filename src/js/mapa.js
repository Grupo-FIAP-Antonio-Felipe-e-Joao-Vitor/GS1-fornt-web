let map = L.map('mapa').setView([-23.5505, -46.6333], 10);

//CONTRUINDO A APLICAÇÃO DO MAP DA API
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

function pegarCEP () {
    campoCEP = document.getElementById("pesquisa-CEP")
    campoCEP.mask("00000-000")
}
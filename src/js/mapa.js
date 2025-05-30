let map = L.map('mapa').setView([-23.5505, -46.6333], 10);

//CONTRUINDO A APLICAÇÃO DO MAP DA API
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

function pegarCEP () {
   campoCEP = document.getElementById("pesquisa-CEP")
   return campoCEP.value
}

function procurarCEP () {
    CEP = pegarCEP()
    cord = converterCEP(CEP)
    lat = cord[0]
    lon = cord[1]
    alert(`lat: ${lat} lon: ${lon}`)
}

async function converterCEP(CEP) {
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": `${CEP}, Brazil`,
        "format": "json",
        "limit": 1
    }
    headers = {
        "User-Agent": "MeuAppExemplo/1.0 (meuemail@exemplo.com)"
    }

    resposta = await fetch(url, params=params, headers=header)
    dados = await resposta.json()
    if (dados) {
        lat = dados[0]['lat']
        lon = dados[0]['lon']
        return lat, lon
    } else {
        return
    }
}
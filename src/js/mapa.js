let map = L.map('mapa').setView([-23.5505, -46.6333], 10);
 
//adicionando o titulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);
 
// declaração de variavel vazia
let currentMarker = null;
 
// declaração com chamando os elmentos do DOM
const searchInput = document.getElementById("pesquisa-CEP");
const infoAside = document.getElementById("informacoes");
const searchForm = document.getElementById("campo-pesquisa-CEP");
 
//Evento de enviar os dados
searchForm.addEventListener('submit', (e)=> {
    e.preventDefault(); // previne qualquer alteração antes do evento
    procurarCEP();
});
 
async function procurarCEP() {
    const cep = searchInput.value.replace(/\D/g, ''); //regex
    if (cep.length !== 8) {
        infoAside.innerHTML = '<h2 class="titulo">CEP inválido. Digite 8 números.</h2>';
        if (currentMarker) {
            map.removeLayer(currentMarker);
            currentMarker = null;
        }
        map.setView([-23.5505, -46.6333], 10); //limpa o mapa
        return;
    }
 
    infoAside.innerHTML = '<h2 class="titulo">Buscando informações...</h2>';
 
    try {
        const data = await converterCEP(cep);
 
        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const displayName = data[0].display_name;
 
            // remove o marcador anterior caso exista
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
 
            // adiciona o marcador
            currentMarker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${cep}</b><br>${displayName}`)
                .openPopup();
 
            // Centralize o mapa no novo marcador
            map.setView([lat, lon], 15); // ajusta o zoom
 
            // Mostra as Informações
            infoAside.innerHTML = `
                <h2 class="titulo">Informações do CEP: ${cep}</h2>
                <p><strong>Local:</strong> ${displayName}</p>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lon}</p>
            `;
        } else {
            infoAside.innerHTML = '<h2 class="titulo">CEP não encontrado.</h2>';
            if (currentMarker) {
                map.removeLayer(currentMarker);
                currentMarker = null;
            }
            map.setView([-23.5505, -46.6333], 10); // Limpa o mapa
        }
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        infoAside.innerHTML = '<h2 class="titulo">Ocorreu um erro ao buscar o CEP. Tente novamente.</h2>';
        if (currentMarker) {
            map.removeLayer(currentMarker);
            currentMarker = null;
        }
        map.setView([-23.5505, -46.6333], 10); //  Limpa o mapa
    }
}
 
async function converterCEP(cep) {
    const url = `https://nominatim.openstreetmap.org/search?q=${cep}, Brazil&format=json&limit=1`;
    const headers = {
        "User-Agent": "exemplo"
    };
 
    const response = await fetch(url, { headers: headers });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

let map = L.map('mapa').setView([-23.5505, -46.6333], 10);

//adicionando o titulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// declaração de variavel vazia
let currentMarker = null;
let currentArea = null;

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

        // Verifica se os dados foram retornados e se possuem as coordenadas
        if (data && data.location && data.location.coordinates) {
            const lat = parseFloat(data.location.coordinates.latitude);
            const lon = parseFloat(data.location.coordinates.longitude);

            // Constrói a string de exibição para o popup
            const street = data.street || '';
            const neighborhood = data.neighborhood || '';
            const city = data.city || '';
            const state = data.state || '';
            const displayName = `${street}, ${neighborhood}, ${city}/${state}`;

            // remove o marcador anterior caso exista
            if (currentMarker) {
                map.removeLayer(currentMarker);
                map.removeLayer(currentArea)
            }

            // adiciona o marcador
            currentMarker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${cep}</b><br>${displayName}`)
            currentArea = L.circle([lat, lon], {radius: 200}).addTo(map)
            map.panTo([lat, lon]).zoomIn(10)

            // Centralize o mapa no novo marcador
            map.setView([lat, lon], 15); // ajusta o zoom

            // Mostra as Informações
            infoAside.innerHTML = `
                <h2 class="titulo">Informações do CEP: ${cep}</h2>
                <p><strong>Rua:</strong> ${street}</p>
                <p><strong>Bairro:</strong> ${neighborhood}</p>
                <p><strong>Cidade:</strong> ${city}</p>
                <p><strong>Estado:</strong> ${state}</p>
                <p><strong>Latitude:</strong> ${lat}</p>
                <p><strong>Longitude:</strong> ${lon}</p>
            `;
        } else {
            // Se os dados não contêm as informações esperadas ou o CEP não foi encontrado pela API
            infoAside.innerHTML = '<h2 class="titulo">CEP não encontrado ou sem informações de localização.</h2>';
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
        map.setView([-23.5505, -46.6333], 10); // Limpa o mapa
    }
}

async function converterCEP(cep) {
    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`;

    const response = await fetch(url);
    if (!response.ok) {
        // A Brasil API retorna status 404 para CEPs não encontrados.
        // Se a resposta não for OK (status 200), joga um erro.
        // Isso será capturado pelo bloco catch em procurarCEP.
        if (response.status === 404) {
            throw new Error("CEP não encontrado.");
        }
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data; // CORRIGIDO: Removido '"location"' solto
}
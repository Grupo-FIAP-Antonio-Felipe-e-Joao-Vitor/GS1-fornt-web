let map = L.map('mapa').setView([-23.5505, -46.6333], 10);

//adicionando o titulo
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// declaração de variavel vazia
let currentMarker = null;
let currentArea = null; // Mantém a referência para o círculo

// declaração com chamando os elmentos do DOM
const searchInput = document.getElementById("pesquisa-CEP");
const infoAside = document.getElementById("informacoes");
const searchForm = document.getElementById("campo-pesquisa-CEP");

//Evento de enviar os dados
searchForm.addEventListener('submit', (e) => {
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
        if (currentArea) { // Remove o círculo também
            map.removeLayer(currentArea);
            currentArea = null;
        }
        map.setView([-23.5505, -46.6333], 10); //limpa o mapa
        return;
    }

    if(searchInput.value == "05615040"){
        nivelAgua = "Acima do limite"
    }else if(searchInput.value == "02451000"){
        nivelAgua = "Muito acima do limite"
    }else{
        nivelAgua = "Dentro do limite"
    }

    infoAside.innerHTML = '<h2 class="titulo">Buscando informações...</h2>';

    try {
        const dataCEp = await converterCEP(cep);

        // Verifica se os dados foram retornados e se possuem as coordenadas
        if (dataCEp && dataCEp.location && dataCEp.location.coordinates) {
            const lat = parseFloat(dataCEp.location.coordinates.latitude);
            const lon = parseFloat(dataCEp.location.coordinates.longitude);

            // Remove o marcador e o círculo anteriores caso existam
            if (currentMarker) {
                map.removeLayer(currentMarker);
                currentMarker = null;
            }
            if (currentArea) {
                map.removeLayer(currentArea);
                currentArea = null;
            }

            // Adiciona o marcador e o círculo
            currentMarker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${cep}</b>`).openPopup(); // Abre o popup automaticamente
            currentArea = L.circle([lat, lon], { radius: 200, color: 'blue', fillColor: '#30f', fillOpacity: 0.3 }).addTo(map);

            // Centralize o mapa no novo marcador
            map.setView([lat, lon], 15); // ajusta o zoom

            // Busca e exibe as informações de precipitação
            let precipitationInfo = '';
            try {
                const dataPrep = await informacoesPrecipitacao(lat, lon);
                if (dataPrep && dataPrep.daily && dataPrep.daily.precipitation_sum) {
                    const precipitationSums = dataPrep.daily.precipitation_sum;
                    let totalPrecipitation = 0;

                    // Somar a precipitação dos próximos 7 dias
                    for (let i = 0; i < precipitationSums.length; i++) {
                        totalPrecipitation += precipitationSums[i];
                    }
                    precipitationInfo = totalPrecipitation.toFixed(2)
                }
            } catch (precipError) {
                console.error('Erro ao buscar precipitação:', precipError);
                precipitationInfo = `<p class="error">Erro ao obter precipitação: ${precipError.message}</p>`;
            }

            

            // Mostra as Informações
            mostrarInfo(precipitationInfo, nivelAgua)            
        } else {
            // Se os dados não contêm as informações esperadas ou o CEP não foi encontrado pela API
            infoAside.innerHTML = '<h2 class="titulo">CEP não encontrado ou sem informações de localização.</h2>';
            if (currentMarker) {
                map.removeLayer(currentMarker);
                currentMarker = null;
            }
            if (currentArea) {
                map.removeLayer(currentArea);
                currentArea = null;
            }
            map.setView([-23.5505, -46.6333], 10); // Limpa o mapa
        }
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        infoAside.innerHTML = `<h2 class="titulo">Ocorreu um erro ao buscar o CEP: ${error.message}. Tente novamente.</h2>`;
        if (currentMarker) {
            map.removeLayer(currentMarker);
            currentMarker = null;
        }
        if (currentArea) {
            map.removeLayer(currentArea);
            currentArea = null;
        }
        map.setView([-23.5505, -46.6333], 10); // Limpa o mapa
    }
}

async function converterCEP(cep) {
    const url = `https://brasilapi.com.br/api/cep/v2/${cep}`;
    const response = await fetch(url);

    if (!response.ok) {
        // A Brasil API retorna status 404 para CEPs não encontrados.
        if (response.status === 404) {
            throw new Error("CEP não encontrado.");
        }
        throw new Error(`Erro na API Brasil API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

async function informacoesPrecipitacao(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&timezone=America%2FSao_Paulo&forecast_days=7`;
    const response = await fetch(url);

    if (!response.ok) { // A condição aqui deve ser para erros (não OK)
        if (response.status === 404) {
            throw new Error("Dados de precipitação não encontrados para esta localização.");
        }
        throw new Error(`Erro na API Open-Meteo: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

function mostrarInfo (precipitationInfo, nivelAgua) {
    let riscoEnchente = null
    if (precipitationInfo < 80) {
        riscoEnchente = "Baixo"
    } else if (precipitationInfo >= 80 && precipitationInfo <= 100) {
        riscoEnchente = "Médio"
    } else {
        riscoEnchente = "Alto"
    }

    infoAside.innerHTML =  `<h2 class="titulo">${riscoEnchente} Risco de Enchente</h2>
                            <ul>
                            <li class="paragrafo"><span>Precipitação ao longo da semana:</span> ${precipitationInfo}mm</li>
                            <li class="paragrafo"><span>Nível de água:</span> ${nivelAgua}</li>
                            </ul>`
}   
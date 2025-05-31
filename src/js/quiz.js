// MOSTRAR QUIZ

const secaoInicial = document.getElementById("secao-inicial")
const secaoQuiz = document.getElementById("secao-quiz")
const botaoProximo = document.getElementById("campo-proximo")

function mostrarQuiz () {
    secaoInicial.classList.toggle("hidden")
    secaoQuiz.classList.toggle("hidden")
    botaoProximo.classList.toggle("hidden")
    campoPerguntaAtual.textContent = `${perguntaAtual + 1}/${perguntas.length}`
}

let perguntaAtual = 0

const campoPergunta = document.getElementById("campo-pergunta")
const textoAlternativaA = document.getElementById("texto-alternativa-A")
const textoAlternativaB = document.getElementById("texto-alternativa-B")

const formQUiz = document.getElementById("form-quiz")
const secaoResultado = document.getElementById("secao-resultado")
const campoAcertos = document.getElementById("acertos")

const alternativaA = document.getElementById("alternativa-A")
const alternativaB = document.getElementById("alternativa-B")

const campoPerguntaAtual = document.getElementById("count-pergunta")
const msgErro = document.getElementById("mensagem-erro")

const perguntas = [
    {
        pergunta: "O que caracteriza uma enchente?",
        A: "A elevação do nível do lençol freático acima do solo",
        B: "O transbordamento de cursos d’água que atinge áreas normalmente secas",
        resposta: "b",
        explicacao: ""  
    },
    {
        pergunta: "Qual fator urbano contribui diretamente para o aumento da frequência de enchentes?",
        A: "Redução da área permeável devido à urbanização intensa",
        B: "Construção de ciclovias em áreas planas",
        resposta: "a"
    },
    {
        pergunta: "Qual a principal função da Defesa Civil em situações de enchente?",
        A: "Executar obras de contenção permanente",
        B: "Coordenar ações de prevenção, alerta e resposta emergencial",
        resposta: "b"
    },
    {
        pergunta: "Por que atravessar uma via alagada é perigoso, mesmo com pouca água?",
        A: "A profundidade pode estar disfarçada e esconder riscos como buracos ou correnteza",
        B: "A água geralmente contém cloro e pode manchar a lataria do veículo",
        resposta: "a"
    },
    {
        pergunta: "O descarte de lixo nas ruas pode causar enchentes porque:",
        A: "Obstrui os sistemas de drenagem pluvial, impedindo o escoamento da água",
        B: "Aumenta o nível de poluição atmosférica",
        resposta: "a"
    },
    
]

// VERIFICAR RESPOSTA 



function verificaResposta () {
    if (alternativaA.checked == true) {
        msgErro.classList.add("hidden")
        return "a"
    } else if (alternativaB.checked == true) {
        msgErro.classList.add("hidden")
        return "b"
    } else {
        return
    }
}

let acertos = 0



function proximaPergunta () {
    let respostaUsuario = verificaResposta();
    
    if (!respostaUsuario) {
        msgErro.classList.remove("hidden");
        return;
    }

    // Verifica e soma acerto antes de avançar
    if (respostaUsuario === perguntas[perguntaAtual].resposta) {
        acertos += 1;
    }

    // Verifica se é a última pergunta
    if (perguntaAtual < perguntas.length - 1) {
        perguntaAtual += 1;
        mostraPerguntas(perguntaAtual);
        campoPerguntaAtual.textContent = `${perguntaAtual + 1}/${perguntas.length}`;
    } else {
        formQUiz.classList.toggle("hidden");
        botaoProximo.classList.add("hidden");
        secaoResultado.classList.remove("hidden")
        campoAcertos.textContent = `Você acertou ${acertos} perguntas!`
    }
}


function mostraPerguntas (perguntaAtual) {
    alternativaA.checked = false
    alternativaB.checked = false
    
    campoPergunta.textContent = perguntas[perguntaAtual].pergunta
    textoAlternativaA.textContent = perguntas[perguntaAtual].A
    textoAlternativaB.textContent = perguntas[perguntaAtual].B
}

function reiniciar() {
    secaoInicial.classList.toggle("hidden")
    secaoQuiz.classList.toggle("hidden")
    botaoProximo.classList.add("hidden")
    secaoResultado.classList.add("hidden")
    formQUiz.classList.toggle("hidden");
    perguntaAtual = 0
    acertos = 0
    mostraPerguntas(perguntaAtual)
}
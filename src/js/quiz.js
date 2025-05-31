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
        explicacao: "Enchentes são caracterizadas pelo transbordamento de rios, córregos e canais, que acabam invadindo áreas que normalmente ficam secas."  
    },
    {
        pergunta: "Qual fator urbano contribui diretamente para o aumento da frequência de enchentes?",
        A: "Redução da área permeável devido à urbanização intensa",
        B: "Construção de ciclovias em áreas planas",
        resposta: "a",
        explicacao: "A urbanização reduz a infiltração da água no solo, o que aumenta o volume de água escoando superficialmente e pode causar alagamentos e enchentes."

    },
    {
        pergunta: "Qual a principal função da Defesa Civil em situações de enchente?",
        A: "Executar obras de contenção permanente",
        B: "Coordenar ações de prevenção, alerta e resposta emergencial",
        resposta: "b",
        explicacao: "A Defesa Civil atua na coordenação de medidas preventivas e emergenciais, como alertas e resgates, durante desastres como enchentes."
    },
    {
        pergunta: "Por que atravessar uma via alagada é perigoso, mesmo com pouca água?",
        A: "A profundidade pode estar disfarçada e esconder riscos como buracos ou correnteza",
        B: "A água geralmente contém cloro e pode manchar a lataria do veículo",
        resposta: "a",
        explicacao: "Mesmo uma lâmina fina de água pode esconder buracos profundos, correntezas ou causar a perda de controle do veículo, oferecendo alto risco."
    },
    {
        pergunta: "O descarte de lixo nas ruas pode causar enchentes porque:",
        A: "Obstrui os sistemas de drenagem pluvial, impedindo o escoamento da água",
        B: "Aumenta o nível de poluição atmosférica",
        resposta: "a",
        explicacao: "O lixo descartado nas ruas pode entupir bueiros e galerias de água pluvial, impedindo o escoamento da água da chuva e causando enchentes."
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
let errou = null

function mostarExplicacao(perguntaAtual, errou) {
    const campoFeedback = document.getElementById("feedback")
    const textoFeedback = document.getElementById("feedback-acerto")
    const curiosidade = document.getElementById("curiosidade")
    campoFeedback.classList.toggle("hidden")
    formQUiz.classList.toggle("hidden")
    
    if (errou == true) {
        textoFeedback.textContent = "Quase lá!"
    } else {
        textoFeedback.textContent = "Muito Bem!"
    }

    curiosidade.textContent = perguntas[perguntaAtual].explicacao
}



let exibiuFeedback = false; // Variável de controle

function proximaPergunta () {
    // Se ainda não exibiu o feedback, mostra e bloqueia avanço
    if (!exibiuFeedback) {
        let respostaUsuario = verificaResposta();

        if (!respostaUsuario) {
            msgErro.classList.remove("hidden");
            return;
        }

        // Verifica e soma acerto antes de avançar
        if (respostaUsuario === perguntas[perguntaAtual].resposta) {
            acertos += 1;
            errou = false;
        } else {
            errou = true;
        }

        mostarExplicacao(perguntaAtual, errou);
        exibiuFeedback = true; // Marca que já exibiu
        return; // Impede de avançar ainda
    }

    // Se já exibiu o feedback, então avança para próxima pergunta
    exibiuFeedback = false; // Reseta para a próxima pergunta

    const campoFeedback = document.getElementById("feedback");
    campoFeedback.classList.add("hidden");
    formQUiz.classList.remove("hidden");

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostraPerguntas(perguntaAtual);
        campoPerguntaAtual.textContent = `${perguntaAtual + 1}/${perguntas.length}`;
    } else {
        formQUiz.classList.add("hidden");
        botaoProximo.classList.add("hidden");
        secaoResultado.classList.remove("hidden");
        campoAcertos.textContent = `Você acertou ${acertos} perguntas!`;
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
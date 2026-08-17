// Base de perguntas baseada nos documentos oficiais (Níveis 1 a 5)
const questions = [
    // NÍVEL 1 (Iniciante)
    {
        level: 1,
        prize: "R$ 1.000",
        question: "O que são microplásticos de acordo com a definição científica?",
        options: [
            "Grandes pedaços de plástico boiando no oceano com mais de 10 centímetros.",
            "Pequenas partículas de plástico com 5 milímetros de diâmetro ou menos.", // Correta[span_10](start_span)[span_10](end_span)
            "Garrafas PET inteiras recicladas e transformadas em sacolas de pano.",
            "Vidros moídos em praias que se parecem visualmente com plástico."
        ],
        answer: 1
    },
    // NÍVEL 2 (Aprendiz)
    {
        level: 2,
        prize: "R$ 10.000",
        question: "Qual é a diferença fundamental entre microplásticos PRIMÁRIOS e SECUNDÁRIOS?",
        options: [
            "Os primários vêm de garrafas velhas; os secundários vêm de pneus novos.",
            "Os primários são fabricados propositalmente em tamanho pequeno; os secundários surgem da degradação de plásticos maiores.", // Correta[span_11](start_span)[span_11](end_span)
            "Os primários são de origem natural; os secundários são produzidos por animais marinhos.",
            "Os primários flutuam na água doce; os secundários afundam na água salgada."
        ],
        answer: 1
    },
    // NÍVEL 3 (Intermediário)
    {
        level: 3,
        prize: "R$ 50.000",
        question: "Por que o ato de aquecer alimentos ou bebidas em recipientes de plástico deve ser evitado?",
        options: [
            "Porque o pote absorve o cheiro do alimento e muda sua cor.",
            "Porque o calor acelera a degradação do plástico, liberando milhões de micropartículas e compostos químicos na comida.", // Correta[span_12](start_span)[span_12](end_span)
            "Porque o micro-ondas deixa de funcionar ao entrar em contato com o plástico.",
            "Porque o alimento perde instantaneamente todas as suas calorias."
        ],
        answer: 1
    },
    // NÍVEL 4 (Avançado)
    {
        level: 4,
        prize: "R$ 200.000",
        question: "Lavar roupas de tecidos sintéticos (como poliéster e nylon) solta milhares de microfibras. Qual procedimento reduz essa liberação?",
        options: [
            "Lavar com água fervendo em ciclos extremamente longos e intensos.",
            "Lavar com água fria e utilizar ciclos de lavagem mais curtos.", // Correta[span_13](start_span)[span_13](end_span)
            "Usar alvejante forte e esfregar as peças com escova de aço.",
            "Deixar a roupa de molho no sol forte por vários dias antes de lavar."
        ],
        answer: 1
    },
    // NÍVEL 5 (Especialista)
    {
        level: 5,
        prize: "R$ 1.000.000",
        question: "Por que o microplástico é considerado um 'poluente invisível e altamente persistente'?",
        options: [
            "Porque ele se dissolve quimicamente em poucas horas na água do mar.",
            "Porque seu tamanho microscópico dificulta a identificação e recolhimento, enquanto sua estrutura sintética leva até séculos para se decompor.", // Correta[span_14](start_span)[span_14](end_span)
            "Porque ele voa para fora da atmosfera terrestre logo após ser descartado no lixo.",
            "Porque ele se transforma em gás carbônico assim que toca o solo."
        ],
        answer: 1
    }
];

let currentQuestionIndex = 0;

const screenStart = document.getElementById("screen-start");
const screenGame = document.getElementById("screen-game");
const screenGameover = document.getElementById("screen-gameover");

const btnStart = document.getElementById("btn-start");
const btnRestart = document.getElementById("btn-restart");

const textQuestion = document.getElementById("question-text");
const containerOptions = document.getElementById("options-container");
const currentLevelIndicator = document.getElementById("current-level");
const currentPrizeIndicator = document.getElementById("current-prize");

const gameoverTitle = document.getElementById("gameover-title");
const gameoverMessage = document.getElementById("gameover-message");

btnStart.addEventListener("click", startGame);
btnRestart.addEventListener("click", startGame);

function startGame() {
    currentQuestionIndex = 0;
    screenStart.classList.remove("active");
    screenGameover.classList.remove("active");
    screenGame.classList.add("active");
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    currentLevelIndicator.textContent = q.level;
    currentPrizeIndicator.textContent = q.prize;
    textQuestion.textContent = q.question;
    
    containerOptions.innerHTML = "";
    q.options.forEach((opt, index) => {
        const button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = `${String.fromCharCode(65 +)}) ${opt}`;
        button.addEventListener("click", () => selectOption(index, button));
        containerOptions.appendChild(button);
    });
}

function selectOption(selectedIndex, buttonElement) {
    const q = questions[currentQuestionIndex];
    const allButtons = containerOptions.querySelectorAll(".option-btn");
    
    // Desabilita os botões para evitar duplo clique
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.answer) {
        buttonElement.classList.add("correct");
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                endGame(true);
            }
        }, 1500);
    } else {
        buttonElement.classList.add("wrong");
        allButtons[q.answer].classList.add("correct");
        setTimeout(() => {
            endGame(false);
        }, 2000);
    }
}

function endGame(won) {
    screenGame.classList.remove("active");
    screenGameover.classList.add("active");
    
    if (won) {
        gameoverTitle.textContent = "PARABÉNS! MILIONÁRIO!";
        gameoverMessage.textContent = "Você gabaritou o quiz de microplásticos e levou o prêmio máximo de R$ 1.000.000!";
    } else {
        gameoverTitle.textContent = "FIM DE JOGO!";
        gameoverMessage.textContent = `Você parou no nível ${currentQuestionIndex + 1}. Continue estudando sobre a preservação dos oceanos!`;
    }
}

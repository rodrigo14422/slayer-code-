// Aguarda o carregamento do DOM antes de executar
document.addEventListener('DOMContentLoaded', () => {

    // Dados das perguntas e opções associadas a cada tipo de respiração
    const questions = [
        {
            question: "Qual é a sua principal virtude em uma batalha ou desafio?",
            options: [
                { text: "Calma e capacidade de adaptação constante.", type: "agua" },
                { text: "Velocidade impressionante e reflexos rápidos.", type: "trovao" },
                { text: "Força bruta e determinação inabalável.", type: "chamas" },
                { text: "Agilidade, intuição e um toque de selvageria.", type: "fera" }
            ]
        },
        {
            question: "Como você lida com situações de grande pressão?",
            options: [
                { text: "Mantenho a mente fluindo como um rio, avaliando as opções.", type: "agua" },
                { text: "Sinto ansiedade, mas ajo num piscar de olhos quando preciso.", type: "trovao" },
                { text: "Queimo de paixão para proteger quem está ao meu redor.", type: "chamas" },
                { text: "Ataco de frente! Recuar nunca é uma opção.", type: "fera" }
            ]
        },
        {
            question: "Qual ambiente reflete melhor a sua personalidade?",
            options: [
                { text: "Um lago tranquilo durante uma chuva suave.", type: "agua" },
                { text: "O céu no meio de uma tempestade elétrica.", type: "trovao" },
                { text: "O calor e a luz de uma fogueira vibrante.", type: "chamas" },
                { text: "A densidão de uma floresta fechada e selvagem.", type: "fera" }
            ]
        }
    ];

    // Detalhes dos resultados
    const results = {
        agua: {
            title: "Respiração da Água 🌊",
            description: "Você é adaptável, calmo e mantém a mente limpa mesmo nas maiores adversidades. Como a água, você molda seu estilo a qualquer situação e flui com precisão."
        },
        trovao: {
            title: "Respiração do Trovão ⚡",
            description: "Você possui uma velocidade devastadora e foco impressionante. Pode até hesitar no início, mas quando decide agir, executa tudo com um único golpe fulminante."
        },
        chamas: {
            title: "Respiração das Chamas 🔥",
            description: "Seu coração queima com determinação, justiça e paixão. Você é um líder nato que inspira os outros e não recua diante de nenhum perigo."
        },
        fera: {
            title: "Respiração da Fera 🐗",
            description: "Você segue seus instintos primordiais. Direto, corajoso e imprevisível, você confia na sua força e não tem medo de encarar os desafios de frente."
        }
    };

    // Variáveis de controle de estado
    let currentQuestionIndex = 0;
    const scores = { agua: 0, trovao: 0, chamas: 0, fera: 0 };

    // Elementos do DOM
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const quizContentEl = document.getElementById('quiz-content');
    const quizResultEl = document.getElementById('quiz-result');
    const resultTitleEl = document.getElementById('result-title');
    const resultDescEl = document.getElementById('result-description');
    const restartBtn = document.getElementById('restart-btn');

    // Inicializa o quiz se os elementos existirem na página
    if (questionEl && optionsEl) {
        showQuestion();

        if (restartBtn) {
            restartBtn.addEventListener('click', restartQuiz);
        }
    }

    // Exibe a pergunta atual
    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
        optionsEl.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.classList.add('quiz-option-btn');
            button.addEventListener('click', () => selectOption(option.type));
            optionsEl.appendChild(button);
        });
    }

    // Processa a escolha da resposta
    function selectOption(type) {
        scores[type]++;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    // Calcula e exibe o resultado final
    function showResult() {
        let winningType = 'agua';
        let highestScore = -1;

        // Determina qual tipo teve mais pontos
        for (const type in scores) {
            if (scores[type] > highestScore) {
                highestScore = scores[type];
                winningType = type;
            }
        }

        const resultData = results[winningType];
        resultTitleEl.textContent = resultData.title;
        resultDescEl.textContent = resultData.description;

        quizContentEl.classList.add('hidden');
        quizResultEl.classList.remove('hidden');
    }

    // Reinicia o quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        for (const type in scores) {
            scores[type] = 0;
        }

        quizResultEl.classList.add('hidden');
        quizContentEl.classList.remove('hidden');
        showQuestion();
    }
});
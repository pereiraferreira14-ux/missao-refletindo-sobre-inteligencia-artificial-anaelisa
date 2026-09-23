document.addEventListener("DOMContentLoaded", () => {
  // Elementos do Botão Iniciar e Telas
  const btnIniciar = document.getElementById("btnIniciar");
  const startScreen = document.getElementById("start-screen");
  const quizContainer = document.getElementById("quiz-container");

  // Elementos do Quiz
  const quizIcon = document.getElementById("quiz-icon");
  const quizTitle = document.getElementById("quiz-title");
  const quizDesc = document.getElementById("quiz-desc");
  const optionsGrid = document.getElementById("options-grid");
  const brewBtn = document.getElementById("brew-btn");
  const logList = document.getElementById("log-list");

  let currentStep = 0;
  let userChoices = [];
  let selectedOption = null;

  // 1. Perguntas de cada Escola
  const questions = [
    {
      school: "Feitiçaria",
      icon: "🔥",
      title: "Escola de Encantamentos",
      question: "Um duelo se inicia na praça central. Qual feitiço você canaliza?",
      options: [
        { label: "🔥 Bola de Fogo Arcana", value: "fogo" },
        { label: "🛡️ Escudo Ilusório", value: "ilusao" }
      ]
    },
    {
      school: "Transfiguração",
      icon: "🦅",
      title: "Escola de Metamorfose",
      question: "Um rio de lava bloqueia sua passagem. Como altera a matéria?",
      options: [
        { label: "🪨 Transforma em Rocha Sólida", value: "terra" },
        { label: "🦅 Invoca Asas de Fênix", value: "ar" }
      ]
    },
    {
      school: "Defesa",
      icon: "🛡️",
      title: "Escola de Proteção Alquímica",
      question: "Uma maldição antiga começa a se espalhar. O que você prioriza?",
      options: [
        { label: "⚡ Banir a fonte com força total", value: "ataque" },
        { label: "🧪 Criar um antídoto para a vila", value: "cura" }
      ]
    }
  ];

  // Evento para Iniciar o Teste
  if (btnIniciar) {
    btnIniciar.addEventListener("click", () => {
      startScreen.style.display = "none";
      quizContainer.style.display = "block";
      loadQuestion();
    });
  }

  // Carrega a pergunta atual na tela
  function loadQuestion() {
    selectedOption = null;
    brewBtn.disabled = true;

    if (currentStep < questions.length) {
      const q = questions[currentStep];
      quizIcon.textContent = q.icon || "🔮";
      quizTitle.textContent = `${q.title} (${currentStep + 1}/${questions.length})`;
      quizDesc.textContent = q.question;

      // Limpa opções anteriores
      optionsGrid.innerHTML = "";

      // Renderiza as novas opções
      q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "btn option-btn";
        btn.textContent = opt.label;
        btn.addEventListener("click", () => selectOption(btn, opt));
        optionsGrid.appendChild(btn);
      });

      brewBtn.textContent = currentStep === questions.length - 1 ? "Finalizar Jornada" : "Próxima Escolha";
    } else {
      showResults();
    }
  }

  // Trata a seleção de uma opção
  function selectOption(buttonElement, optionData) {
    const buttons = optionsGrid.querySelectorAll(".option-btn");
    buttons.forEach((b) => b.classList.remove("selected"));

    buttonElement.classList.add("selected");
    selectedOption = optionData;
    brewBtn.disabled = false;
  }

  // Avança no teste e grava no diário
  brewBtn.addEventListener("click", () => {
    if (!selectedOption && currentStep < questions.length) return;

    if (currentStep < questions.length) {
      userChoices.push({
        school: questions[currentStep].school,
        choice: selectedOption.label
      });

      updateLog();
      currentStep++;
      loadQuestion();
    } else {
      // Reiniciar o teste
      currentStep = 0;
      userChoices = [];
      updateLog();
      loadQuestion();
    }
  });

  // Atualiza a lista do Diário de Consequências
  function updateLog() {
    logList.innerHTML = "";
    if (userChoices.length === 0) {
      logList.innerHTML = "<li>Nenhum resultado registrado ainda...</li>";
      return;
    }

    userChoices.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.school}:</strong> Decidiu por ${item.choice}`;
      logList.appendChild(li);
    });
  }

  // Tela final de conclusão
  function showResults() {
    quizIcon.textContent = "🏆";
    quizTitle.textContent = "Jornada Concluída!";
    quizDesc.textContent = "Você completou seu aprendizado por todas as escolas de magia.";
    optionsGrid.innerHTML = "<p>Seu destino arcano foi traçado com sucesso!</p>";
    brewBtn.textContent = "Refazer Teste";
    brewBtn.disabled = false;
  }
});
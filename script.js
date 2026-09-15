let currentStep = 0;
let userChoices = [];

const quizIcon = document.getElementById('quiz-icon');
const quizTitle = document.getElementById('quiz-title');
const quizDesc = document.getElementById('quiz-desc');
const optionsGrid = document.getElementById('options-grid');
const brewBtn = document.getElementById('brew-btn');
const logList = document.getElementById('log-list');

// 1. Perguntas de cada Escola
const questions = [
  {
    school: "Feitiçaria",
    title: "Escola de Encantamentos",
    question: "Um duelo se inicia na praça central. Qual feitiço você canaliza?",
    options: [
      { label: "🔥 Bola de Fogo Arcana", value: "fogo" },
      { label: "🛡️ Escudo Ilusório", value: "ilusao" }
    ]
  },
  {
    school: "Transfiguração",
    title: "Escola de Metamorfose",
    question: "Um rio de lava bloqueia sua passagem. Como altera a matéria?",
    options: [
      { label: "🪨 Transforma em Rocha Solida", value: "terra" },
      { label: "🦅 Invoca Asas de Fênix", value: "ar" }
    ]
  },
  {
    school: "Defesa",
    title: "Escola de Proteção Alquímica",
    question: "Uma maldição antiga começa a se espalhar. O que você prioriza?",
    options: [
      { label: "⚡ Banir a fonte com força total", value: "ataque" },
      { label: "🧪 Criar um antídoto para a vila", value: "cura" }
    ]
  }
];

// 2. Consequências baseadas na combinação exata das 3 escolhas
const outcomes = {
  'fogo+terra+ataque': {
    name: 'O Destruidor Supremo',
    icon: '🌋',
    desc: 'Sua sede de força erradicou a ameaça, mas transformou o reino em uma terra devastada e inabitável.'
  },
  'fogo+terra+cura': {
    name: 'Guardião de Ferro e Fogo',
    icon: '🏰',
    desc: 'Você fortificou o reino com barreiras inquebráveis e garantiu a salvação de seu povo.'
  },
  'fogo+ar+ataque': {
    name: 'Senhor dos Tempestades',
    icon: '⚡',
    desc: 'Sua magia elemental devastou os exércitos inimigos, tornando seu nome uma lenda temida.'
  },
  'fogo+ar+cura': {
    name: 'Fênix Renascida',
    icon: '🦅',
    desc: 'Sua energia pura purificou a terra e curou todas as maldições da região.'
  },
  'ilusao+terra+ataque': {
    name: 'Estrategista Sombrio',
    icon: '🎭',
    desc: 'Você derrotou os inimigos sem que eles jamais vissem seu rosto, controlando o reino nas sombras.'
  },
  'ilusao+terra+cura': {
    name: 'Mestre da Ilusão Protetora',
    icon: '🌌',
    desc: 'Você escondeu a cidade inteira dos olhos do mal, garantindo séculos de paz secreta.'
  },
  'ilusao+ar+ataque': {
    name: 'Vento Vingativo',
    icon: '🌪️',
    desc: 'Sua magia sutil desmantelou o império inimigo de dentro para fora antes que percebessem.'
  },
  'ilusao+ar+cura': {
    name: 'Sábio Harmonioso',
    icon: '🕊️',
    desc: 'Você resolveu o conflito através da diplomacia e ilusões pacificadoras sem derramar uma gota de sangue.'
  }
};

let selectedOption = null;

function renderStep() {
  if (currentStep < questions.length) {
    const q = questions[currentStep];
    quizIcon.textContent = "🔮";
    quizTitle.textContent = `Etapa ${currentStep + 1}: ${q.school}`;
    quizDesc.textContent = q.question;
    brewBtn.textContent = "Confirmar Escolha";
    brewBtn.disabled = true;
    selectedOption = null;

    optionsGrid.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-ingredient';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-ingredient').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedOption = opt.value;
        brewBtn.disabled = false;
      });
      optionsGrid.appendChild(btn);
    });
  } else {
    showOutcome();
  }
}

brewBtn.addEventListener('click', () => {
  if (currentStep < questions.length) {
    if (!selectedOption) return;
    userChoices.push(selectedOption);
    currentStep++;
    renderStep();
  } else {
    // Reiniciar Quiz
    currentStep = 0;
    userChoices = [];
    renderStep();
  }
});

function showOutcome() {
  const key = userChoices.join('+');
  const result = outcomes[key] || {
    name: 'Alquimista Imprevisto',
    icon: '🌀',
    desc: 'Suas escolhas criaram uma anomalia temporal mágica imprevisível.'
  };

  quizIcon.classList.add('brewing');
  quizTitle.textContent = 'CALCULANDO DESTINO...';
  quizDesc.textContent = 'A magia está selando o resultado dos seus atos.';
  optionsGrid.innerHTML = '';
  brewBtn.disabled = true;

  setTimeout(() => {
    quizIcon.classList.remove('brewing');
    quizIcon.textContent = result.icon;
    quizTitle.textContent = result.name;
    quizDesc.textContent = result.desc;

    addLog(`Resultado: ${result.name}`);

    brewBtn.textContent = "Refazer o Teste";
    brewBtn.disabled = false;
  }, 1200);
}

function addLog(message) {
  if (logList.children[0]?.textContent === 'Nenhum resultado registrado ainda...') {
    logList.innerHTML = '';
  }
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleTimeString('pt-BR')} — ${message}`;
  logList.prepend(li);
}

// Inicia o quiz ao carregar
renderStep();
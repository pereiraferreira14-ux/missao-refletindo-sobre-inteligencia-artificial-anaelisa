let selectedIngredients = [];

const ingredientButtons = document.querySelectorAll('.btn-ingredient');
const brewBtn = document.getElementById('brew-btn');
const potionPreview = document.getElementById('potion-preview');
const potionTitle = document.getElementById('potion-title');
const potionDesc = document.getElementById('potion-desc');
const logList = document.getElementById('log-list');

// Receitas Alquímicas
const recipes = {
  'fire+water': { name: 'Elixir de Névoa Aquecida', icon: '💨', desc: 'Concede invisibilidade temporária em climas frios.' },
  'fire+shadow': { name: 'Chama Escura', icon: '🔥', desc: 'Queima sem emitir qualquer luz visível.' },
  'fire+gold': { name: 'Essência do Sol', icon: '☀️', desc: 'Restaura a vitalidade e afasta maldições.' },
  'water+shadow': { name: 'Veneno Abissal', icon: '🧪', desc: 'Uma poção traiçoeira que congela a mente.' },
  'water+gold': { name: 'Soro da Verdade', icon: '💧', desc: 'Obriga quem o beber a revelar seus segredos.' },
  'gold+shadow': { name: 'Pedra Filosofal Incompleta', icon: '💎', desc: 'Transmuta pequenos objetos em metais brilhantes.' }
};

// Seleção de ingredientes
ingredientButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const element = btn.dataset.element;

    if (btn.classList.contains('selected')) {
      btn.classList.remove('selected');
      selectedIngredients = selectedIngredients.filter(e => e !== element);
    } else if (selectedIngredients.length < 2) {
      btn.classList.add('selected');
      selectedIngredients.push(element);
    }

    brewBtn.disabled = selectedIngredients.length !== 2;
  });
});

// Ação de preparar a poção
brewBtn.addEventListener('click', () => {
  if (selectedIngredients.length !== 2) return;

  const key = selectedIngredients.sort().join('+');
  const recipe = recipes[key];

  potionPreview.classList.add('brewing');
  potionTitle.textContent = 'MISTURANDO...';
  potionDesc.textContent = 'Aguarde os vapores alquímicos baixarem.';

  setTimeout(() => {
    potionPreview.classList.remove('brewing');

    if (recipe) {
      potionPreview.textContent = recipe.icon;
      potionTitle.textContent = recipe.name;
      potionDesc.textContent = recipe.desc;

      addLog(`Criou: ${recipe.name}`);
    } else {
      potionPreview.textContent = '💥';
      potionTitle.textContent = 'Mistura Instável!';
      potionDesc.textContent = 'Os elementos se anularam e geraram apenas fumaça.';

      addLog('Tentativa falha de alquimia.');
    }

    // Resetar botões
    ingredientButtons.forEach(btn => btn.classList.remove('selected'));
    selectedIngredients = [];
    brewBtn.disabled = true;
  }, 1200);
});

function addLog(message) {
  if (logList.children[0]?.textContent === 'Aguardando primeira criação...') {
    logList.innerHTML = '';
  }
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleTimeString('pt-BR')} — ${message}`;
  logList.prepend(li);
}
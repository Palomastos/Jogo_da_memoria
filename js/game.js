// Pegando a parte desejada do html.
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');


// Pegando os itens que estão armazenados no localStorage.
const difficulty = localStorage.getItem('difficulty');
const cardName = localStorage.getItem('cardName');
const validation = localStorage.getItem('validation');
const accountant = localStorage.getItem('accountant');


// Array que vai armazenar a quantidade de movimentos que o player fará.
const amountMov = [];


// Função criada para retornar uma lista de acordo com a dificultade escolhida. Essa lista vai conter os nomes dos card.
const selectArray = () => {
  const cardsNameEasy = [
  'Método da Adição',
  'Fórmula de Bhaskara',
  'Dispositivo Briot-Ruffini',
  'Método da Comparação',
  'Equação do Primeiro Grau',
  'Função Afim',
  'Teorema de Pitágoras',
  'Método da Substituição',
  ];

  const cardsNameMedium = [
  'Completar Quadrados',
  'Regra de Crammer',
  'Metódo do Escalonamento',
  'Identidade de Arcos Duplos',
  'Identidade Trigonometrica',
  'leidoscossenos',
  'Lei dos Senos',
  'Teorema de Tales',
  ];

  const cardsNameHard = [
  'Teorema Fundamental da Álgebra',
  'Equações Diferenciais',
  'Equação de Euler',
  'Teorema de Fermat',
  'Transformada de Fourier',
  'Transformada de Laplace',
  'Metódo de Newton-Raphson',
  'Teorema de Valor Médio',
  ];


  if (difficulty == 'EASY') {
      return cardsNameEasy;
  }
  else if (difficulty == 'MEDIUM') {
      return cardsNameMedium;
  }
  else {
      return cardsNameHard;
  }
}
const difficultyArray = selectArray();


// Função que vai ser utilizada para criar elementos html posteriormente.
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}


// Os let serão usados para armazenar os cads selecionados e compará-los. Por existir a necessidade dessa variabilidade, a melhor opção encontrada foi manter-los assim, sem trocar por um const.
let firstCard = '';
let secondCard = '';


// Função que aramazena a quantidade de cards disabilitados na const 'disabledCards' e verefica se todos cards foram desabilitados. Caso todos os cards estejam desabilitados, ela soma todos os movimentos realizados pelo o player e armazena em 'moviments', no localStorage. Por fim, redireciona para a pág winner.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');


  if (disabledCards.length === 16) {
    const moviments = amountMov.reduce((x, acc) => x + acc, 0);
    localStorage.setItem('moviments', moviments);

    window.location.replace('/pages/winner.html');
  }
}

// Função que verifica se os card selecionados pelo o player são iguais, desabilitando-os (adicionando uma clsas pra isso) caso isso seja verdadeiro e os mantendo habilitados caso isso seja falso. Ela também é responsavel por esvaziar os let. Além disso, a cada chamada dessa função, é verificado se o jogo acabou ou não.
const checkCards = () => {
  const firstName = firstCard.getAttribute('data-name');
  const secondName = secondCard.getAttribute('data-name');

  if (firstName === secondName) {
    amountMov.push(1);

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {
      amountMov.push(1);

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}


// Função que serve para revelar o card selecionado pelo o player, pegando a parte html e adicionando a class 'reveal-card', caso ela não possua. Essa função também é responsável por preencher os let.
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}


// Função que serve para armazenar o nome do card em que o botão 'Dicas' foi clicado, redirecionando para a pág de perguntas.
const openPagesDicas = (name) => {
  localStorage.setItem('cardName', name);

  window.location.replace('/pages/quest.html');
}


// Função que cria a parte html dos card. É passado para ela um nome e, apartir disso, ela cria divs já contendo a class desejada, o botão de dicas, um comando para ser executado quando o card for clicado e adiciona a imagem correspondente ao nome passado.
const createCard = (name) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    const button = document.createElement('button');

    button.classList.add('face', 'button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', `${name}`);
    button.setAttribute('onclick', `openPagesDicas('${name}')`);
    button.textContent = 'Dicas';


    card.appendChild(front);
    card.appendChild(button);
    card.appendChild(back);
  
    card.addEventListener('click', revealCard);
    card.setAttribute('data-name', name);
  
    front.style.backgroundImage = `url('/images/${difficulty}/${name}.jpg')`;

    return card;
  }


// Função que serve para duplicar e embaralhar os cards, passando os cards, um por um, para a função 'createCard'.
const loadGame = () => {
  const duplicateDifficultyArray = [...difficultyArray, ...difficultyArray];

  const shuffledArray = duplicateDifficultyArray.sort(() => Math.random() - 0.5);

  // Versão funcional do ForEach(), que vai repassar os cards para 'createCard'.
  const creaftingCard = ([name, ...othersname], acc=0)=> {
    if(acc == shuffledArray.length) {
      return;
    }
    else {
      const card = createCard(name);
      grid.appendChild(card);
      return creaftingCard(othersname, acc+1);
    }
  }
  creaftingCard(shuffledArray);
}

// Comando usado para fazer o carregamento da função passada apenas depois de todo conteúdo for carregado, evitando alguns erros indesejados.
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem(`player${accountant}`);
  loadGame();
}

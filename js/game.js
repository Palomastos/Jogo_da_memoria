const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


// A const 'accountant' serve para verificar a rodada no qual o player está.
const accountant = localStorage.getItem('acc');
// A const 'amountMov' serve para armazenar a quantidade de movimentos que o player fará nas cartas.
const amountMov = [];


const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];


const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}


let firstCard = '';
let secondCard = '';


// Função que verifica se todas as cartas ja foram desabilitadas, parando o loop do tempo e redirecionando para outra pág, caso isso seja verdadeiro. Além disso, ela pega a quantidade total de movimentos e salva no localStorage.
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    const moviments = amountMov.reduce((x, acc) => x + acc, 0);
    localStorage.setItem('moviments', moviments);

    clearInterval(this.loop);

    window.location.replace('/pages/winner.html');
  }
}


// Função que pega o nome colocado nas cartas e compara se são iguais. Caso sejam, adiciona a class 'disabled-card' para desabilita-las e esvazia os let que armazena os card, mas caso não sejam, retira a class 'reveal-card', fazendo com que a resposta não seja mais visivel, e esvazia os let. Além disso, a cada chamada dessa função, é adicionado +1 na Array 'amountMov', que guarda a quantidade de movimentos realizados.
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
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


const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}


const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}


// Função que cria um loop de tempo, incrementando +1 a cada 1 segundo, e, ao mesmo tempo, pelo o 'timer.innerHTML', adiciona e atualiza esse valor increntado na tela. Além disso, ela salva e atualiza esse tempo no localStorage.
const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;

    localStorage.setItem(`time${accountant}`, currentTime);
  }, 1000);
}


// Comando que serve para executar as funções passadas nele somente quando a pág for totalmente carregada, a fim de evitar erros, já que alguns elementos das funções passadas necessitam que a parte html e as imagens carreguem primeiro. Além disso, pega o player digitado no login e adiciona na tela do jogo.
window.onload = () => {
  
  spanPlayer.innerHTML = localStorage.getItem(`player${accountant}`);
  startTimer();
  loadGame();
}
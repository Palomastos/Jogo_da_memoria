const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const dificulty =  localStorage.getItem('dificulty')


// A função CheckArray cria três arrays, verifica-as e retorna a arrays
// dos respectivos níveis (Easy, medium e hard)
const checkArray = () => {
  const charactersEasy = [
    'adicao',
    'baskara',
    'brioti',
    'comparacao',
    'priGrau',
    'funcAfim',
    'pitagora',
    'substituicao',
  ];

  const charactersMedium = [
    'complQuadrado',
    'crammer',
    'escalonamento',
    'idArcosDuplos',
    'idPitagorica',
    'leiCossenos',
    'leiSeno',
    'teoTales',
  ];

  const charactersHard = [
  'algebra',
  'edDiferenciais',
  'euler',
  'fermat',
  'fourier',
  'laplace',
  'newton',
  'valorMedio',
  ];
  
  if (dificulty== 'easy') {return charactersEasy}
  else if (dificulty=='medium') {return charactersMedium}
  else {return charactersHard}
}
const characters = checkArray()
console.log(characters)


const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

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
// A const CreateCard cria as cartas do jogo que recebe como argumento elementos armazenados em character,
//define suas faces (frontal e traseira) associada a uma imagem e cria um botão na parte da frente da carta.
// também define um evento de clique e atribui um atributo personalizado à carta, retorna a carta configurada.
const createCard = (character) => {
// const card cria um elemento de carta, onde a função createElement recebe  dois argumentos, uma div que é 
//um elemento em HTML usado para agrupar e organizar outros elementos e card que é a classe CSS 
//associada a esse elemento.

  const card = createElement('div', 'card');
  // Cria a parte frontal da carta (frente da carta)
  const front = createElement('div', 'face front');
   // Cria a parte traseira da carta (costas da carta)
  const back = createElement('div', 'face back');
  const block = createElement('div', 'face block');
  // Cria um novo elemento HTML do tipo button.
  const button = document.createElement('button');
  // A const button cria um botão com as classes 'face' e 'button' e o texto 'Dicas' dentro dele
  button.classList.add('face', 'button');
  button.textContent = 'Dicas'
  //appendChild adiciona o elemento front (parte da frente) na card (carta) que está sendo criada
  card.appendChild(front);
   //appendChild adiciona o elemento button (botão) na card (carta) que está sendo criada
  card.appendChild(button)
  //appendChild adiciona o elemento back (parte traseira) na card (carta) que está sendo criada
  card.appendChild(back);
  // card.appendChild(block);

  // Atribuindo funcionalidades e atributos a carta criada 
    // addEventListenner  É um método que permite que você associe um evento a um elemento HTML.
    // Neste caso, ele está recebendo 2 argumentos, o evento (click) é o clique do mouse  
    // e função revealCard que será chamada quando o evento de clique ocorrer. Portanto, esta linha 
    // de código é para chamar a função revealCard sempre que a carta for clicada.
  card.addEventListener('click', revealCard);
  //o setAttribute  permite definir um atributo personalizado em um elemento HTML. Neste caso ele 
  //recebe dois 2 argumentos, o data-character que é um atributo personalizado usado para armazenar
  // informações adicionais sobre o elemento caracter que possui informação sobre o personagem associado a essa carta.
  card.setAttribute('data-character', character)

  // O front.style.backgroundImage, define o caminho da imagem de fundo da face frontal da carta. De acordo
  //com o personagem e o nível de dificuldades associada a carta.
  front.style.backgroundImage = `url('../images/${dificulty}/${character}.jpg')`;
  // Indica que a função createCard está retornando um valor que é o elemento card (carta) que foi criado
  //  e configurado.
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

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

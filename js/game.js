const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const dificulty = localStorage.getItem('dificulty');


const character = localStorage.getItem('character')
const validation = localStorage.getItem('validation');
const accountant = localStorage.getItem('acc');
const amountMov = [];
const stopTime = [];


const removeBlurImg = () => {
  if (validation == true && character != undefined) {

  }
}


//
const checkArray = () => {
  const charactersEasy = [
    'Adição',
    'Bhaskara',
    'Briot Rufinni',
    'Metódo da Comparação',
    'Equação do Primeiro Grau',
    'Função Afim',
    'Teorema de Pitágoras',
    'Metódo da Substituição',
  ];

  const charactersMedium = [
    'completarquadrados',
    'regradecrammer',
    'metódodoescalonamento',
    'identidadedearcosduplos',
    'identidadetrigonometrica',
    'leidoscossenos',
    'leidossenos',
    'teoremadetales',
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

  if (dificulty== 'EASY') {
    return charactersEasy;
  }
  else if (dificulty=='MEDIUM') {
    return charactersMedium;
  }
  else {
    return charactersHard;
  }
}
const characters = checkArray();


const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}


let firstCard = '';
let secondCard = '';



const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');


  if (disabledCards.length === 16) {
    const moviments = amountMov.reduce((x, acc) => x + acc, 0);
    localStorage.setItem('moviments', moviments);
    stopTime.push(1);

    window.location.replace('/pages/winner.html');
  }
}


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

const openPagesDicas = (event) => {
  const htmlcolection = event;
  const element = htmlcolection[1];
  const id = element.id;

  localStorage.setItem('character', id);

  window.location.replace('/pages/quest.html');
}




const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    const button = document.createElement('button');

    button.classList.add('face', 'button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', `${character}`);
    button.setAttribute('onclick', `openPagesDicas(${character})`);
    button.textContent = 'Dicas';


    card.appendChild(front);
    card.appendChild(button);
    card.appendChild(back);
    //card.appendChild(block);
  
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
  
    front.style.backgroundImage = `url('/images/${dificulty}/${character}.jpg')`;

    return card;
  }



const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  const creaftingCard = ([characters, ...otherscharacter], acc=0)=> {
    if(acc==shuffledArray.length) {
      return;
    }
    else {
      const card = createCard(characters);
      grid.appendChild(card);
      return creaftingCard(otherscharacter, acc+1);
    }
  }
  creaftingCard(shuffledArray);
}


const startTimer = () => {
    if (stopTime.length == 1){
      return;
    }
    else {
      return setTimeout(()=> {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
        localStorage.setItem(`time${accountant}`, currentTime);
        startTimer();
      }, 1000);
    }
  }

  
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem(`player${accountant}`);
  startTimer();
  loadGame();
  removeBlurImg();
}

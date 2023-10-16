// Pegando a parte desejada do html pela a class.
const inputName = document.querySelector('.name-box');
const button = document.querySelector('.button-play');
const form = document.querySelector('.form-all');


// Pegando todos os inputs de dificuldade pela a tag.
const difEasy = document.querySelector('#easy');
const difMedium = document.querySelector('#medium');
const difHard = document.querySelector('#hard');


// Função que verifica a quantidade de caracteres para ativar e desativar o botão de play.
const validateName = (event) => {
  if (event.target.value.length > 3) {
    button.removeAttribute('disabled');
  } 
  else {
    button.setAttribute('disabled', '');
  }
}


// Função que verifica a dificuldade selecionada pelo o player, retornando a escolha.
const checkDificulty = () => {
  if (difEasy.checked == true) {
    return 'EASY';
  }
  else if (difMedium.checked == true) {
    return 'MEDIUM';
  }
  else {
    return 'HARD';
  }
}


// Função que verifica se já tem um espaço ocupado por algum player e retorna uma string que vai se tornar um novo espaço no localStorage. Além disso, ela adiciona +1 em um contador no localStorage. O 'contador' vai servir para armazenar em qual rodada o player está.
const createNewPlayer = (num=0) => {
  const player = localStorage.getItem(`player${num}`);

  if (player ==  null) {
    localStorage.setItem('acc', num);
    return `player${num}`;
  } 
  
  else {
    return createNewPlayer(num+1);
  }
}


// Função que redireciona para a pág do jogo. Além disso, retira o comportamento padrão do <form>. Por fim, salva (No localstorage) o player e a dificuldade selecionada para usos posteriores.
const redirectPage = (event) => {
  event.preventDefault();
  
  const newPlayer = createNewPlayer();
  const choosedDificulty = checkDificulty();
  localStorage.setItem('dificulty', choosedDificulty);
  localStorage.setItem(`${newPlayer}`, inputName.value);
  localStorage.setItem('validation', false);

  window.location.replace('/pages/game.html');
}


// Função que verifica se a tecla 'enter' foi pressionada.
const checkEnter = (event) => {
  if (event.key === 'Enter') {
    button.click();
  }
}


// Comando para quando a ação (1° Parâmetro) for executada, será executado uma derteminada ação (2° Parâmetro).
inputName.addEventListener('input', validateName);
form.addEventListener('submit', redirectPage);
button.addEventListener('keypress', checkEnter);


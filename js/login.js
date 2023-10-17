// Pegando a parte desejada do html pela a class.
const inputName = document.querySelector('.name-box');
const button = document.querySelector('.button-play');
const form = document.querySelector('.form-all');


// Pegando todos os inputs de dificuldade pela a tag.
const difEasy = document.querySelector('#easy');
const difMedium = document.querySelector('#medium');
const difHard = document.querySelector('#hard');


// Função que verifica a quantidade de caracteres necessária para ativar o botão play.
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


// Função que redireciona para a pág do jogo. Além disso, retira o comportamento padrão do <form>. Por fim, salva (No localstorage) o player, a dificuldade selecionada e uma validação para usos posteriores.
const redirectPage = (event) => {
  event.preventDefault();

  const choosedDifficulty = checkDificulty();
  localStorage.setItem('difficulty', choosedDifficulty);
  localStorage.setItem('player', inputName.value);

  window.location.replace('/pages/game.html');
}


// Função que verifica se a tecla 'enter' foi pressionada e, caso ela for, executa o evento de click.
const checkEnter = (event) => {
  if (event.key === 'Enter') {
    button.click();
  }
}


// Comando que adiciona uma verificação que, caso aconteça o que está no primeiro parâmetro, executará a função que está no segundo.
inputName.addEventListener('input', validateName);
form.addEventListener('submit', redirectPage);
button.addEventListener('keypress', checkEnter);
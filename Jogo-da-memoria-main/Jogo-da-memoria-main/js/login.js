/* Pegando a parte desejada do html pela a class. */
const inputName = document.querySelector('.name-box');
const button = document.querySelector('.button-play');
const form = document.querySelector('.form-all');


/* Pegando todos os inputs de dificuldade pela a tag. */
const difEasy = document.querySelector('#easy')
const difMedium = document.querySelector('#medium')
const difHard = document.querySelector('#hard')


/* Função que verifica a quantidade de caracteres para ativar e desativar o botão de play. */
const validateName = (event) => {
  if (event.target.value.length > 3) {
    button.removeAttribute('disabled')
  } else {
    button.setAttribute('disabled', '')
  }
}


/* Função que verifica a dificuldade selecionada pelo o player, retornando a escolha. */
const checkedDificulty = () => {
  if (difEasy.checked == true) { return 'easy'} 
    else if (difMedium.checked == true) {return 'medium'}  
      else {return 'hard'}
}


/* Função que redireciona da pág login para a pág do jogo. Além disso, retira o comportamento padrão do form que é recarregar a pág. Por fim, salva (No localstorage) o nome que o player digitou e a dificuldade selecionada para usos posteriores. */
const redirectPage = (event) => {
  event.preventDefault();
  
  const choosedDificulty = checkedDificulty()
  localStorage.setItem('dificulty', choosedDificulty)
  localStorage.setItem('player', inputName.value)
  //Ajuste para tornar o redirecionamento relativo para esta pasta, independente da maquina que o código está sendo executado.
  window.location.replace('./pages/game.html')  
}


/* Comando para quando a ação (1° Parâmetro) for executada, será executado uma derteminada ação (2° Parâmetro). */
inputName.addEventListener('input', validateName)
form.addEventListener('submit', redirectPage)
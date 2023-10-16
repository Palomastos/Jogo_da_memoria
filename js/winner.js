// A const 'accountant' verifica a rodada que o player está, servindo para auxiliar em varias funções e a organizar as informações.
const accountant = localStorage.getItem('accountant');


// Pegando os dados salvos no localStorage.
const dificultyStor = localStorage.getItem('dificulty');
const movimentsStor = localStorage.getItem('moviments');
const playerStor = localStorage.getItem(`player${accountant}`);


// Pegando os formulários.
const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');


// Pegando o local onde irá os dados salvos.
const player = document.querySelector('#name');
const dificulty = document.querySelector('#dificulty');
const moviments = document.querySelector('#moviments');


// Pegando a parte das posições do rank, onde irá o nome dos player.
const playerFirst = document.querySelector('.first');
const playerSecond = document.querySelector('.second');
const playerThree = document.querySelector('.three');



// A Array 'threeWinnerPlayers' vai armazenar os 3 player que ganharam com o menor N° de movimentos, servindo para adicionar, posteriormente, nas suas devidas posições.
const threeWinnerPlayers = [];


// Função que verifica a dificuldade e adiciona a cor correspondente.
const checkDificulty = () => {
    if (dificultyStor == 'EASY') {
        dificulty.classList.add('easy');
    } 
    
    else if (dificultyStor == 'MEDIUM') {
        dificulty.classList.add('medium');
    }

    else {
        dificulty.classList.add('hard');
    }
}
checkDificulty();


// Função que pega os tempos salvos no localStorage e os adiciona na Array 'accTimes'.
const pushTimes = (num=0) => {
    const timeVar = localStorage.getItem(`time${num}`);

    if (timeVar == null) {
        return;
    }
    else {
        timeStorage.push(timeVar)
        return pushTimes(num+1);
    }
}
pushTimes();


// Função que organiza a Array 'timeStorage' e retorna os 3 menores elementos.
const sortArray = ([...xs]) => {
    const arrayOrg = xs.sort();

    const top3time = [arrayOrg[0], arrayOrg[1], arrayOrg[2]];
    return top3time;
}


// Função que verifica a igualdade entre cada elemento da Array retornada pela 'sortArray' e cada time salvo no localStorage, a fim de achar a numeração do time correspondente e adicionar o player de mesma numeração na Array 'positionsPlayer'.
const checkWinnerPlayer = (num=0, acc=0) => {
    const newArray = sortArray(timeStorage);
    const time = localStorage.getItem(`time${num}`);
    const player = localStorage.getItem(`player${num}`);
    
    if (time == null) {
        return;
    } 
    else if (newArray[acc] == time) {
        threeWinnerPlayers.push(player)
        return checkWinnerPlayer(num=0, acc+1);
    } 
    else {
        return checkWinnerPlayer(num+1, acc);
    }
}
checkWinnerPlayer();


// Função que pega os player já organizado da Array 'positionsPlayer' e os adiciona em suas respectivas posições.
const setNameRank = () => {
    if (threeWinnerPlayers[0] != null) {
        playerFirst.innerHTML = threeWinnerPlayers[0];
    } 
    else if (threeWinnerPlayers[1] != null) {
        playerSecond.innerHTML = threeWinnerPlayers[1];
    }
    else if (threeWinnerPlayers[2] != null) {
        playerThree.innerHTML = threeWinnerPlayers[2];
    } 
}


// Função que serve para redirecionar o player para a tela de login para recomeçar. Além disso, ela desabilita o comportamento padrão do <form>.
const redirectPage = (event) => {
    event.preventDefault();

    window.location.replace('../pages/index.html');
}


// Função que serve para limpar os dados que estão armazenados no localStorage, recarregando a pág após isso Além disso, ela desabilita o comportamento padrão do <form>.
const clearStorage = (event) => {
    event.preventDefault();

    localStorage.clear();
    location.reload();
}


// Adcionando uma verificação para quando o form for enviado, executar a função que está no segundo parâmetro.
form1.addEventListener('submit', redirectPage);
form2.addEventListener('submit', clearStorage);


// Comnando para atrasar o carregamento do que foi passado para ele, sendo carregado somente quando todos os outros arquivos forem carregados, a fim de evitar erros no carregamento dos dados.
window.onload = () => {
    moviments.innerHTML = movimentsStor;
    dificulty.innerHTML = dificultyStor;
    player.innerHTML = playerStor;

    setNameRank();
}
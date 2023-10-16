// Pegando essa parte do html para adicionar uma imagem no fundo.
const boximg = document.querySelector('.boximg');

// Pegando os botões para adicionar um evento ao clicar neles.
const buttonQ1 = document.querySelector('#btn-q1');
const buttonQ2 = document.querySelector('#btn-q2');
const buttonQ3 = document.querySelector('#btn-q3');
const buttonQ4 = document.querySelector('#btn-q4');

// Pegando a parte do texto que aparecerá nos botões, vão ser usados para modificar as palavras que vão aparecer nos botões.
const spanQ1 = document.querySelector('#spanq1');
const spanQ2 = document.querySelector('#spanq2');
const spanQ3 = document.querySelector('#spanq3');
const spanQ4 = document.querySelector('#spanq4');

// Pegando o nome do card da outra página e a dificuldade escolhida.
const selectedCardName = localStorage.getItem('character');
const dificulty = localStorage.getItem('dificulty');

// Função criada para selecionar a imagem da dica correspondente ao card selecionado.
const selectImg = (CardName, Dificulty) => {
    boximg.style.backgroundImage = `url('/images/${Dificulty}/Dicas/${CardName}.jpg')`;
}
selectImg(selectedCardName, dificulty);


// Função criada para retornar uma lista de acordo com a dificultade escolhida. Essa lista vai conter os nomes dos card.
const selectArray = () => {
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


    if (dificulty == 'MEDIUM') {
        return cardsNameMedium;
    }
}


// Função que serve para embaralhar os nomes dos cards e coloca-lós nos botões de forma que sempre estejam em uma nova posição e que não tenha opções repetidas. Além disso, garante que sempre vai haver a resposta certa na tela.
const shufflesCardNames = () => {
    const cardsName = selectArray();
    const copyCardsName = [...cardsName];
    const shuffledArray = copyCardsName.sort(() => Math.random() - 0.5);
    const indexNameTarget = shuffledArray.indexOf(`${selectedCardName}`);
   
    // Função que pega indexs aleatórios entre 0 a 10, servindo para sempre ter uma aleatóriedade na disposição dos nomes que vão aparecer nos botões. É ela a responsável por adicionar os nomes nos botões de forma aleatória. Além disso, pega o index do nome do card que foi selecionado na outra tela para adiciona-lo como uma opção de resposta.
    const addShuffledNamesButton = ([...names]) => {
        const index1 = Math.floor(Math.random()*10);
        const index2 = Math.floor(Math.random()*10);
        const index3 = Math.floor(Math.random()*10);

        if (index1 == indexNameTarget || index2 == indexNameTarget || index3 == indexNameTarget || index1 == index2 || index1 == index3 || index2 == index3 || index1 >= 8 || index2 >= 8 || index3 >= 8) {
            return addShuffledNamesButton(names);
        }
        else if (indexNameTarget < 2) {
            spanQ1.innerHTML = shuffledArray[indexNameTarget];
            spanQ2.innerHTML = shuffledArray[index1];
            spanQ3.innerHTML = shuffledArray[index2];
            spanQ4.innerHTML = shuffledArray[index3];
            return;
        } 
        else if (indexNameTarget < 4) {
            spanQ1.innerHTML = shuffledArray[index1];
            spanQ2.innerHTML = shuffledArray[indexNameTarget];
            spanQ3.innerHTML = shuffledArray[index2];
            spanQ4.innerHTML = shuffledArray[index3];
            return;
        }
        else if (indexNameTarget < 6) {
            spanQ1.innerHTML = shuffledArray[index1];
            spanQ2.innerHTML = shuffledArray[index2];
            spanQ3.innerHTML = shuffledArray[indexNameTarget];
            spanQ4.innerHTML = shuffledArray[index3];
            return;
        }
        else if (indexNameTarget < 8) {
            spanQ1.innerHTML = shuffledArray[index1];
            spanQ2.innerHTML = shuffledArray[index2];
            spanQ3.innerHTML = shuffledArray[index3];
            spanQ4.innerHTML = shuffledArray[indexNameTarget];
            return;
        } 
    } 
    addShuffledNamesButton(shuffledArray);
}  


const redirectPage = (button) => {
    if (button == 'button1') {
        const buttontext = spanQ1.innerHTML;
        if (buttontext == selectedCardName) {
            alert('Você acertou! A imagem foi desbloqueada.');
            localStorage.setItem('validation', true);
            //return window.location.replace('/pages/game.html');
        }
        else {
            alert('Você errou! Tente novamente.');
            //return window.location.replace('/pages/game.html');
        }
    }
    else if (button == 'button2') {
        const buttontext = spanQ2.innerHTML;
        if (buttontext == selectedCardName) {
            alert('Você acertou! A imagem foi desbloqueada.');
            localStorage.setItem('validation', true);
            //return window.location.replace('/pages/game.html');
        }
        else {
            alert('Você errou! Tente novamente.');
            //return window.location.replace('/pages/game.html');
        }
    }
    else if (button == 'button3') {
        const buttontext = spanQ3.innerHTML;
        if (buttontext == selectedCardName) {
            alert('Você acertou! A imagem foi desbloqueada.');
            localStorage.setItem('validation', true);
            //return window.location.replace('/pages/game.html');
        }
        else {
            alert('Você errou! Tente novamente.');
            //return window.location.replace('/pages/game.html');
        }
    }
    else if (button == 'button4') {
        const buttontext = spanQ4.innerHTML;
        if (buttontext == selectedCardName) {
            alert('Você acertou! A imagem foi desbloqueada.');
            localStorage.setItem('validation', true);
            //return window.location.replace('/pages/game.html');
        }
        else {
            alert('Você errou! Tente novamente.');
            //return window.location.replace('/pages/game.html');
        }
    }
}


// Atribuindo o atributo 'onclick' para chammar a função que está no segundo parâmetro assim que o botão for clicado. Foi passado a numeração do botão na função para identificar qual botão foi clicado.
buttonQ1.setAttribute('onclick', `redirectPage('button1')`);
buttonQ2.setAttribute('onclick', `redirectPage('button2')`);
buttonQ3.setAttribute('onclick', `redirectPage('button3')`);
buttonQ4.setAttribute('onclick', `redirectPage('button4')`);



// Comando usado para fazer o carregamento da função passada apenas depois de todo conteúdo for carregado, evitando alguns erros indesejados.
window.onload = () => {
    shufflesCardNames();
}
const grid = document.querySelector('.grid');
const headerJogo = document.querySelector('.jogador');
const tempo = document.querySelector('.tempo');
const pont = document.querySelector(".pont")
let pontuacao = 0;
const personagens = [
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

const createElement = (tag, classe) => {
  const elemento = document.createElement(tag);
  elemento.className = classe;
  return elemento;
}

let primeiroCard = '';
let segundoCard = '';

const finalizarJogo = () => {
    setTimeout(() => {
  const cardsDesativados = document.querySelectorAll('.desativarCard');

  if (cardsDesativados.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${headerJogo.innerHTML}! Seu tempo foi de: ${tempo.innerHTML} e o seu score foi de ${pont.value}`);
  }
}, 500);
  
}

const checarCards = () => {
  const primeiroPersonagem = primeiroCard.getAttribute('data-personagem');
  const segundoPersonagem = segundoCard.getAttribute('data-personagem');

  if (primeiroPersonagem === segundoPersonagem) {

    primeiroCard.firstChild.classList.add('desativarCard');
    segundoCard.firstChild.classList.add('desativarCard');

    primeiroCard = '';
    segundoCard = '';

    pontuacao += 100
    pont.innerHTML = pontuacao

    finalizarJogo();

  } else {
    setTimeout(() => {

      primeiroCard.classList.remove('revelarCard');
      segundoCard.classList.remove('revelarCard');

      primeiroCard = '';
      segundoCard = '';

      if(pontuacao!== 0){
        pontuacao -= 50
        pont.innerHTML = pontuacao
      }

      


    }, 500);
  }

}

const revelarCard = ({ target }) => {

  if (target.parentNode.className.includes('revelarCard')) {
    return;
  }

  if (primeiroCard === '') {

    target.parentNode.classList.add('revelarCard');
    primeiroCard = target.parentNode;

  } else if (segundoCard === '') {

    target.parentNode.classList.add('revelarCard');
    segundoCard = target.parentNode;

    checarCards();

  }
}

const createCard = (personagem) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('images/${personagem}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revelarCard);
  card.setAttribute('data-personagem', personagem)

  return card;
}

const carregarJogo = () => {
  const personagensDuplicados = [...personagens, ...personagens];

  const personagensEmbaralhados = personagensDuplicados.sort(() => Math.random() - 0.5);

  personagensEmbaralhados.forEach((personagem) => {
    const card = createCard(personagem);
    grid.appendChild(card);
  });
}

const começarTempo = () => {

  this.loop = setInterval(() => {
    const tempoCorrido = +tempo.innerHTML;
    tempo.innerHTML = tempoCorrido + 1;
  }, 1000);

}

window.onload = () => {
  headerJogo.innerHTML = localStorage.getItem('jogador');
  começarTempo();
  carregarJogo();
}
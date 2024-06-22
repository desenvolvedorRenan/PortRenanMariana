import perguntas from "./questoes.js";

const questao = document.querySelector(".questao");
const respostas = document.querySelector(".respostas");
const perguntaIndice = document.querySelector(".qtd");
const final = document.querySelector(".final");
const btnReiniciar = document.querySelector(".final button");
const audio = new Audio("arquivo.mp3");
const audio2 = new Audio("arquivo2.mp3");
const imagem = document.querySelector(".imagem");

let indice = 0;
let score = 0;
let perguntasCorretas = 0;

btnReiniciar.addEventListener("click", reiniciarJogo);

function reiniciarJogo() {
  final.style.display = "none";
  indice = 0;
  score = 0;
  carregarPergunta();
}

function perguntaOpcao(e) {
  const btnSelecionado = e.target;
  const correta = btnSelecionado.dataset.correta === "true";
  testarResposta(btnSelecionado, correta);
  score += correta ? 100 : 0;
  perguntasCorretas += correta ? 1 : 0;
  correta ? audio.play() : audio2.play();

  setTimeout(() => {
    indice < perguntas.length ? carregarPergunta() : terminarJogo();
  }, 1000);
}

function testarResposta(btnSelecionado, correta) {
  const cor = correta ? "#40e0d0" : "#9e243a";
  btnSelecionado.style.backgroundColor = cor;
  respostas.querySelectorAll("button").forEach((btn) => {
    btn.disabled = true;
  });
}

function terminarJogo() {
  final.style.display = "flex";
  final.querySelector(".resultado").textContent = `Seu score: ${score}`;
  if (perguntasCorretas >= 0 && perguntasCorretas <= 3) {
    imagem.innerHTML = `<img src="pontuação ruim.jpg" alt="">`;
  } else if (perguntasCorretas >= 4 && perguntasCorretas <= 7) {
    imagem.innerHTML = ` <img src="pontuação mais ou menos.png" alt="">`;
  } else {
    imagem.innerHTML = ` <img src="pontuação boa.jpg" alt="">`;
  }
}

function carregarPergunta() {
  const { pergunta, alternativas } = perguntas[indice];
  perguntaIndice.textContent = `${indice + 1}/${perguntas.length}`;
  questao.textContent = pergunta;
  respostas.innerHTML = "";

  embaralhar(alternativas).forEach(({ opcoes, correta }) => {
    const button = document.createElement("button");
    button.classList.add("opcoes");
    button.dataset.correta = correta;
    button.innerHTML = opcoes;
    button.addEventListener("click", perguntaOpcao);
    respostas.appendChild(button);
  });

  indice++;
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

carregarPergunta();
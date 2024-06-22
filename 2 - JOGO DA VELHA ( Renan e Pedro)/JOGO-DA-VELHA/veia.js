let tabuleiro = ["", "", "", "", "", "", "", "", ""]
let marcadorAtual = "X"
let jogoTerminou = false

function fazerJogada(indice) {
    if (vencedor() === true || tabuleiro[indice] !== "") {
        return;
    }

    tabuleiro[indice] = marcadorAtual;
    let quadrado = document.getElementById(`quadrado${indice}`);
    quadrado.innerHTML = `<img src="${marcadorAtual === 'X' ? '../JOGO-DA-VELHA/imagemJavascriptVelha.png' : '../JOGO-DA-VELHA/imagemHtmlVelha.jpg'}" alt="${marcadorAtual}">`;

    if (vencedor() === true) {
        let display = document.querySelector(".display");
        display.innerText = `O jogador ${marcadorAtual} venceu`;
        jogoTerminou = true;
    } else if (!tabuleiro.includes("")) {
        let display = document.querySelector(".display");
        display.innerText = `Empate!!`;
        jogoTerminou = true;
    } else {
        marcadorAtual = marcadorAtual === "X" ? "O" : "X";
        let display = document.querySelector(".display");
        display.innerText = `É a vez do jogador ${marcadorAtual}`;
    }
}


function vencedor() {
    let jogadasVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ]
    for (let indice = 0; indice < jogadasVencedoras.length; indice++) {
        let a = jogadasVencedoras[indice][0]
        let b = jogadasVencedoras[indice][1]
        let c = jogadasVencedoras[indice][2]

        if (tabuleiro[a] !== "" && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]) {

            return true
        }
    }
    return false
}

function resetar() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""]
    marcadorAtual = "X"
    jogoTerminou = false

    let display = document.querySelector(".display")
    display.innerText = `É a vez do jogador ${marcadorAtual}`

    for (let indice = 0; indice <= 8; indice++) {
        const quadrado = document.getElementById(`quadrado${indice}`);
        quadrado.innerHTML = "";
    }
}
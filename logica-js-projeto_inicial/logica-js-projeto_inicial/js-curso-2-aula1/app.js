let numeroSecreto = gerarNumeroAleatorio();
let tentetivas = 1;

function exibirTextoNaTela(tag, texto) {
    let Campo = document.querySelector(tag);
    Campo.innerHTML = texto;
}

exibirTextoNaTela('h1', 'jogo do número secreto');
exibirTextoNaTela('p', 'escolha um numero entre 1 e 10');

function VerificarChute() {
    let chute = document.querySelector('input').value;
   
    if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!'); 
    let palavraTentativa = etentativas > 1 ? 'tentativas' : 'tentativa' 
    let mensagemTentativas = `Você descobriu o número secreto com ${tentetivas} ${palavraTentativa}`;
    exibirTextoNaTela('p', 'Você descobriu o número secreto com !');
    document.getElementById('reiniciar').removeAttribute
    ('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
   return parseInt (Math.random() * 10 + 1);
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
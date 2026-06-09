alert('Boas vindas ao nosso site!');
let nomeUsuario = 'luna';
console.log('Olá, ' + nomeUsuario + ' seja bem vindo(a)!');
let idadeUsuario = "25";
let numeroDeVendas = 50;
let SaldoDisponivel = 1000;

alert('Erro! Preencha todos os campos');
let mensagemErro = 'Erro!, Preencha todos os campos';
console.log(mensagemErro);

let nome = prompt('qual é o seu nome?');

// se nome for igual a nomeUsuario, exibir mensagem de boas vindas
if (nome === nomeUsuario) {
    alert('Olá, ' + nomeUsuario + ' seja bem vindo(a)!');
} 

let idade = prompt('qual é a sua idade?');
// se idade for maior ou igual a 18, exibir mensagem de acesso permitido
if (idade >= 18) {
    alert('Pode tirar a habilitação!');
} else {
    alert('Desculpe, você não tem idade sufuciente para tirar a habilitação!');
}


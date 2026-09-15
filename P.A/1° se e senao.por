programa {
  funcao inicio() {
    
    real Num01, Num02, Soma, Subtracao, Multiplicacao, Divisao
inteiro Opcao

escreva ("PROGRAMA DE CÁLCULOS DAS SOMAS BÁSICAS")

escreva(" DIGITE O PRIMEIRO NÚMERO: ")
leia(Num01)

escreva(" DIGITE O SEGUNDO NÚMERO: ")
leia(Num02)

escreva(" QUAL TIPO DE OPERAÇÃO VOCÊ DESEJA, SOMA- Digite-> 1, SUBTRAÇÃO- Digite-> 2, DIVISÃO- Digite-> 3 OU MULTIPLICAÇÃO- Digite -> 4? ")
leia(Opcao)

se (Opcao == 1) {
Soma=Num01+Num02
escreva(" -O CALCULO DA SOMA É ")
escreva (Soma)
}
senao se (Opcao == 2) {
Subtracao=Num01-Num02
escreva(" O CALCULO DA SUBTRAÇÃO É ") 
}
senao se (Opcao == 3) {
Divisao=Num01/Num02
 escreva(" -O CALCULO DA DIVISAO E ")
escreva (Divisao)
}

senao se (Opcao == 4){
  Multiplicacao=Num01*Num02
  escreva(" - O CALCULO DA MULTIPLICÃO É ")
  escreva(Multiplicacao)

}
  }
}

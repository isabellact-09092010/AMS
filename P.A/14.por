programa {
  funcao inicio() {
    real Preco_Da_Gasolina, Litros, Total

    escreva("qual o preço do litro da gasolina?: ")
    leia(Preco_Da_Gasolina)

    escreva("quantos litros foi colocado: ")
    leia(Litros)

    Total = Litros * Preco_Da_Gasolina

    escreva("O total a Pagar é de: ", Total)    
  }
}

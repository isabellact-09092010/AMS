
programa {
  funcao inicio() {
    real valor, desconto, total
    
    escreva("Digite o valor total da compra: ")
    leia(valor)

    desconto = valor * 0.10
    total = valor - desconto

    escreva("Valor de desconto: R$ ", desconto, "\n")
    escreva("Total a pagar: R$ ", total)
  }
}
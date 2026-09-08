programa {
  funcao inicio() {
    real SalarioAtual, Aumento, NovoSalario

    escreva("Digite seu salario atual: ")
    leia(Salario_atual)

    Aumento = SalarioAtual * 0.8
    NovoSalario = SalarioAtual - Aumento

    escreva("\nSalarioAtual: R$ ", NovoSalario)
		escreva("\nAumento aplicado (8%): R$ ", Aumento)
		escreva("\nTotal a pagar em dinheiro: R$ ", NovoSalario)

  }
}

programa {
  funcao inicio() {
    real notas[5]

    para (inteiro i = 0; i < 5; i++)
{
    escreva("Digite a nota do aluno ", i + 1, ": ")
    leia (notas[i])
}
escreva("\nNOTAS INFORMADAS\n")

para (inteiro i = 0; i < 5; i++)
{
  escreva("Aluno ", i + 1, ": ", notas[i], "\n")
}
  }
}

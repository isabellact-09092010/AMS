programa
{
	funcao inicio()
	{

		real valorTotal, valorComDesconto, desconto

		escreva("Digite o valor total das peças compradas (R$): ")
		leia(valorTotal)

		desconto = valorTotal * 0.10
		valorComDesconto = valorTotal - desconto

		escreva("\nValor original: R$ ", valorTotal)
		escreva("\nDesconto aplicado (10%): R$ ", desconto)
		escreva("\nTotal a pagar em dinheiro: R$ ", valorComDesconto)
	}
}

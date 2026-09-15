programa {
  funcao inicio() {
   real Distancia, Litros, Consumo_medio
  
  escreva("Digite a distância percorrida (em km): ")
	leia(Distancia)

  escreva("Digite a quantidade de litros utilizados: ")
	leia(Litros)

  se (Litros > 0)
		{
			Consumo_medio = Distancia / Litros
			
			escreva("\nO consumo médio do veículo é de: ", Consumo_medio, " km/l\n")
		}
		senao
		{
			escreva("\nA quantidade de litros deve ser maior que zero para realizar o cálculo.\n")
		}
  }
}

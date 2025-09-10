import readline from 'readline';

class Leitura {
   constructor(
      public mesLeitura: string,
      public leituraSanepar: number,
      public mediaAlunosMes: number
   ) {}

   public getLeituraSaneparConvertida(): number {
      return this.leituraSanepar * 1000;
   }

   public getConsumoPorAlunosMensal(): number {
      return this.getLeituraSaneparConvertida() / this.mediaAlunosMes;
   }

   public getConsumoDiarioPorAluno(): number {
      return this.getConsumoPorAlunosMensal() / 30;
   }
}

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

function ask(question: string): Promise<string> {
   return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
   const dadosLeituras: Leitura[] = [];
   const quantidadeDeLeiturasQueroCadastrar: number = 3;

   for (let index = 0; index < quantidadeDeLeiturasQueroCadastrar; index++) {
      const nomeMesLeitura: string = await ask(`Digite o Mes da Leitura ${index + 1}: `);
      const valorLeituraSanepar = parseFloat(await ask(`Digite o valor da Leitura Sanepar ${index + 1}: `));
      const valorMediaAlunos = parseFloat(await ask(`Digite o valor de MediaAlunos ${index + 1}: `));

      const novaLeitura = new Leitura(nomeMesLeitura, valorLeituraSanepar, valorMediaAlunos);
      dadosLeituras.push(novaLeitura);
   }

   console.table(dadosLeituras.map(dados => ({
      Mes_Leitura: dados.mesLeitura,
      Leitura_Sanepar: dados.leituraSanepar + "M",
      Qtd_Alunos_Mes: dados.mediaAlunosMes,
      Litros_Consumidos: dados.getLeituraSaneparConvertida()+ "L",
      Consumo_Mensal_Alunos: dados.getConsumoPorAlunosMensal().toFixed(2)+ "L",
      Consumo_Diario_Alunos: dados.getConsumoDiarioPorAluno().toFixed(2) + "L",
   })));

   rl.close();
})();

class CaixaDaLanchonete {
    
    constructor() {
        this.cardapio = {
          cafe: { descricao: "Café", valor: 3.00 },
          chantily: { descricao: "Chantily (extra do Café)", valor: 1.50, extra:true },
          suco: { descricao: "Suco Natural", valor: 6.20 },
          sanduiche: { descricao: "Sanduíche", valor: 6.50 },
          queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00, extra: true },
          salgado: { descricao: "Salgado", valor: 7.25 },
          combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
          combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };
    
        this.formasPagamento = ["dinheiro", "debito", "credito"];
      }
    
      calcularValorDaCompra(formaDePagamento, itens) {
        // Verificar se a forma de pagamento é válida
        if (!this.formasPagamento.includes(formaDePagamento)) {
          return "Forma de pagamento inválida!";
        }
    
        // Verificar se o array de itens está vazio
        if (!itens || itens.length === 0) {
          return "Não há itens no carrinho de compra!";
        }
    
        let valorTotal = 0;    

        // Processar cada item no pedido e separar 
        for (const itemString of itens) {
          const [codigo, quantidade] = itemString.split(",");
          const itemInfo = this.cardapio[codigo];
    
          // Verificar se o código do item é válido
          if (!itemInfo) {
            return "Item inválido!";
          }
    
          // Convertendo a quantidade para um número inteiro que foi separado na string a cima
          const quantidadeInt = parseInt(quantidade);
    
          // Verificar se a quantidade é válida
          if (isNaN(quantidadeInt) || quantidadeInt <= 0) {
            return "Quantidade inválida!";
          }
          
          // Verificar se é um item principal ou extra
          if (itemInfo.extra) {
            if (codigo === "queijo" && itens.map(item => item.split(',')[0]).includes("sanduiche")) {
                valorTotal += itemInfo.valor * quantidadeInt;
            } else if (codigo === "Chantily" && itens.map(item => item.split(',')[0]).includes("cafe")) {
                valorTotal += itemInfo.valor * quantidadeInt;
            } else {
                return "Item extra não pode ser pedido sem o principal";
            }
            
            } 
            else {
             // Não adicionar o valor dos combos ao total
              if (!codigo.startsWith("combo")) {
                  // Calcular o valor total do item
                  valorTotal += itemInfo.valor * quantidadeInt;
                
                 }
           }
        }
    
        // Aplicar desconto ou acréscimo conforme a forma de pagamento
        if (formaDePagamento === "dinheiro") {
          valorTotal *= 0.95; // 5% de desconto
        } else if (formaDePagamento === "credito") {
          valorTotal *= 1.03; // 3% de acréscimo
        }
    
        // Retornar o valor total formatado com 2 casas decimais
        return "R$ " + valorTotal.toFixed(2).replace('.', ',');
      }
    }

  


export { CaixaDaLanchonete };

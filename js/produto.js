class produto {
    id
    nome
    preco
    imagem
    constructor(nome ,preco, imagem, id) {
        this.nome = nome;
        this.preco = parseFloat(preco).toFixed(2);
        this.imagem = imagem
        this.id = id
    }

    toString(){
        return `
            <div class="produto">
                <header class="produto__sup">
                    <img src="${this.imagem}" alt="imagem do produto" class="produto__img">
                    <p class="produto__nome">${this.nome}</p>
                </header>
                <footer class="produto__down">      
                    <p class="produto__preco">R$${this.preco}</p>
                    <img data-id="${this.id}" src="images/lixeira.svg" alt="lixeirinha" id="produtoExcluir" class="produto__excluir"></button>
                </footer>
            </div>
            `;
    }

}

export default produto;
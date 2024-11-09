import Produto from "./produto.js";

class estoque {
    url
    produto
    constructor() {
        this.url = "http://localhost:3000/";
        this.produto = Produto;
    }

    async conectaApi(endPoint){
        const response = await fetch(this.url.concat(endPoint));
        const resConvert = await response.json();
        return resConvert;
    }

    async carregaProdutos(menuProdutos, produtos){
        produtos.forEach(element => {
            const prod = new this.produto(element["nome"], element["preco"], element["imagem"], element["id"]);
            menuProdutos.insertAdjacentHTML("beforeend", `${prod}`);
        });
    }

    async criaProduto(produto){
        const conexao = await fetch(this.url.concat("produtos"), {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "X-Custom-Header": "ProcessThisImmediately"
            }),
            body: JSON.stringify({
                nome: produto.nome,
                preco: produto.preco,
                imagem: produto.imagem,
            }),
            mode: "cors",
            });

        const conexaoJson = await conexao.json();

        return conexaoJson;
    }

    async exclueProduto(id){
        const conexao = await fetch(this.url.concat(`produtos/${id}`), { 
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
            mode: "cors",
            });
    
        const conexaoJson = await conexao.json();

        return conexaoJson;
    
    }

}

export default estoque;
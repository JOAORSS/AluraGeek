import Produto from "./produto.js";

class estoque {
    url
    produto
    constructor() {
        this.url = "http://localhost:3000/";
        this.produto = Produto;
    }

    async conectaApi(endPoint){

        document.getElementById("produtos").insertAdjacentHTML("beforeend", "<div class='flipping'></div>");

        try {
            const response = await fetch(this.url.concat(endPoint));
            if (!response.ok){
                throw new Error('Erro ao carregar os produtos');
            } 
            const resConvert = await response.json();
            return resConvert;
            
        } catch (error) {
            document.querySelector(".flipping").remove();
            document.querySelector(".adicionar-produto__buttons").classList.add("buttons--disabled");
            document.getElementById("submit").setAttribute("disabled", "true");
            document.getElementById("limpar").setAttribute("disabled", "true");
            document.getElementById("produtos").insertAdjacentHTML("beforeend", "<h2 class='erro-msg'>Tente novamente mais tarde</h2>");
        }
    }

    async carregaProdutos(menuProdutos, produtos){
        document.querySelector(".flipping").remove();
        if (produtos.length >= 1){
            produtos.forEach(element => {
                const prod = new this.produto(element["nome"], element["preco"], element["imagem"], element["id"]);
                menuProdutos.insertAdjacentHTML("beforeend", `${prod}`);
            });

        } else {
            menuProdutos.insertAdjacentHTML("beforeend", "<h2 class='erro-msg'>Nenhum produto disponivel</h2>");
        }
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
import Estoque from "./estoque.js";

const estoque = new Estoque;

const menuProdutos = document.getElementById("produtos");
const formAdicionar = document.querySelector("[data-form]");
const formLimpar = document.getElementById("adicionarProduto-limpar");
const produtos = await estoque.conectaApi("produtos");

// carrega os produtos
estoque.carregaProdutos(menuProdutos, produtos);

// listener adicionar produto
formAdicionar.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    const prod = new estoque.produto(nome, preco, imagem);
    estoque.criaProduto(prod);
})

// listener limpar form
formLimpar.addEventListener("click", () =>{
    document.querySelector("[data-nome]").value = "";
    document.querySelector("[data-preco]").value = "";
    document.querySelector("[data-imagem]").value = "";
})

// listener para excluir
menuProdutos.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("produto__excluir")) {
        const id = e.target.closest("#produtoExcluir").getAttribute("data-id");
        estoque.exclueProduto(id);
    }

})

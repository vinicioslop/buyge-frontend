const fetchUrl = "https://localhost:7240/api";

const carregarProduto = async (idProduto) => {
    const response = await fetch(`${fetchUrl}/produtos/${idProduto}`, {
        method: "GET",
        mode: "cors",
    });
    const produto = await response.json();
    carregarImagens(produto);
};

const carregarImagens = async (produto) => {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${produto.cdProduto}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const imagens = await response.json();

    carregarCategorias(produto, imagens);
};

const carregarCategorias = async (produto, imagens) => {
    const response = await fetch(
        `${fetchUrl}/categorias/${produto.fkCdCategoria}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const categoria = await response.json();
    montarProduto(produto, imagens, categoria);
};

const montarProduto = (produto, imagens, categoria) => {
    console.log(produto, imagens);

    document.querySelector(".caminho").innerText =
        "Início > " + categoria.nmCategoria;

    document.querySelector(".imagem-full").src = imagens[0].imgProdutoLink;

    const miniaturas = document.querySelector(".miniaturas");

    imagens.forEach((imagem) => {
        let img = document.createElement("img");
        img.src = imagem.imgProdutoLink;

        miniaturas.append(img);
    });

    document.querySelector(".titulo").innerText = produto.nmProduto;
    document.querySelector(".atual").innerText = "R$ " + produto.vlProduto;
    document.querySelector(".parcelas").innerText =
        "em 3x R$ " + produto.vlProduto / 3;
    document.querySelector(".texto").innerText = produto.dsProduto;
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    carregarProduto(idProduto);
});

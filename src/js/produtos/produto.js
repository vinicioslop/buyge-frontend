const fetchUrl = "https://localhost:7240/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

async function carregarProduto(idProduto) {
    const response = await fetch(`${fetchUrl}/produtos/${idProduto}`, {
        method: "GET",
        mode: "cors",
    });

    const status = await response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            const resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);
            return status;
    }
}

async function carregarImagens(idProduto) {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${idProduto}/todas`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const status = await response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            const resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);
            return status;
    }
}

async function carregarCategorias(idCategoria) {
    const response = await fetch(`${fetchUrl}/categorias/${idCategoria}`, {
        method: "GET",
        mode: "cors",
    });

    const status = await response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            const resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);
            return status;
    }
}

async function montarProduto(idProduto) {
    const produtoResposta = await carregarProduto(idProduto);
    if (produtoResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + produtoResposta.status
        );
        return;
    }
    const produto = produtoResposta.dados;

    const categoriasResposta = await carregarCategorias(produto.fkCdCategoria);
    if (categoriasResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " +
                categoriasResposta.status
        );
        return;
    }
    const categoria = categoriasResposta.dados;

    const imagensResposta = await carregarImagens(produto.cdProduto);
    if (imagensResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + imagensResposta.status
        );
        return;
    }
    const imagens = imagensResposta.dados;

    console.log(imagens);

    document.querySelector(".caminho").innerText =
        "Início > " + categoria.nmCategoria;

    document.querySelector(".imagem-full").src = imagens[0].imgProdutoLink;

    const miniaturas = document.querySelector(".miniaturas");

    imagens.forEach((imagem) => {
        let img = document.createElement("img");
        img.src = imagem.imgProdutoLink;

        miniaturas.append(img);
    });

    document.querySelector(".titulo-produto").innerText = produto.nmProduto;
    document.querySelector(".atual").innerText = mascaraPreco(
        produto.vlProduto
    );
    document.querySelector(".parcelas").innerText =
        "em 3x R$ " + mascaraPreco(produto.vlProduto / 3);
    document.querySelector(".texto").innerText = produto.dsProduto;
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get("idProduto");

    montarProduto(idProduto);
});

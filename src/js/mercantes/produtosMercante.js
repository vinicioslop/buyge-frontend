const fetchUrl = "https://localhost:7240/api";

const carregarProdutos = async (idMercante) => {
    const response = await fetch(
        `${fetchUrl}/produtos/mercante/${idMercante}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const produtos = await response.json();
    carregarImagems(idMercante, produtos);
};

const carregarImagems = async (idMercante, produtos) => {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagem`, {
        method: "GET",
        mode: "cors",
    });
    const produtoImagens = await response.json();
    carregarCategorias(idMercante, produtos, produtoImagens);
};

const carregarCategorias = async (idMercante, produtos, produtoImagens) => {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
    });
    const categorias = await response.json();
    carregarMercante(idMercante, produtos, produtoImagens, categorias);
};

const carregarMercante = async (
    idMercante,
    produtos,
    produtoImagens,
    categorias
) => {
    const response = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "GET",
        mode: "cors",
    });
    const mercante = await response.json();
    montarCartoes(produtos, produtoImagens, categorias, mercante);
};

const removerProduto = async (idProduto) => {
    await fetch(`${fetchUrl}/produtos/${idProduto}`, {
        method: "DELETE",
        mode: "cors",
    });
};

const enviarRemoverProduto = (idProduto) => {
    removerProduto(idProduto);

    window.location.reload(true);
};

const editarProduto = function (idProduto) {
    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    window.location =
        "/src/pages/produtos/editarProduto.html?idMercante=" +
        idMercante +
        "&idProduto=" +
        idProduto;
};

const exibirProduto = function (idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
};

function montarCartoes(produtos, produtoImagens, categorias, mercante) {
    const container = document.querySelector(".container");

    const titulo = document.createElement("h1");
    titulo.classList.add("titulo");
    titulo.innerText = mercante.nmLoja;

    container.appendChild(titulo);

    const containerProdutos = document.createElement("div");
    containerProdutos.classList.add("produtos");

    produtos.forEach((produto) => {
        const cartao = document.createElement("div");
        cartao.classList.add("cartao");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");
        imagem.setAttribute("onclick", `exibirProduto(${produto.cdProduto})`);

        produtoImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagem.src = produtoImagem.imgProduto;
            }
        });

        if (imagem.src == "") {
            imagem.src = "/src/icons/image-preto.svg";
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.classList.add("favorito");
        iconeFavorito.src = "/src/icons/heart-roxo.svg";

        const iconeEditar = document.createElement("img");
        iconeEditar.classList.add("editar");
        iconeEditar.src = "/src/icons/edit2-roxo.svg";
        iconeEditar.setAttribute(
            "onclick",
            `editarProduto(${produto.cdProduto})`
        );

        const iconeRemover = document.createElement("img");
        iconeRemover.classList.add("remover");
        iconeRemover.src = "/src/icons/trash-2-roxo.svg";
        iconeRemover.setAttribute(
            "onclick",
            `enviarRemoverProduto(${produto.cdProduto})`
        );

        imagemFavorito.appendChild(imagem);
        imagemFavorito.appendChild(iconeFavorito);
        imagemFavorito.appendChild(iconeEditar);
        imagemFavorito.appendChild(iconeRemover);

        const informacoes = document.createElement("div");
        informacoes.classList.add("informacoes");

        const tituloCategoriaAvaliacao = document.createElement("div");
        tituloCategoriaAvaliacao.classList.add("titulo-categoria-avaliacao");

        const categoriaAvaliacao = document.createElement("div");
        categoriaAvaliacao.classList.add("categoria-avaliacao");

        const categoria = document.createElement("p");

        categorias.forEach((item) => {
            if (item.cdCategoria === produto.fkCdCategoria) {
                categoria.innerText = item.nmCategoria;
            }
        });

        const avaliacao = document.createElement("div");
        avaliacao.classList.add("avaliacao");
        const iconeAvaliacao = document.createElement("img");
        iconeAvaliacao.src = "/src/icons/star-amarela.svg";
        const notaAvaliacao = document.createElement("p");
        notaAvaliacao.innerText = "4.5";

        avaliacao.appendChild(iconeAvaliacao);
        avaliacao.appendChild(notaAvaliacao);

        categoriaAvaliacao.appendChild(categoria);
        categoriaAvaliacao.appendChild(avaliacao);

        const tituloProduto = document.createElement("p");
        tituloProduto.classList.add("titulo-produto");
        tituloProduto.innerText = produto.nmProduto;

        tituloCategoriaAvaliacao.appendChild(categoriaAvaliacao);
        tituloCategoriaAvaliacao.appendChild(tituloProduto);

        const precoParcelaBotao = document.createElement("div");
        precoParcelaBotao.classList.add("preco-parcela-botao");

        const precoParcela = document.createElement("div");
        precoParcela.classList.add("preco-parcela");
        const preco = document.createElement("p");
        preco.classList.add("preco");
        preco.innerText = "R$ " + produto.vlProduto;
        const parcela = document.createElement("p");
        parcela.classList.add("parcela");
        parcela.innerText = "ou 2x R$ " + produto.vlProduto / 2;

        precoParcela.appendChild(preco);
        precoParcela.appendChild(parcela);

        const botao = document.createElement("button");
        botao.classList.add("comprar");
        botao.setAttribute(
            "onclick",
            "window.location.href = '/src/pages/produtos/produto.html'"
        );
        botao.innerText = "COMPRA";

        precoParcelaBotao.appendChild(precoParcela);
        precoParcelaBotao.appendChild(botao);

        informacoes.appendChild(tituloCategoriaAvaliacao);
        informacoes.appendChild(precoParcelaBotao);

        cartao.appendChild(imagemFavorito);
        cartao.appendChild(informacoes);

        containerProdutos.append(cartao);
        container.append(containerProdutos);
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    carregarProdutos(idMercante);
});

document.getElementById("adicionarProduto").addEventListener("click", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    window.location =
        "/src/pages/produtos/novoProduto.html?idMercante=" + idMercante;
});
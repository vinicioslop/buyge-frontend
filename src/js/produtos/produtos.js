const fetchUrl = "https://129.148.45.5:30001/api";

function mascaraPreco(preco) {
    var valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

async function carregarProdutos() {
    const response = await fetch(`${fetchUrl}/produtos`, { mode: "cors" });
    const produtos = await response.json();

    return produtos;
}

async function carregarImagems() {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagem`, {
        mode: "cors",
    });
    const produtoImagens = await response.json();

    return produtoImagens;
}

async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, { mode: "cors" });
    const categorias = await response.json();

    return categorias;
}

async function carregarMercantes() {
    const response = await fetch(`${fetchUrl}/mercantes`, { mode: "cors" });
    const mercantes = await response.json();

    return mercantes;
}

function exibirProduto (idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
};

function produtosMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
}

async function montaCartao() {
    const produtos = await carregarProdutos();
    const produtoImagens = await carregarImagems();
    const categorias = await carregarCategorias();
    const mercantes = await carregarMercantes();

    const container = document.querySelector(".container");

    const containerProdutos = document.createElement("div");
    containerProdutos.classList.add("produtos");

    produtos.forEach((produto) => {
        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");

        produtoImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagem.src = produtoImagem.imgProdutoLink;
            }
        });

        if (imagem.src == "") {
            imagem.src = "/src/icons/image-preto.svg";
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.classList.add("favorito");
        iconeFavorito.src = "/src/icons/heart.svg";

        imagemFavorito.appendChild(imagem);
        imagemFavorito.appendChild(iconeFavorito);

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

        const tituloProduto = document.createElement("h1");
        tituloProduto.classList.add("titulo-produto");
        tituloProduto.innerText = produto.nmProduto;

        tituloCategoriaAvaliacao.appendChild(categoriaAvaliacao);
        tituloCategoriaAvaliacao.appendChild(tituloProduto);

        const nomeLoja = document.createElement("h2");
        nomeLoja.classList.add("nome-loja");

        mercantes.forEach((item) => {
            if (item.cdMercante === produto.fkCdMercante) {
                nomeLoja.innerText = item.nmLoja;
                nomeLoja.setAttribute("onclick", `produtosMercante(${item.cdMercante})`)
            }
        });

        const precoParcelaBotao = document.createElement("div");
        precoParcelaBotao.classList.add("preco-parcela-botao");

        const precoParcela = document.createElement("div");
        precoParcela.classList.add("preco-parcela");
        const preco = document.createElement("p");
        preco.classList.add("preco");
        preco.innerText = mascaraPreco(produto.vlProduto);

        precoParcela.appendChild(preco);

        const botao = document.createElement("button");
        botao.classList.add("comprar");
        botao.setAttribute("onclick", `exibirProduto(${produto.cdProduto})`);
        botao.innerText = "COMPRA";

        precoParcelaBotao.appendChild(precoParcela);
        precoParcelaBotao.appendChild(botao);

        informacoes.appendChild(tituloCategoriaAvaliacao);
        informacoes.appendChild(nomeLoja);
        informacoes.appendChild(precoParcelaBotao);

        cartao.appendChild(imagemFavorito);
        cartao.appendChild(informacoes);

        containerProdutos.append(cartao);
    });

    container.append(containerProdutos);
}

document.addEventListener("DOMContentLoaded", montaCartao());

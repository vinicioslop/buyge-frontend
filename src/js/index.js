const fetchUrl = "https://localhost:7240/api";

function dolarToReal(dolar) {
    dolar = dolar.replace('.', '');
    dolar = dolar.replace(',', '.');
    return dolar;
}

const carregarProdutos = async () => {
    const response = await fetch(`${fetchUrl}/produtos`, { mode: "cors" });
    const produtos = await response.json();
    carregarImagems(produtos);
};

const carregarImagems = async (produtos) => {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagens`, {
        mode: "cors",
    });
    const produtoImagens = await response.json();
    montaCartao(produtos, produtoImagens);
};

function montaCartao(produtos, produtoImagens) {
    const maisVendidos = new Flickity("#mais-vendidos");
    const novidades = new Flickity("#novidades");
    const queimaEstoque = new Flickity("#queima-estoque");

    produtos.forEach((produto) => {
        let imagens = [];

        produtoImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagens.push(produtoImagem);
            }
        });

        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");
        imagem.src = imagens[0].imgProduto;
        const iconeFavorito = document.createElement("img");
        iconeFavorito.classList.add("favorito");
        iconeFavorito.src = "/src/icons/heart-roxo.svg";

        imagemFavorito.appendChild(imagem);
        imagemFavorito.appendChild(iconeFavorito);

        const informacoes = document.createElement("div");
        informacoes.classList.add("informacoes");

        const tituloCategoriaAvaliacao = document.createElement("div");
        tituloCategoriaAvaliacao.classList.add("titulo-categoria-avaliacao");

        const categoriaAvaliacao = document.createElement("div");
        categoriaAvaliacao.classList.add("categoria-avaliacao");
        const categoria = document.createElement("p");
        categoria.innerText = "ARCADE";
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
        botao.setAttribute("onclick", "window.location.href = '/src/pages/produto.html'")
        botao.innerText = "COMPRA";

        precoParcelaBotao.appendChild(precoParcela);
        precoParcelaBotao.appendChild(botao);

        informacoes.appendChild(tituloCategoriaAvaliacao);
        informacoes.appendChild(precoParcelaBotao);

        cartao.appendChild(imagemFavorito);
        cartao.appendChild(informacoes);

        maisVendidos.append(cartao);
    });

    produtos.forEach((produto) => {
        let imagens = [];

        produtoImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagens.push(produtoImagem);
            }
        });

        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");
        imagem.src = imagens[0].imgProduto;
        const iconeFavorito = document.createElement("img");
        iconeFavorito.classList.add("favorito");
        iconeFavorito.src = "/src/icons/heart-roxo.svg";

        imagemFavorito.appendChild(imagem);
        imagemFavorito.appendChild(iconeFavorito);

        const informacoes = document.createElement("div");
        informacoes.classList.add("informacoes");

        const tituloCategoriaAvaliacao = document.createElement("div");
        tituloCategoriaAvaliacao.classList.add("titulo-categoria-avaliacao");

        const categoriaAvaliacao = document.createElement("div");
        categoriaAvaliacao.classList.add("categoria-avaliacao");
        const categoria = document.createElement("p");
        categoria.innerText = "ARCADE";
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
        botao.setAttribute("onclick", "window.location.href = '/src/pages/produto.html'")
        botao.innerText = "COMPRA";

        precoParcelaBotao.appendChild(precoParcela);
        precoParcelaBotao.appendChild(botao);

        informacoes.appendChild(tituloCategoriaAvaliacao);
        informacoes.appendChild(precoParcelaBotao);

        cartao.appendChild(imagemFavorito);
        cartao.appendChild(informacoes);

        novidades.append(cartao);
    });

    produtos.forEach((produto) => {
        let imagens = [];

        produtoImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagens.push(produtoImagem);
            }
        });

        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");
        imagem.src = imagens[0].imgProduto;
        const iconeFavorito = document.createElement("img");
        iconeFavorito.classList.add("favorito");
        iconeFavorito.src = "/src/icons/heart-roxo.svg";

        imagemFavorito.appendChild(imagem);
        imagemFavorito.appendChild(iconeFavorito);

        const informacoes = document.createElement("div");
        informacoes.classList.add("informacoes");

        const tituloCategoriaAvaliacao = document.createElement("div");
        tituloCategoriaAvaliacao.classList.add("titulo-categoria-avaliacao");

        const categoriaAvaliacao = document.createElement("div");
        categoriaAvaliacao.classList.add("categoria-avaliacao");
        const categoria = document.createElement("p");
        categoria.innerText = "ARCADE";
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
        botao.setAttribute("onclick", "window.location.href = '/src/pages/produto.html'")
        botao.innerText = "COMPRA";

        precoParcelaBotao.appendChild(precoParcela);
        precoParcelaBotao.appendChild(botao);

        informacoes.appendChild(tituloCategoriaAvaliacao);
        informacoes.appendChild(precoParcelaBotao);

        cartao.appendChild(imagemFavorito);
        cartao.appendChild(informacoes);

        queimaEstoque.append(cartao);
    });
}

document.addEventListener("DOMContentLoaded", carregarProdutos());

const fetchUrl = "https://localhost:7240/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

async function carregarProdutos() {
    const response = await fetch(`${fetchUrl}/produtos`, { mode: "cors" });
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

async function carregarImagems() {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagem`, {
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

async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, { mode: "cors" });
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

async function carregarMercantes() {
    const response = await fetch(`${fetchUrl}/mercantes`, { mode: "cors" });
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

function produtosMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
}

function exibirProduto(idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
}

async function montaCartao() {
    const produtosResposta = await carregarProdutos();
    if (produtosResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na coleta de produtos. STATUS: " +
                produtosResposta.status
        );
    }
    const produtos = produtosResposta.dados;

    const produtoImagensResposta = await carregarImagems();
    if (produtoImagensResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na coleta de produtos. STATUS: " +
                produtoImagensResposta.status
        );
    }
    const produtoImagens = produtoImagensResposta.dados;

    const categoriasResposta = await carregarCategorias();
    if (categoriasResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na coleta de produtos. STATUS: " +
                categoriasResposta.status
        );
    }
    const categorias = categoriasResposta.dados;

    const mercantesResposta = await carregarMercantes();
    if (mercantesResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na coleta de produtos. STATUS: " +
                mercantesResposta.status
        );
    }
    const mercantes = mercantesResposta.dados;

    const maisVendidos = new Flickity("#mais-vendidos");
    const novidades = new Flickity("#novidades");
    const queimaEstoque = new Flickity("#queima-estoque");

    produtos.forEach((produto) => {
        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");

        produtoImagens.forEach((produtoImagem) => {
            if (
                produtoImagem.fkCdProduto === produto.cdProduto &&
                produtoImagem.idPrincipal === 1
            ) {
                imagem.src = produtoImagem.imgProdutoLink;
            }
        });

        if (imagem.src == "") {
            imagem.src = "/src/icons/image-preto.svg";
        }

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
                nomeLoja.setAttribute(
                    "onclick",
                    `produtosMercante(${item.cdMercante})`
                );
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

        maisVendidos.append(cartao);
    });

    produtos.forEach((produto) => {
        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");

        produtoImagens.forEach((produtoImagem) => {
            if (
                produtoImagem.fkCdProduto === produto.cdProduto &&
                produtoImagem.idPrincipal === 1
            ) {
                imagem.src = produtoImagem.imgProdutoLink;
            }
        });

        if (imagem.src == "") {
            imagem.src = "/src/icons/image-preto.svg";
        }

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
                nomeLoja.setAttribute(
                    "onclick",
                    `produtosMercante(${item.cdMercante})`
                );
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

        novidades.append(cartao);
    });

    produtos.forEach((produto) => {
        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        cartao.classList.add("carrosel-cell");

        const imagemFavorito = document.createElement("div");
        imagemFavorito.classList.add("imagem-favorito");
        const imagem = document.createElement("img");
        imagem.classList.add("imagem");

        produtoImagens.forEach((produtoImagem) => {
            if (
                produtoImagem.fkCdProduto === produto.cdProduto &&
                produtoImagem.idPrincipal === 1
            ) {
                imagem.src = produtoImagem.imgProdutoLink;
            }
        });

        if (imagem.src == "") {
            imagem.src = "/src/icons/image-preto.svg";
        }

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
                nomeLoja.setAttribute(
                    "onclick",
                    `produtosMercante(${item.cdMercante})`
                );
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

        queimaEstoque.append(cartao);
    });
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    montaCartao();
});

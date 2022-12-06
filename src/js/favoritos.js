const fetchUrl = "https://localhost:7240/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

async function carregarFavoritos(idCliente, token) {
    const response = await fetch(`${fetchUrl}/favorito/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: "",
                status: status,
            };

            return status;
    }
}

async function carregarProduto(idProduto) {
    const response = await fetch(`${fetchUrl}/produtos/${idProduto}`, {
        mode: "cors",
    });
    const status = response.status;

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

async function carregarImagems(idProduto) {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${idProduto}/todas`,
        {
            mode: "cors",
        }
    );

    const status = response.status;

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
    const status = response.status;

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

async function carregarMercante(idMercante) {
    const response = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        mode: "cors",
    });
    const status = response.status;

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

async function apagarFavorito(idCliente, idProduto, token) {
    const response = await fetch(
        `${fetchUrl}/favorito/${idCliente}/${idProduto}`,
        {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    const status = response.status;

    switch (status) {
        case 200:
            var resposta = {
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                status: status,
            };

            return resposta;
    }
}

async function desfavoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await apagarFavorito(idCliente, idProduto, token);

        if (resposta.status == 200) {
            window.location.reload();
        }
    }
}

async function montaCartao(idCliente, token) {
    const categoriasResposta = await carregarCategorias();
    if (categoriasResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na coleta de produtos. STATUS: " +
                categoriasResposta.status
        );
    }
    const categorias = categoriasResposta.dados;

    const favoritosResposta = await carregarFavoritos(idCliente, token);
    const favoritos = favoritosResposta.dados;

    const produtosFavoritados = document.querySelector(".produtos-favoritados");

    favoritos.forEach(async (favorito) => {
        const produtoResposta = await carregarProduto(favorito.fkCdProduto);
        const produto = produtoResposta.dados;

        const imagensResposta = await carregarImagems(produto.cdProduto);
        const produtoImagens = await imagensResposta.dados;

        const mercantesResposta = await carregarMercante(produto.fkCdMercante);
        const mercante = await mercantesResposta.dados;

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
        iconeFavorito.src = "/src/icons/heart-cheio.svg";
        iconeFavorito.setAttribute(
            "onclick",
            `desfavoritar(${produto.cdProduto})`
        );

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

        nomeLoja.innerText = mercante.nmLoja;
        nomeLoja.setAttribute(
            "onclick",
            `produtosMercante(${mercante.cdMercante})`
        );

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
        botao.innerText = "VISUALIZAR";

        precoParcelaBotao.appendChild(precoParcela);
        precoParcelaBotao.appendChild(botao);

        informacoes.appendChild(tituloCategoriaAvaliacao);
        informacoes.appendChild(nomeLoja);
        informacoes.appendChild(precoParcelaBotao);

        cartao.appendChild(imagemFavorito);
        cartao.appendChild(informacoes);

        produtosFavoritados.append(cartao);
    });
}

function exibirProduto(idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
}

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const deslogado = document.querySelector("#deslogado");
    const meusFavoritos = document.querySelector("#meusFavoritos");

    const token = sessionStorage.getItem("token");

    if (token == null) {
        deslogado.className = "mostrar";
        meusFavoritos.className = "esconder";
    } else {
        deslogado.className = "esconder";
        meusFavoritos.className = "mostrar";

        const idCliente = sessionStorage.getItem("idCliente");

        montaCartao(idCliente, token);
    }
});

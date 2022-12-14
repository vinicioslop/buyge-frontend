const fetchUrl = "http://129.148.45.5:30001/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

function adicionarConfirmacao(conteudo, botoesMontados) {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");
    const mensagem = document.querySelector(".mensagem");

    mensagem.innerText = conteudo;

    const botoes = document.querySelector("#botoes");

    botoesMontados.forEach((botao) => {
        botoes.appendChild(botao);
    });

    fundoMensagem.className = "mostrar-popup";
}

function recarregarPagina() {
    window.location.reload();
}

function removerConfirmacao() {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");

    fundoMensagem.className = "esconder-popup";
}

function montarAlerta(conteudo) {
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "OK";
    botaoConfirmar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = conteudo;

    const botoes = [botaoConfirmar];

    adicionarConfirmacao(mensagem, botoes);
}

function montarAlertaRecarregar(conteudo) {
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "OK";
    botaoConfirmar.setAttribute("onclick", "recarregarPagina()");

    const mensagem = conteudo;

    const botoes = [botaoConfirmar];

    adicionarConfirmacao(mensagem, botoes);
}

async function carregarFavoritos(idCliente, token) {
    const response = await fetch(`${fetchUrl}/favoritos/${idCliente}`, {
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
    const response = await fetch(`${fetchUrl}/produto/${idProduto}`, {
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
    const response = await fetch(`${fetchUrl}/mercante/${idMercante}`, {
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
        `${fetchUrl}/favorito/remover/${idCliente}/${idProduto}`,
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

async function adicionarItemCarrinho(idCliente, idProduto, token) {
    const response = await fetch(
        `${fetchUrl}/carrinho/item/novo/${idCliente}/${idProduto}`,
        {
            method: "POST",
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
        case 201:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: [],
                status: status,
            };

            return resposta;
    }
}

async function adicionarCarrinho(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Cliente não autenticado!");
        return;
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const itemCarrinhoResposta = await adicionarItemCarrinho(
        idCliente,
        idProduto,
        token
    );

    switch (itemCarrinhoResposta.status) {
        case 201:
            removerConfirmacao();
            montarAlerta("Produto adicionado ao carrinho!");
            break;
        case 400:
            montarAlerta("Produto já adicionado ao carrinho!");
            break;
    }
}

function exibirProduto(idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
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

    const deslogado = document.querySelector("#deslogado");
    const semFavoritos = document.querySelector("#semFavoritos");
    const meusFavoritos = document.querySelector("#meusFavoritos");
    const tituloFavoritos = document.querySelector(".titulo-favorito");

    if (favoritos == 0) {
        deslogado.className = "esconder";
        semFavoritos.className = "mostrar";
        meusFavoritos.className = "esconder";
        tituloFavoritos.className = "titulo-favorito esconder";
    } else {
        const produtosFavoritados = document.querySelector(
            ".produtos-favoritados"
        );

        favoritos.forEach(async (favorito) => {
            const produtoResposta = await carregarProduto(favorito.fkCdProduto);
            const produto = produtoResposta.dados;

            const imagensResposta = await carregarImagems(produto.cdProduto);
            const produtoImagens = await imagensResposta.dados;

            const mercantesResposta = await carregarMercante(
                produto.fkCdMercante
            );
            const mercante = await mercantesResposta.dados;

            const cartao = document.createElement("div");
            cartao.classList.add("cartao-favorito");
            cartao.classList.add("carrosel-cell");

            const imagemFavorito = document.createElement("div");
            imagemFavorito.classList.add("imagem-favorito");
            const imagem = document.createElement("img");
            imagem.classList.add("imagem");
            imagem.setAttribute(
                "onclick",
                `exibirProduto(${favorito.fkCdProduto})`
            );

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
            iconeFavorito.src = "/src/icons/heart2-cheio.png";
            iconeFavorito.setAttribute(
                "onclick",
                `desfavoritar(${produto.cdProduto})`
            );

            imagemFavorito.appendChild(imagem);
            imagemFavorito.appendChild(iconeFavorito);

            const informacoes = document.createElement("div");
            informacoes.classList.add("informacoes");

            const tituloCategoriaAvaliacao = document.createElement("div");
            tituloCategoriaAvaliacao.classList.add(
                "titulo-categoria-avaliacao"
            );

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
            botao.innerText = "Adicionar ao Carrinho";
            botao.setAttribute(
                "onclick",
                `adicionarCarrinho(${produto.cdProduto})`
            );

            precoParcelaBotao.appendChild(precoParcela);
            precoParcelaBotao.appendChild(botao);

            informacoes.appendChild(tituloCategoriaAvaliacao);
            informacoes.appendChild(nomeLoja);
            informacoes.appendChild(precoParcelaBotao);

            cartao.appendChild(imagemFavorito);
            cartao.appendChild(informacoes);

            produtosFavoritados.append(cartao);
        });

        meusFavoritos.className = "mostrar";
        tituloFavoritos.className = "titulo-favorito mostrar";
    }
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const deslogado = document.querySelector("#deslogado");
    const meusFavoritos = document.querySelector("#meusFavoritos");

    const token = sessionStorage.getItem("token");

    if (token == null) {
        deslogado.className = "mostrar";
        meusFavoritos.className = "esconder";
    } else {
        const idCliente = sessionStorage.getItem("idCliente");
        await montaCartao(idCliente, token);

        deslogado.className = "esconder";
        meusFavoritos.className = "mostrar";
    }
});

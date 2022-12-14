const fetchUrl = "http://129.148.45.5:30000/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
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

            return resposta;
    }
}

async function adicionarFavorito(idCliente, idProduto, token) {
    const response = await fetch(
        `${fetchUrl}/favorito/adicionar/${idCliente}/${idProduto}`,
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
                dados: "",
                status: status,
            };

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

async function carregarProduto(idProduto) {
    const response = await fetch(`${fetchUrl}/produto/${idProduto}`, {
        method: "GET",
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

async function carregarCategoria(idCategoria) {
    const response = await fetch(`${fetchUrl}/categoria/${idCategoria}`, {
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

async function carregarMercante(idMercante) {
    const response = await fetch(`${fetchUrl}/mercante/${idMercante}`, {
        method: "GET",
        mode: "cors",
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

async function favoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await adicionarFavorito(idCliente, idProduto, token);

        if (resposta.status == 201) {
            montarAlertaRecarregar("Produto adiciona aos favoritos!");
        }
    }
}

async function desfavoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await apagarFavorito(idCliente, idProduto, token);

        if (resposta.status == 200) {
            montarAlertaRecarregar("Produto removido dos favoritos!");
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

async function comprarProduto(idProduto) {
    const respostaCarrinho = await adicionarCarrinho(idProduto, true);

    switch (respostaCarrinho.status) {
        case 201:
            window.location = "/src/pages/carrinho.html";
            break;
        case 400:
            window.location = "/src/pages/carrinho.html";
            break;
    }
}

function salvaItemCarrinhoDeslogado(idProduto) {
    var listaItemsCarrinho = JSON.parse(
        localStorage.getItem("itemsCarrinho") || "[]"
    );

    listaItemsCarrinho.forEach((item) => {
        if (item.id == idProduto) {
            console.log("Produto já adicionado ao carrinho!");
            return;
        }
    });

    const item = {
        id: idProduto,
    };

    listaItemsCarrinho.push(item);

    localStorage.setItem("itemsCarrinho", JSON.stringify(listaItemsCarrinho));
}

function retornaItemsCarrinhoDeslogado() {
    var listaItemsCarrinho = JSON.parse(
        localStorage.getItem("itemsCarrinho") || "[]"
    );

    return listaItemsCarrinho;
}

async function adicionarCarrinho(idProduto, chamadoComprar) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Cliente não autenticado!");

        //localStorage.clear();
        salvaItemCarrinhoDeslogado(idProduto);
        retornaItemsCarrinhoDeslogado();
    } else {
        const idCliente = sessionStorage.getItem("idCliente");

        const respostaItemCarrinho = await adicionarItemCarrinho(
            idCliente,
            idProduto,
            token
        );

        if (!chamadoComprar) {
            switch (respostaItemCarrinho.status) {
                case 201:
                    montarAlerta("Produto adiciona aos carrinho!");
                    break;
                case 400:
                    montarAlerta("Produto já adicionado aos carrinho!");
                    break;
            }
        } else {
            var resposta = {
                status: respostaItemCarrinho.status,
            };

            return resposta;
        }
    }
}

function produtosMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
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

async function montarProduto(idProduto) {
    const produtoResposta = await carregarProduto(idProduto);
    if (produtoResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + produtoResposta.status
        );
        return;
    }
    const produto = produtoResposta.dados;

    const categoriasResposta = await carregarCategoria(produto.fkCdCategoria);
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

    const mercanteResposta = await carregarMercante(produto.fkCdMercante);
    if (mercanteResposta.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + imagensResposta.status
        );
        return;
    }
    const mercante = mercanteResposta.dados;

    document.querySelector("#categoria").innerText =
        categoria.nmCategoria.toUpperCase();

    document.querySelector(".imagem-full").src = imagens[0].imgProdutoLink;

    const miniaturas = document.querySelector(".miniaturas");

    imagens.forEach((imagem) => {
        let img = document.createElement("img");
        img.src = imagem.imgProdutoLink;

        miniaturas.append(img);
    });

    const favoritoIcone = document.querySelector(".favoritar");

    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const favoritosResposta = await carregarFavoritos(idCliente, token);
        if (favoritosResposta.status != 200) {
            console.log(
                "Ocorreu um erro na requisição. STATUS: " +
                    favoritosResposta.status
            );
            return;
        }
        const favoritos = favoritosResposta.dados;

        if (favoritos.length > 0) {
            favoritos.forEach((favorito) => {
                if (favorito.fkCdProduto == produto.cdProduto) {
                    favoritoIcone.setAttribute(
                        "src",
                        "/src/icons/heart-cheio.svg"
                    );
                    favoritoIcone.setAttribute(
                        "onclick",
                        `desfavoritar(${produto.cdProduto})`
                    );
                }
            });
        }

        if (favoritoIcone.src == "") {
            favoritoIcone.setAttribute("src", "/src/icons/heart.svg");
            favoritoIcone.setAttribute(
                "onclick",
                `favoritar(${produto.cdProduto})`
            );
        }
    } else {
        favoritoIcone.setAttribute("src", "/src/icons/heart.svg");
    }

    document.querySelector(".titulo-produto").innerText = produto.nmProduto;
    document.querySelector(".nome-vendedor").innerText = mercante.nmLoja;
    document
        .querySelector(".nome-vendedor")
        .setAttribute("onclick", `produtosMercante(${mercante.cdMercante})`);

    document.querySelector(".atual").innerText = mascaraPreco(
        produto.vlProduto
    );

    if (produto.dsProduto.length > 150) {
        let descricao = produto.dsProduto.substr(0, 150);

        document.querySelector(".texto").innerHTML =
            descricao + "   <a href='#' class='leia-mais'>leia mais...</a>";
    } else {
        document.querySelector(".texto").innerText = produto.dsProduto;
    }

    const comprar = document.querySelector(".comprar");
    comprar.setAttribute("onclick", `comprarProduto(${produto.cdProduto})`);

    const adicionarCarrinho = document.querySelector(".carrinho");
    adicionarCarrinho.setAttribute(
        "onclick",
        `adicionarCarrinho(${(produto.cdProduto, false)})`
    );

    const comprarProduto = document.querySelector(".comprar");
    comprarProduto.setAttribute(
        "onclick",
        `comprarProduto(${produto.cdProduto})`
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get("idProduto");

    montarProduto(idProduto);
});

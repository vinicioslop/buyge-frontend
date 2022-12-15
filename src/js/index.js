async function configurarUrl() {
    const location = window.location.hostname;
    

    switch (location) {
        case "www.buyge.com.br":
            var url = "https://https://129.148.45.5:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
        case "127.0.0.1":
            var url = "https://localhost:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
    }
}

function retornarUrl() {
    return sessionStorage.getItem("fetchUrl");
}

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

async function carregarProdutos() {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/produtos`, { mode: "cors" });
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

async function carregarImagems() {
    const fetchUrl = retornarUrl();

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
    const fetchUrl = retornarUrl();

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

async function carregarMercantes() {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/mercantes`, { mode: "cors" });
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

async function carregarFavoritos(idCliente, token) {
    const fetchUrl = retornarUrl();

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

async function adicionarFavorito(idCliente, idProduto, token) {
    const fetchUrl = retornarUrl();

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
    const fetchUrl = retornarUrl();

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

function produtosMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
}

function exibirProduto(idProduto) {
    window.location = "/src/pages/produtos/produto.html?idProduto=" + idProduto;
}

async function favoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await adicionarFavorito(idCliente, idProduto, token);

        if (resposta.status == 201) {
            console.log("Produto adiciona aos favoritos!");
            window.location.reload();
        }
    }
}

async function desfavoritar(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await apagarFavorito(idCliente, idProduto, token);

        if (resposta.status == 200) {
            console.log("Produto removido dos favoritos!");
            window.location.reload();
        }
    }
}

async function montaCartao(idCliente, token) {
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

    var favoritos = [];

    if (idCliente != null) {
        var resposta = await carregarFavoritos(idCliente, token);

        if (resposta.status !== 200) {
            console.log(
                "Ocorreu um erro na coleta de produtos. STATUS: " +
                    resposta.status
            );
        }

        favoritos = resposta.dados;
    }

    const maisVendidos = new Flickity("#mais-vendidos");
    const novidades = new Flickity("#novidades");
    const queimaEstoque = new Flickity("#queima-estoque");

    produtos.forEach((produto) => {
        if (produto.idDisponibilidade == 1) {
            const cartao = document.createElement("div");
            cartao.classList.add("cartao");
            cartao.classList.add("carrosel-cell");

            const imagemFavorito = document.createElement("div");
            imagemFavorito.classList.add("imagem-favorito");
            const imagem = document.createElement("img");
            imagem.classList.add("imagem");
            imagem.setAttribute(
                "onclick",
                `exibirProduto(${produto.cdProduto})`
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

            if (favoritos.length > 0) {
                favoritos.forEach((favorito) => {
                    if (favorito.fkCdProduto == produto.cdProduto) {
                        iconeFavorito.src = "/src/icons/heart2-cheio.png";

                        iconeFavorito.setAttribute(
                            "onclick",
                            `desfavoritar(${produto.cdProduto})`
                        );
                    }
                });
            }

            if (iconeFavorito.src == "") {
                iconeFavorito.src = "/src/icons/heart2.png";

                iconeFavorito.setAttribute(
                    "onclick",
                    `favoritar(${produto.cdProduto})`
                );
            }

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
            botao.setAttribute(
                "onclick",
                `exibirProduto(${produto.cdProduto})`
            );
            botao.innerText = "VISUALIZAR";

            precoParcelaBotao.appendChild(precoParcela);
            precoParcelaBotao.appendChild(botao);

            informacoes.appendChild(tituloCategoriaAvaliacao);
            informacoes.appendChild(nomeLoja);
            informacoes.appendChild(precoParcelaBotao);

            cartao.appendChild(imagemFavorito);
            cartao.appendChild(informacoes);

            maisVendidos.append(cartao);
        }
    });

    produtos.forEach((produto) => {
        if (produto.idDisponibilidade == 1) {
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
            iconeFavorito.id = "produto" + produto.cdProduto;

            if (favoritos.length > 0) {
                favoritos.forEach((favorito) => {
                    if (favorito.fkCdProduto == produto.cdProduto) {
                        iconeFavorito.src = "/src/icons/heart-cheio.svg";

                        iconeFavorito.setAttribute(
                            "onclick",
                            `desfavoritar(${produto.cdProduto})`
                        );
                    }
                });
            }

            if (iconeFavorito.src == "") {
                iconeFavorito.src = "/src/icons/heart.svg";

                iconeFavorito.setAttribute(
                    "onclick",
                    `favoritar(${produto.cdProduto})`
                );
            }

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
            botao.setAttribute(
                "onclick",
                `exibirProduto(${produto.cdProduto})`
            );
            botao.innerText = "VISUALIZAR";

            precoParcelaBotao.appendChild(precoParcela);
            precoParcelaBotao.appendChild(botao);

            informacoes.appendChild(tituloCategoriaAvaliacao);
            informacoes.appendChild(nomeLoja);
            informacoes.appendChild(precoParcelaBotao);

            cartao.appendChild(imagemFavorito);
            cartao.appendChild(informacoes);

            novidades.append(cartao);
        }
    });

    produtos.forEach((produto) => {
        if (produto.idDisponibilidade == 1) {
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
            iconeFavorito.id = "produto" + produto.cdProduto;

            if (favoritos.length > 0) {
                favoritos.forEach((favorito) => {
                    if (favorito.fkCdProduto == produto.cdProduto) {
                        iconeFavorito.src = "/src/icons/heart-cheio.svg";

                        iconeFavorito.setAttribute(
                            "onclick",
                            `desfavoritar(${produto.cdProduto})`
                        );
                    }
                });
            }

            if (iconeFavorito.src == "") {
                iconeFavorito.src = "/src/icons/heart.svg";

                iconeFavorito.setAttribute(
                    "onclick",
                    `favoritar(${produto.cdProduto})`
                );
            }

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
            botao.setAttribute(
                "onclick",
                `exibirProduto(${produto.cdProduto})`
            );
            botao.innerText = "VISUALIZAR";

            precoParcelaBotao.appendChild(precoParcela);
            precoParcelaBotao.appendChild(botao);

            informacoes.appendChild(tituloCategoriaAvaliacao);
            informacoes.appendChild(nomeLoja);
            informacoes.appendChild(precoParcelaBotao);

            cartao.appendChild(imagemFavorito);
            cartao.appendChild(informacoes);

            queimaEstoque.append(cartao);
        }
    });
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    await configurarUrl();

    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        montaCartao(idCliente, token);
    } else {
        montaCartao(null, null);
    }
});

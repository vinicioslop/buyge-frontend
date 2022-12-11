const fetchUrl = "https://129.148.45.5:30001/api";

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

            return resposta;
    }
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

async function adicionarItemCarrinho(idCliente, idProduto, token) {
    const response = await fetch(
        `${fetchUrl}/carrinho/items/${idCliente}/${idProduto}`,
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
                dados: null,
                status: status,
            };

            return resposta;
    }
}

async function comprarProduto(idProduto) {
    const respostaCarrinho = await adicionarCarrinho(idProduto);

    if (respostaCarrinho.status == 201) {
        window.location = "/src/pages/carrinho.html";
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

async function adicionarCarrinho(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Cliente não autenticado!");

        //localStorage.clear();
        salvaItemCarrinhoDeslogado(idProduto);
        retornaItemsCarrinhoDeslogado();
    } else {
        const idCliente = sessionStorage.getItem("idCliente");

        return await adicionarItemCarrinho(idCliente, idProduto, token);
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

    document.querySelector(".caminho").innerText =
        "Início > " + categoria.nmCategoria;

    document.querySelector(".imagem-full").src = imagens[0].imgProdutoLink;

    const miniaturas = document.querySelector(".miniaturas");

    imagens.forEach((imagem) => {
        let img = document.createElement("img");
        img.src = imagem.imgProdutoLink;

        miniaturas.append(img);
    });

    const favoritoIcone = document.querySelector(".favoritar");
    favoritoIcone.setAttribute("src", "/src/icons/heart.svg");

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
                }
            });
        }
    }

    document.querySelector(".titulo-produto").innerText = produto.nmProduto;
    document.querySelector(".atual").innerText = mascaraPreco(
        produto.vlProduto
    );
    document.querySelector(".parcelas").innerText =
        "em 3x R$ " + mascaraPreco(produto.vlProduto / 3);
    document.querySelector(".texto").innerText = produto.dsProduto;

    const comprar = document.querySelector(".comprar");
    comprar.setAttribute("onclick", `comprarProduto(${produto.cdProduto})`);

    const adicionarCarrinho = document.querySelector(".carrinho");
    adicionarCarrinho.setAttribute(
        "onclick",
        `adicionarCarrinho(${produto.cdProduto})`
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

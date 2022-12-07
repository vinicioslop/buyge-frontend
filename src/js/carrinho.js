const fetchUrl = "https://129.148.45.5:30001/api";

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
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const produto = await response.json();

    return produto;
}

async function carregarImagems(idProduto) {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${idProduto}/todas`,
        {
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

async function carregarItensCarrinho(idCliente, token) {
    const response = await fetch(`${fetchUrl}/carrinho/items/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
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
    const requisicao = await fetch(
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
    const resposta = await requisicao.json();

    return resposta;
}

async function apagarItemCarrinho(idItemCarrinho, token) {
    const requisicao = await fetch(
        `${fetchUrl}/carrinho/items/${idItemCarrinho}`,
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

    return requisicao.status;
}

async function removerItemCarrinho(idItemCarrinho) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Usuário não autenticado!");
        window.location = "/";
    }

    const resposta = await apagarItemCarrinho(idItemCarrinho, token);

    if (resposta == 200) {
        window.location.reload(true);
    }
}

async function gerarPreferencia(idCliente, token) {
    const response = await fetch(`${fetchUrl}/comprar/${idCliente}`, {
        method: "POST",
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

async function montarItemCarrinho(itemsCarrinho) {
    const tabelaProdutos = document.querySelector(".tabela-produtos");

    itemsCarrinho.dados.forEach(async (item) => {
        let produto = await carregarProduto(item.fkCdProduto);
        let imagens = await carregarImagems(item.fkCdProduto);

        let imagemPrincipal = {};

        imagens.dados.forEach((imagem) => {
            if (imagem.idPrincipal == 1) {
                imagemPrincipal = imagem;
            }
        });

        const tr = document.createElement("tr");
        tr.classList.add("produto");

        tr.innerHTML = `<td class="nome-produto">
            <div class="imagem">
                <img
                    src="${imagemPrincipal.imgProdutoLink}"
                    alt=""
                />
            </div>
            <p>${produto.nmProduto}</p>
        </td>
        <td class="quantidade-produto">
            <button class="remover">-</button>
            <input
                type="number"
                name="quantidadeProduto"
                id="quantidadeProduto"
                value="${item.qtItemCarrinho}"
            />
            <button class="adicionar">+</button>
        </td>
        <td class="valor-unitario-produto">
            ${mascaraPreco(produto.vlProduto)}
        </td>
        <td class="subtotal-produto">${mascaraPreco(produto.vlProduto)}</td>
        <td onclick="removerItemCarrinho(${
            item.cdItemCarrinho
        })" class="removerProduto">
            <img src="/src/icons/remover-preto.svg" alt="">
        </td>`;

        tabelaProdutos.appendChild(tr);
    });
}

async function montarValores(itemsCarrinho) {
    let valorBruto = 0;

    itemsCarrinho.dados.map(async (item) => {
        let produto = await carregarProduto(item.fkCdProduto);

        valorBruto += produto.vlProduto * item.qtItemCarrinho;
    });
}

async function acionaMercadoPago() {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Inválido");
    } else {
        const idCliente = sessionStorage.getItem("idCliente");

        const resposta = await gerarPreferencia(idCliente, token);

        if (resposta.status === 200) {
            window.location = resposta.dados.sandboxInitPoint;
        } else {
            console.log(
                "Ocorreu um erro na requisição. STATUS: " + resposta.status
            );
        }
    }
}

async function montarItemCarrinhoDeslogado(itemsCarrinho) {
    const tabelaProdutos = document.querySelector(".tabela-produtos");

    itemsCarrinho.forEach(async (item) => {
        let produto = await carregarProduto(item.id);
        let imagens = await carregarImagems(item.id);

        let imagemPrincipal = {};

        imagens.dados.forEach((imagem) => {
            if (imagem.idPrincipal == 1) {
                imagemPrincipal = imagem;
            }
        });

        const tr = document.createElement("tr");
        tr.classList.add("produto");

        tr.innerHTML = `<td class="nome-produto">
                <div class="imagem">
                <img
                    src="${imagemPrincipal.imgProdutoLink}"
                    alt=""
                />
                </div>
                <p>${produto.nmProduto}</p>
            </td>
            <td class="quantidade-produto">
                <button class="remover">-</button>
                <input
                type="number"
                name="quantidadeProduto"
                id="quantidadeProduto"
                value="${0}"
                />
                <button class="adicionar">+</button>
            </td>
            <td class="valor-unitario-produto">
                ${mascaraPreco(produto.vlProduto)}
            </td>
            <td class="subtotal-produto">${mascaraPreco(produto.vlProduto)}</td>
            <td onclick="removerItemCarrinhoDeslogado(${
                item.id
            })" class="removerProduto">
                <img src="/src/icons/remover-preto.svg" alt="">
            </td>`;

        tabelaProdutos.appendChild(tr);
    });
}

function retornaItemsCarrinhoDeslogado() {
    var listaItemsCarrinho = JSON.parse(
        localStorage.getItem("itemsCarrinho") || "[]"
    );

    return listaItemsCarrinho;
}

function removerItemCarrinhoDeslogado(idProduto) {
    var listaItemsCarrinho = JSON.parse(
        localStorage.getItem("itemsCarrinho") || "[]"
    );

    listaItemsCarrinho.forEach((item, index) => {
        if (item.id == idProduto) {
            listaItemsCarrinho.splice(index, 1);
            console.log(listaItemsCarrinho[index]);
        }
    });

    localStorage.setItem("itemsCarrinho", JSON.stringify(listaItemsCarrinho));

    window.location.reload();
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        var itemsCarrinho = retornaItemsCarrinhoDeslogado();

        if (itemsCarrinho == 0) {
            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo";
            informacoes.className = "informacoes esconder";
            semItems.className = "mostrar";
        } else {
            montarItemCarrinhoDeslogado(itemsCarrinho);

            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo";
            informacoes.className = "informacoes mostrar";
            semItems.className = "esconder";
        }
    } else {
        const idCliente = sessionStorage.getItem("idCliente");
        const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

        if (itemsCarrinho.dados.length === 0) {
            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo esconder";
            informacoes.className = "informacoes esconder";
            semItems.className = "mostrar";
        } else {
            await montarItemCarrinho(itemsCarrinho);
            await montarValores(itemsCarrinho);

            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo";
            informacoes.className = "informacoes mostrar";
            semItems.className = "esconder";
        }
    }
});

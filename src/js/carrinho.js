const fetchUrl = "https://localhost:7240/api";

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
    const itensCarrinho = await response.json();

    return itensCarrinho;
}

async function adicionarItemCarrinho(idCliente, idItemCarrinho, token) {
    const requisicao = await fetch(
        `${fetchUrl}/carrinho/items/${idCliente}/${idItemCarrinho}`,
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

async function montarItemCarrinho(itemsCarrinho) {
    const tabelaProdutos = document.querySelector(".tabela-produtos");

    itemsCarrinho.forEach(async (item) => {
        console.log(item);

        let produto = await carregarProduto(item.fkCdProduto);

        const tr = document.createElement("tr");
        tr.classList.add("produto");

        tr.innerHTML = `<td class="nome-produto">
            <div class="imagem">
                <img
                    src="/src/icons/image-preto.svg"
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
        <td onclick="removerItemCarrinho(${item.cdItemCarrinho})" class="removerProduto">
            <img src="/src/icons/remover-preto.svg" alt="">
        </td>`;

        tabelaProdutos.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "/";
    } else {
        const idCliente = sessionStorage.getItem("idCliente");
        const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

        montarItemCarrinho(itemsCarrinho);
    }
});

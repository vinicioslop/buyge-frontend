const fetchUrl = "https://localhost:7240/api";

String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};

function mascaraMoeda(campo, evento) {
    var tecla = !evento ? window.event.keyCode : evento.which;
    var valor = campo.value.replace(/[^\d]+/gi, "").reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length; ) {
        if (mascara.charAt(x) != "#") {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
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

async function montarItemCarrinho() {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const tabelaProdutos = document.querySelector(".tabela-produtos");

    const idCliente = sessionStorage.getItem("idCliente");

    const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

    itemsCarrinho.forEach(async (item) => {
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
            <button class="adicionar">+</button>
            <input
                type="number"
                name="quantidadeProduto"
                id="quantidadeProduto"
                value="1"
            />
            <button class="remover">-</button>
        </td>
        <td class="valor-unitario-produto">
            ${produto.vlProduto}
        </td>
        <td class="subtotal-produto">${produto.vlProduto}</td>
        <td onclick="removerItemCarrinho(${item.cdItemCarrinho})" class="removerProduto">
            <img src="/src/icons/remover-preto.svg" alt="">
        </td>`;

        tabelaProdutos.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "/";
    }

    montarItemCarrinho();
});

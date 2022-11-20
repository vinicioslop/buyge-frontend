const fetchUrl = "https://localhost:7240/api";

async function carregarProduto(id) {
    const response = await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
            return status;
    }
}

async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
            return status;
    }
}

async function atualizarProduto(produto, token) {
    const result = await fetch(`${fetchUrl}/produtos/${produto.cdProduto}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(produto),
    });

    const response = await result.status;

    return response;
}

async function removerProduto(id, token) {
    const result = await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    const response = await result.status;

    return response;
}

async function carregarInformacoesProduto(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Usuário não está autenticado.");
        return;
    }

    const requisicaoProduto = await carregarProduto(idProduto);

    if (requisicaoProduto.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + requisicaoProduto.status
        );
        return;
    }

    const requisicaoCategorias = await carregarCategorias();

    if (requisicaoCategorias.status !== 200) {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " +
                requisicaoCategorias.status
        );
        return;
    }

    const produto = requisicaoProduto.dados;
    const categorias = requisicaoCategorias.dados;

    const nome = document.querySelector("#nome");
    const descricao = document.querySelector("#descricao");
    const preco = document.querySelector("#preco");
    const quantidade = document.querySelector("#quantidade");
    const categoriaSelect = document.querySelector("#categoria");

    nome.value = produto.nmProduto;
    descricao.value = produto.dsProduto;
    preco.value = produto.vlProduto;
    quantidade.value = produto.qtProduto;

    categorias.forEach((categoria) => {
        let categoriaItem = document.createElement("option");
        categoriaItem.value = categoria.cdCategoria;
        categoriaItem.innerHTML = categoria.nmCategoria;

        if (categoria.cdCategoria === produto.fkCdCategoria) {
            categoriaItem.selected = true;
        }

        categoriaSelect.appendChild(categoriaItem);
    });
}

document
    .querySelector("#atualizarProduto")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const idProduto = urlParams.get("idProduto");
        const idMercante = urlParams.get("idMercante");

        const produto = {
            cdProduto: idProduto,
            nmProduto: document.querySelector("#nome").value,
            dsProduto: document.querySelector("#descricao").value,
            vlProduto: parseFloat(document.querySelector("#preco").value),
            qtProduto: parseFloat(document.querySelector("#quantidade").value),
            fkCdMercante: parseInt(idMercante),
            fkCdCategoria: document.querySelector("#categoria").value,
        };

        const token = sessionStorage.getItem("token");

        if (token === null) {
            console.log("Usuário não está autenticado.");
            return;
        }

        const status = await atualizarProduto(produto, token);

        switch (status) {
            case 200:
                console.log("Produto atualizado com sucesso");
                window.location =
                    "src/pages/mercantes/produtosMercante.html?idMercante=" +
                    idMercante;
            default:
                console.log("Ocorreu um erro na requisição. STATUS: " + status);
                break;
        }
    });

document
    .querySelector("#excluirProduto")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const idProduto = urlParams.get("idProduto");

        const token = sessionStorage.getItem("token");

        if (token === null) {
            console.log("Usuário não está autenticado.");
            return;
        }

        const status = await removerProduto(idProduto, token);

        switch (status) {
            case 200:
                console.log("Produto removido com sucesso.");
                window.location = "/src/pages/mercantes/mercantes.html";
            default:
                console.log("Ocorreu um erro na requisição. STATUS: " + status);
                break;
        }
    });

document.querySelector("#editarImagens").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get("idProduto");
    const idMercante = urlParams.get("idMercante");

    window.location =
        "/src/pages/produtos/produtoImagens.html?idMercante=" +
        idMercante +
        "&idProduto=" +
        idProduto;
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get("idProduto");

    carregarInformacoesProduto(idProduto);
});

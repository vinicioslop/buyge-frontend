const fetchUrl = "https://localhost:7240/api";

async function carregarProduto(id, token) {
    const response = await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const produto = await response.json();

    return produto;
}

async function carregarCategorias(token) {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const categorias = await response.json();

    return categorias;
}

async function carregarMercante(idMercante, token) {
    const response = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const mercante = await response.json();

    return mercante;
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

    const response = result.status;

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

    const response = result.status;

    return response;
}

function editarImagens(idProduto) {
    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");

    window.location =
        "/src/pages/produtos/produtoImagens.html?idMercante=" +
        idMercante +
        "&idProduto=" +
        idProduto;
}

function autenticado() {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
        return token;
    }

    return null;
}

async function carregarInformacoesProduto(idProduto) {
    const token = await autenticado();

    if (token === false) {
        console.log("Usuário não está autenticado.");
        return;
    }

    const produto = await carregarProduto(idProduto, token);
    const categorias = await carregarCategorias(token);
    const mercante = await carregarMercante(produto.fkCdMercante, token);

    const nome = document.querySelector("#nome");
    const descricao = document.querySelector("#descricao");
    const preco = document.querySelector("#preco");
    const quantidade = document.querySelector("#quantidade");
    const mercanteSelect = document.querySelector("#mercador");
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

    let mercanteItem = document.createElement("option");
    mercanteItem.value = mercante.cdMercante;
    mercanteItem.innerHTML = mercante.nmLoja;

    mercanteSelect.appendChild(mercanteItem);
}

async function enviarRemoverProduto(idProduto) {
    const token = await autenticado();

    if (token === false) {
        console.log("Usuário não está autenticado.");
        return;
    }

    removerProduto(idProduto, token);

    window.location = "/src/pages/mercantes/mercantes.html";
}

document
    .querySelector("#atualizarProduto")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const idProduto = urlParams.get("idProduto");

        const produto = {
            cdProduto: idProduto,
            nmProduto: document.querySelector("#nome").value,
            dsProduto: document.querySelector("#descricao").value,
            vlProduto: parseFloat(document.querySelector("#preco").value),
            qtProduto: parseFloat(document.querySelector("#quantidade").value),
            fkCdMercante: document.querySelector("#mercador").value,
            fkCdCategoria: document.querySelector("#categoria").value,
        };

        const token = await autenticado();

        if (token === false) {
            console.log("Usuário não está autenticado.");
            return;
        }

        atualizarProduto(produto, token);
        // Recarrega a página atual sem usar o cache
        document.location.reload(true);
    });

document.querySelector("#excluirProduto").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProduto = urlParams.get("idProduto");

    enviarRemoverProduto(idProduto);
});

document.querySelector("#editarImagens").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    editarImagens(idProduto);
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    carregarInformacoesProduto(idProduto);
});

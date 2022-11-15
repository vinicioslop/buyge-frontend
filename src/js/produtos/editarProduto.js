const fetchUrl = "https://localhost:7240/api";

async function carregarProduto(id) {
    const response = await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "GET",
        mode: "cors",
    });
    const produto = await response.json();

    return produto;
}

async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
    });
    const categorias = await response.json();

    return categorias;
}

async function carregarMercante(idMercante) {
    const response = await fetch(
        `${fetchUrl}/mercantes/${idMercante}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const mercante = await response.json();

    return mercante;
}

async function removerProduto(id) {
    const result = await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "DELETE",
        mode: "cors",
    });

    const response = result.status;

    return response;
}

async function atualizarProduto(produto) {
    const result = await fetch(`${fetchUrl}/produtos/${produto.cdProduto}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
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

async function carregarInformacoesProduto(idProduto) {
    const produto = await carregarProduto(idProduto);
    const categorias = await carregarCategorias();
    const mercante = await carregarMercante(produto.fkCdMercante);

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

const enviarRemoverProduto = (idProduto) => {
    removerProduto(idProduto);

    window.location = "/src/pages/mercantes/mercantes.html";
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    carregarInformacoesProduto(idProduto);
});

document.querySelector("#atualizarProduto").addEventListener("click", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("idProduto");

    const produto = {
        cdProduto: id,
        nmProduto: document.querySelector("#nome").value,
        dsProduto: document.querySelector("#descricao").value,
        vlProduto: parseFloat(document.querySelector("#preco").value),
        qtProduto: parseFloat(document.querySelector("#quantidade").value),
        fkCdMercante: document.querySelector("#mercador").value,
        fkCdCategoria: document.querySelector("#categoria").value,
    };

    atualizarProduto(produto);
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

const fetchUrl = "https://localhost:7240/api";

const carregarProduto = async (id) => {
    const response = await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "GET",
        mode: "cors",
    });
    const produto = await response.json();
    carregarCategorias(produto);
};

const carregarCategorias = async (produto) => {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
    });
    const categorias = await response.json();
    carregarMercante(produto, categorias);
};

const carregarMercante = async (produto, categorias) => {
    const response = await fetch(
        `${fetchUrl}/mercantes/${produto.fkCdMercante}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const mercante = await response.json();
    carregarInformacoesProduto(produto, categorias, mercante);
};

const removerProduto = async (id) => {
    await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "DELETE",
        mode: "cors",
    });
};

const atualizarProduto = async (produto, id) => {
    await fetch(`${fetchUrl}/produtos/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    });
};

const editarImagens = function (idProduto) {
    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    window.location =
        "/src/pages/produtos/produtoImagens.html?idMercante=" +
        idMercante +
        "&idProduto=" +
        idProduto;
};

const carregarInformacoesProduto = (produto, categorias, mercante) => {
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
};

const enviarRemoverProduto = (idProduto) => {
    removerProduto(idProduto);

    window.location = "/src/pages/mercantes/mercantes.html";
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    carregarProduto(idProduto);
});

document.querySelector("#atualizarProduto").addEventListener("click", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");

    const produto = {
        cdProduto: id,
        nmProduto: document.querySelector("#nome").value,
        dsProduto: document.querySelector("#descricao").value,
        vlProduto: parseFloat(document.querySelector("#preco").value),
        qtProduto: parseFloat(document.querySelector("#quantidade").value),
        fkCdMercante: document.querySelector("#mercador").value,
        fkCdCategoria: document.querySelector("#categoria").value,
    };

    atualizarProduto(produto, id);
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

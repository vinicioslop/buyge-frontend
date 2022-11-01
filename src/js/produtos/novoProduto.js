const fetchUrl = "https://localhost:7240/api";

const enviarProduto = async (produto) => {
    const requisicao = await fetch(`${fetchUrl}/produtos`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    });
    const resposta = await requisicao.json();
};

function montar(categorias, mercantes) {
    const categoriaSelect = document.querySelector("#categoria");
    const mercanteSelect = document.querySelector("#mercador");

    categorias.forEach((categoria) => {
        let categoriaItem = document.createElement("option");
        categoriaItem.value = categoria.cdCategoria;
        categoriaItem.innerHTML = categoria.nmCategoria;

        categoriaSelect.appendChild(categoriaItem);
    });

    mercantes.forEach((mercante) => {
        let mercanteItem = document.createElement("option");
        mercanteItem.value = mercante.cdMercante;
        mercanteItem.innerHTML = mercante.nmLoja;

        mercanteSelect.appendChild(mercanteItem);
    });
}

const carregarCategorias = async () => {
    const response = await fetch(`${fetchUrl}/categorias`, { mode: "cors" });
    const categorias = await response.json();

    carregarMercantes(categorias);
};

const carregarMercantes = async (categorias) => {
    const response = await fetch(`${fetchUrl}/mercantes`, { mode: "cors" });
    const mercantes = await response.json();

    montar(categorias, mercantes);
};

document.querySelector("#enviar").addEventListener("click", (e) => {
    e.preventDefault();

    let produto = {
        nmProduto: document.querySelector("#nome").value,
        dsProduto: document.querySelector("#descricao").value,
        vlProduto: parseFloat(document.querySelector("#preco").value),
        qtProduto: parseFloat(document.querySelector("#quantidade").value),
        fkCdMercante: parseInt(document.querySelector("#mercador").value),
        fkCdCategoria: parseInt(document.querySelector("#categoria").value)
    };

    enviarProduto(produto);

    window.location = "/src/pages/produtos/produtos.html";
    // Recarrega a página atual sem usar o cache
    //document.location.reload(true);
});

document.addEventListener("DOMContentLoaded", carregarCategorias());

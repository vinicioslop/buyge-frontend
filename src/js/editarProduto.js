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
    carregarImagemProduto(produto, produto.cdProduto);
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

/*const carregarImagemProduto = async (produto, id) => {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagem/${id}`, {
        method: "GET",
        mode: "cors",
    });
    const imagens = await response.json();
    carregarInformacoesImagem(produto, imagens);
};

const atualizarImagem = async (imagem, id) => {
    await fetch(`${fetchUrl}/produtos/produto-imagem/${id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imagem),
    });
};*/

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

/*const carregarInformacoesImagem = (produto, imagens) => {
    const codigoImagemSelect = document.querySelector('#codigoImagem');
    const imagemUrl = document.querySelector("#imagemUrl");
    const descricaoImagem = document.querySelector("#descricaoImagem");
    const produtoSelect = document.querySelector("#produto");

    let produtoImagem = document.createElement("option");
    produtoImagem.value = imagens[0].cdProdutoImagem;
    produtoImagem.innerHTML = imagens[0].cdProdutoImagem;

    imagemUrl.value = imagens[0].imgProduto;
    descricaoImagem.value = imagens[0].dsImagemProduto;

    let produtoCodigo = document.createElement("option");
    produtoCodigo.value = produto.cdProduto;
    produtoCodigo.innerHTML = produto.nmProduto;

    codigoImagemSelect.append(produtoImagem);
    produtoSelect.append(produtoCodigo);
};*/

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");

    carregarProduto(id);
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

/*document.querySelector("#atualizarImagem").addEventListener("click", (e) => {
    e.preventDefault();

    let imagem = {
        cdProdutoImagem: document.querySelector('#codigoImagem').value,
        imgProduto: document.querySelector("#imagemUrl").value,
        dsImagemProduto: document.querySelector("#descricaoImagem").value,
        fkCdProduto: document.querySelector("#produto").value
    };

    atualizarImagem(imagem, imagem.cdProdutoImagem);
    // Recarrega a página atual sem usar o cache
    document.location.reload(true);
});*/

document.getElementsByClassName("excluir")[0].addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");

    removerProduto(id);
});

document.getElementsById("editarImagens").addEventListener("click", () => {
    window.location.href = '/src/pages/produtoImagens.html';
});

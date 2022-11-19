const fetchUrl = "https://localhost:7240/api";

async function carregarMercantes() {
    const response = await fetch(`${fetchUrl}/mercantes`, {
        method: "GET",
        mode: "cors",
    });
    const mercantes = await response.json();

    return mercantes;
}

function produtosMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
}

function editarMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/editarMercante.html?idMercante=" + idMercante;
}

function montarCartoes(mercantes) {
    const mercantesContainer = document.querySelector(".mercantes");

    mercantes.forEach((mercante) => {
        let cartao = document.createElement("div");
        cartao.classList.add("mercante");

        let img = document.createElement("img");
        img.classList.add("logo-loja");
        img.src = mercante.imgLogo;

        let informacoes = document.createElement("div");
        informacoes.classList.add("informacoes");

        let nomeloja = document.createElement("h1");
        nomeloja.classList.add("nome-loja");
        nomeloja.innerText = mercante.nmLoja;

        let iconesEdicao = document.createElement("div");
        iconesEdicao.classList.add("icones-edicao");
        let todosProdutos = document.createElement("div");
        todosProdutos.classList.add("edicao");
        todosProdutos.id = "todos-produtos";
        todosProdutos.innerText = "PRODUTOS";
        todosProdutos.setAttribute(
            "onclick",
            `produtosMercante(${mercante.cdMercante})`
        );
        let iconeEditar = document.createElement("div");
        iconeEditar.classList.add("edicao");
        iconeEditar.id = "editar";
        iconeEditar.innerText = "EDITAR";
        iconeEditar.setAttribute(
            "onclick",
            `editarMercante(${mercante.cdMercante})`
        );

        iconesEdicao.append(todosProdutos);
        iconesEdicao.append(iconeEditar);

        informacoes.append(nomeloja);
        informacoes.append(iconesEdicao);

        cartao.append(img);
        cartao.append(informacoes);

        mercantesContainer.append(cartao);
    });
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const mercantes = await carregarMercantes();
    montarCartoes(mercantes);
});

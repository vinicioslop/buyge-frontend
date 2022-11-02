const fetchUrl = "https://localhost:7240/api";

const carregarMercantes = async () => {
    const response = await fetch(`${fetchUrl}/mercantes`, {
        method: "GET",
        mode: "cors",
    });
    const mercantes = await response.json();
    montarCartoes(mercantes);
};

const passaValor = function (idMercante) {
    window.location = "/src/pages/mercantes/editarMercante.html?idMercante=" + idMercante;
};

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
        let iconeEditar = document.createElement("img");
        iconeEditar.classList.add("editar");
        iconeEditar.src = "/src/icons/edit-roxo.svg";
        iconeEditar.setAttribute(
            "onclick",
            `passaValor(${mercante.cdMercante})`
        );

        iconesEdicao.append(iconeEditar);

        informacoes.append(nomeloja);
        informacoes.append(iconesEdicao);

        cartao.append(img);
        cartao.append(informacoes);

        mercantesContainer.append(cartao);
    });
}

document.addEventListener("DOMContentLoaded", carregarMercantes());

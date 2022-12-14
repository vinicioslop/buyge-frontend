async function configurarUrl() {
    const location = window.location.hostname;
    

    switch (location) {
        case "www.buyge.com.br":
            var url = "https://129.148.45.5:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
        case "127.0.0.1":
            var url = "https://localhost:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
    }
}

function retornarUrl() {
    return sessionStorage.getItem("fetchUrl");
}

async function carregarMercantes() {
    const fetchUrl = retornarUrl();

    const response = await fetch(`${fetchUrl}/mercantes`, {
        method: "GET",
        mode: "cors",
    });
    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            const resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);
            return status;
    }
}

function produtosMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
}

function editarMercante(idMercante) {
    window.location =
        "/src/pages/mercantes/mercante.html?idMercante=" + idMercante;
}

function montarCartoes(mercantes) {
    const mercantesContainer = document.querySelector(".mercantes");

    mercantes.forEach((mercante) => {
        let cartao = document.createElement("div");
        cartao.classList.add("mercante");

        let img = document.createElement("img");
        img.classList.add("logo-loja");
        img.src = mercante.imgLogoLink;

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

    await configurarUrl();

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
    }

    //const idCliente = sessionStorage.getItem("idCliente");
    //const mercantesResposta = await carregarMercantes(idCliente, token);
    const mercantesResposta = await carregarMercantes();

    if (mercantesResposta.status !== 200) {
        console.log(
            "Ocorreu um erro ao carregar lojas. STATUS: " +
                mercantesResposta.status
        );
        return;
    }

    const mercantes = mercantesResposta.dados;

    montarCartoes(mercantes);
});

const fetchUrl = "https://localhost:7240/api";

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

async function atualizarMercante(mercante, token) {
    const requisicao = await fetch(
        `${fetchUrl}/mercantes/${mercante.cdMercante}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            },
            body: JSON.stringify(mercante),
        }
    );

    return requisicao.status;
}

async function removerMercante(idMercante, token) {
    const requisicao = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    return requisicao.status;
}

async function carregarInformacoesMercante() {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");
    const mercante = await carregarMercante(idMercante, token);

    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const descricao = document.querySelector("#descricao");

    nome.value = mercante.nmLoja;
    email.value = mercante.nmEmail;
    descricao.value = mercante.dsLoja;
}

function clicaSecaoInternaMinhaLoja(idComponente) {
    const secoes = ["perfilLoja", "dadosLoja"];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "informacoes mostrar");
        } else {
            componente.setAttribute("class", "informacoes esconder");
        }
    });
}

function clicaSecaoInternaProdutos(idComponente) {
    const secoes = ["seusProdutos", "cadastrarProdutos"];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "informacoes mostrar");
        } else {
            componente.setAttribute("class", "informacoes esconder");
        }
    });
}

function clicaSecao(idComponente) {
    const secoes = [
        "secaoMinhaLoja",
        "secaoProdutos",
        "secaoVenda",
        "secaoMensagens",
        "secaoSaldo",
    ];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "conteudo mostrar");
        } else {
            componente.setAttribute("class", "conteudo esconder");
        }
    });
}

document.querySelector("#enviar").addEventListener("click", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");
    const idCliente = sessionStorage.getItem("idCliente");

    const mercante = {
        cdMercante: parseInt(idMercante),
        nmLoja: document.querySelector("#nome").value,
        nmEmail: document.querySelector("#desc").value,
        dsLoja: document.querySelector("#descricao").value,
        fkCdCliente: parseInt(idCliente),
    };

    const status = await atualizarMercante(mercante, token);

    switch (status) {
        case 200:
            console.log("Lojista atualizado.");
            break;
        default:
            console.log("Ocorreu um erro na requisição. STATUS" + status);
            break;
    }
});

document.querySelector("#enviar").addEventListener("click", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");

    const status = await removerMercante(idMercante, token);

    switch (status) {
        case 200:
            console.log("Loja removida com sucesso!");
            window.location = "/src/pages/mercantes/mercantes.html";
            break;
        default:
            console.log("Ocorreu uma falha na requisicao. STATUS: " + status);
            break;
    }
});

document.addEventListener("DOMContentLoaded", carregarInformacoesMercante());

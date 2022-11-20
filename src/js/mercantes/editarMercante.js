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

    const idCliente = sessionStorage.getItem("idCliente");

    const nome = document.querySelector("#nome");
    const descricao = document.querySelector("#descricao");
    const logoUrl = document.querySelector("#logoUrl");
    const cnpj = document.querySelector("#cnpj");

    nome.value = mercante.nmLoja;
    descricao.value = mercante.dsLoja;
    logoUrl.value = mercante.imgLogo;
    cnpj.value = mercante.nrCnpj;
}

document
    .querySelector("#atualizarMercante")
    .addEventListener("click", async (e) => {
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
            dsLoja: document.querySelector("#descricao").value,
            imgLogo: document.querySelector("#logoUrl").value,
            nrCnpj: document.querySelector("#cnpj").value,
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

document
    .querySelector("#excluirMercante")
    .addEventListener("click", async (e) => {
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
                console.log(
                    "Ocorreu uma falha na requisicao. STATUS: " + status
                );
                break;
        }
    });

document.addEventListener("DOMContentLoaded", carregarInformacoesMercante());

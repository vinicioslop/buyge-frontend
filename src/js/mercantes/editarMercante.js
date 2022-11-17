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

async function carregarCliente(idCliente, token) {
    const response = await fetch(`${fetchUrl}/clientes/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const cliente = await response.json();

    return cliente;
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

async function enviarRemoverMercante(idMercante) {
    const token = autenticado();

    if (token === null) {
        console.log("Usuário não autenticado");
        return;
    } else {
        const resposta = await removerMercante(idMercante, token);
        console.log(resposta);

        // Recarrega a página atual sem usar o cache
        window.location = "/src/pages/mercantes/mercantes.html";
    }
}

async function carregarInformacoesMercante() {
    const token = autenticado();

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");
    const mercante = await carregarMercante(idMercante, token);

    const idCliente = sessionStorage.getItem("idCliente");
    const cliente = await carregarCliente(idCliente, token);

    const nome = document.querySelector("#nome");
    const descricao = document.querySelector("#descricao");
    const logoUrl = document.querySelector("#logoUrl");
    const cnpj = document.querySelector("#cnpj");

    nome.value = mercante.nmLoja;
    descricao.value = mercante.dsLoja;
    logoUrl.value = mercante.imgLogo;
    cnpj.value = mercante.nrCnpj;
}

function autenticado() {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
        return token;
    }

    return null;
}

document.querySelector("#atualizarMercante").addEventListener("click", (e) => {
    e.preventDefault();

    const token = autenticado();

    if (token === false) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");

    const mercante = {
        cdMercante: parseInt(idMercante),
        nmLoja: document.querySelector("#nome").value,
        dsLoja: document.querySelector("#descricao").value,
        imgLogo: document.querySelector("#logoUrl").value,
        nrCnpj: document.querySelector("#cnpj").value,
        fkCdCliente: null,
    };

    atualizarMercante(mercante, token);
    // Recarrega a página atual sem usar o cache
    //document.location.reload(true);
});

document.querySelector("#excluirMercante").addEventListener("click", () => {
    const token = autenticado();

    if (token === false) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");

    enviarRemoverMercante(idMercante, token);
});

document.addEventListener("DOMContentLoaded", carregarInformacoesMercante());

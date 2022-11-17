const fetchUrl = "https://localhost:7240/api";

async function enviarMercante(mercante, token) {
    const requisicao = await fetch(`${fetchUrl}/mercantes`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(mercante),
    });
    const resposta = await requisicao.status;

    return resposta;
}

async function carregarCliente(idCliente, token) {
    const response = await fetch(`${fetchUrl}/clientes/${idCliente}`, {
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

function autenticado() {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
        return token;
    }

    return null;
}

async function montar() {
    const token = autenticado();

    if (token === false) {
        console.log("Usuário não autenticado");
        return;
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const cliente = await carregarCliente(idCliente, token);
    const clienteSelect = document.querySelector("#administrador");

    let clienteItem = document.createElement("option");
    clienteItem.value = cliente.cdCliente;
    clienteItem.innerHTML = cliente.nmCliente;
    clienteItem.selected = true;

    clienteSelect.appendChild(clienteItem);
}

document
    .querySelector("#enviarMercante")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const mercador = {
            nmLoja: document.querySelector("#nome").value,
            dsLoja: document.querySelector("#descricao").value,
            imgLogo: document.querySelector("#logoUrl").value,
            nrCnpj: document.querySelector("#cnpj").value,
            fkCdCliente: document.querySelector("#administrador").value,
        };

        const token = sessionStorage.getItem("token");
        const resposta = await enviarMercante(mercador, token);

        if (resposta === 201) {
            window.location = "/src/pages/mercantes/mercantes.html";
        } else {
            console.log("Ocorreu um erro");
        }
    });

document.addEventListener("DOMContentLoaded", montar(), autenticado());

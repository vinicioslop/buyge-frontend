const fetchUrl = "https://localhost:7240/api";

async function buscarClienteLogado(idCliente, token) {
    const response = await fetch(`${fetchUrl}/clientes/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = await response.status;

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

async function atualizarCliente(cliente, token) {
    const result = await fetch(`${fetchUrl}/clientes/${cliente.cdCliente}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(cliente),
    });

    const response = await result.status;

    return response;
}

function removeSessao() {
    sessionStorage.clear();
}

async function testarToken(token) {
    const requisicao = await fetch(`${url}/token`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = await requisicao.status;
    console.log(status);

    switch (status) {
        case 200:
            return true;
        case 401:
            return false;
    }
}

async function testar() {
    const token = sessionStorage.getItem("token");
    const valido = await testarToken(token);

    if (valido) {
        console.log("Sessão válida");
        return true;
    } else {
        removeSessao();
        console.log("Desconectado");
        return false;
    }
}
function insereInformaçõesUsuário(cliente) {
    const nome = document.getElementById("nomeCliente");
    const sobrenome = document.getElementById("sobrenomeCliente");
    const email = document.getElementById("emailCliente");
    const cpf = document.getElementById("cpfCliente");
    const telefone = document.getElementById("numeroTelefone");
    const dataNasc = document.getElementById("dataNascimento");

    const data = new Date(cliente.dtNascimento).toLocaleDateString().toString();

    let dataNascimento =
        data[6] +
        data[7] +
        data[8] +
        data[9] +
        "-" +
        data[3] +
        data[4] +
        "-" +
        data[0] +
        data[1];

    nome.value = cliente.nmCliente;
    sobrenome.value = cliente.nmSobrenome;
    email.value = cliente.nmEmail;
    cpf.value = cliente.nrCpf;
    telefone.value = cliente.nrTelefone;
    dataNasc.value = dataNascimento;
}

function clicaSecao(secaoClicada) {
    const secoes = [
        "secaoMeusDados",
        "secaoEndereco",
        "secaoCompras",
        "secaoSeguranca",
    ];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === secaoClicada) {
            componente.setAttribute("class", "conteudo mostrar");
        } else {
            componente.setAttribute("class", "conteudo esconder");
        }
    });
}

document
    .querySelector("#atualizarCliente")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        const idCliente = parseInt(sessionStorage.getItem("idCliente"));

        const valido = await testar();

        if (!valido) {
            console.log("Cliente não autenticado");
            window.location = "/";
        }

        const cliente = {
            cdCliente: idCliente,
            nmCliente: document.querySelector("#nomeCliente").value,
            nmSobrenome: document.querySelector("#sobrenomeCliente").value,
            nrCpf: document.querySelector("#cpfCliente").value,
            dtNascimento: document.querySelector("#dataNascimento").value,
            nrTelefone: document.querySelector("#numeroTelefone").value,
            nmEmail: document.querySelector("#emailCliente").value,
        };

        const status = await atualizarCliente(cliente, token);

        if (status === 200) {
            console.log("Cliente atualizado com sucesso");
            window.location.reload();
        } else {
            console.log("Ocorreu um erro na requisição. STATUS: " + status);
        }
    });

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    const idCliente = sessionStorage.getItem("idCliente");

    const valido = await testar();

    if (!valido) {
        console.log("Cliente não autenticado");
        window.location = "/src/pages/login.html";
    }

    const clienteResposta = await buscarClienteLogado(idCliente, token);

    if (clienteResposta.status === 200) {
        insereInformaçõesUsuário(clienteResposta.dados);
    } else {
        console.log("Usuário não encontrado");
    }
});

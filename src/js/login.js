const fetchUrl = "https://localhost:7240/api";

async function logar(user) {
    const requisicao = await fetch(`${fetchUrl}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const status = await requisicao.status;

    if (status === 200) {
        const dados = await requisicao.json();

        const resposta = {
            dados: dados,
            status: status,
        };

        return resposta;
    } else {
        return status;
    }
}

function gravaSessao(idCliente, token) {
    sessionStorage.setItem("idCliente", idCliente);
    sessionStorage.setItem("token", token);
}

function mostraCaixa() {
    const container = document.querySelector(".container");

    const falha = document.createElement("div");
    falha.classList.add("falha");
    const texto = document.createElement("p");
    texto.innerText = "Email e/ou login incorretos ou inexistente!";
    const botao = document.createElement("button");
    botao.id = "fecharCaixa";
    botao.classList.add("efeito");
    botao.innerText = "OK";
    botao.setAttribute("onclick", "removeCaixa()");

    falha.appendChild(texto);
    falha.appendChild(botao);

    container.append(falha);
}

function removeCaixa() {
    const container = document.querySelector(".container");
    const falha = document.getElementsByClassName("falha")[0];

    container.removeChild(falha);
}

function criar() {
    window.location = "/src/pages/sign.html";
}

document.getElementById("entrar").addEventListener("click", async (e) => {
    e.preventDefault();

    let user = {
        login: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
    };

    const resposta = await logar(user);

    switch (resposta.status) {
        case 200:
            let dados = resposta.dados;

            let cliente = dados.cliente;
            let token = dados.token;

            gravaSessao(cliente.cdCliente, token);

            window.location.replace("/");
            break;
        case 404:
            mostraCaixa();
            break;
        default:
            mostraCaixa();
            break;
    }
});

function retornarUrl() {
    const location = window.location.hostname;

    if (location == "127.0.0.1") {
        return "https://localhost:30001/api";
    } else {
        return "https://129.148.45.5:30001/api";
    }
}

async function logar(user) {
    const fetchUrl = retornarUrl();

    const requisicao = await fetch(`${fetchUrl}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const status = requisicao.status;

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

function mostraMensagem() {
    let falhas = document.querySelectorAll(".falha");

    if (falhas.length > 0) {
        falhas.remove();
    }

    const formLogin = document.querySelector(".form-login");
    const grupoInput = document.querySelector(".grupo-input");

    const falha = document.createElement("div");
    falha.classList.add("falha");
    const texto = document.createElement("p");
    texto.innerText = "Email e/ou login incorretos ou inexistente!";

    falha.appendChild(texto);

    formLogin.insertBefore(falha, grupoInput);
}

function criar() {
    window.location = "/src/pages/sign.html";
}

document.getElementById("entrar").addEventListener("click", async (e) => {
    e.preventDefault();

    const user = {
        login: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
    };

    const resposta = await logar(user);

    switch (resposta.status) {
        case 200:
            const dados = resposta.dados;

            const cliente = dados.cliente;
            const token = dados.token;

            gravaSessao(cliente.cdCliente, token);

            window.location.replace("/");
            break;
        case 404:
            mostraMensagem();
            break;
        default:
            mostraMensagem();
            break;
    }
});

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
    const resposta = await requisicao.json();;

    return resposta;
}

function gravaSessao(cliente, token) {
    sessionStorage.setItem("idCliente", cliente.cdCliente);
    sessionStorage.setItem("token", token);

    //console.log(sessionStorage.getItem("idCliente"), sessionStorage.getItem("token"));
}

document.getElementById("entrar").addEventListener("click", async (e) => {
    e.preventDefault();

    let user = {
        login: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }

    const resposta = await logar(user);

    let cliente = resposta.cliente;
    let token = resposta.token;

    gravaSessao(cliente, token);

    window.location.replace("/");
});
const fetchUrl = "https://localhost:7240/api";

async function cadastrar(cliente) {
    const requisicao = await fetch(`${fetchUrl}/clientes`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
    });

    const status = await requisicao.status;

    return status;
}

function entrar() {
    window.location = "/src/pages/login.html";
}

document.querySelector("#cadastrar").addEventListener("click", async (e) => {
    e.preventDefault();

    let cliente = {
        nmCliente: document.querySelector("#nome").value,
        dtNascimento: document.querySelector("#dataNasc").value,
        nmEmail: document.querySelector("#email").value,
        nmSenha: document.querySelector("#senha").value,
        nmTipoConta: document.querySelector("#tipoConta").value,
    };

    const status = await cadastrar(cliente);

    switch (status) {
        case 201:
            window.location = "/src/pages/login.html";
            break;
        case 400:
            console.log("Falha na criação da conta.");
            break;
        default:
            console.log("Falha na auntenticação");
            break;
    }

    if (resposta === 201) {
    } else {
        console.log("Ocorreu uma falha");
    }
});

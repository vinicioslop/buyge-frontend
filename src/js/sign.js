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
    const resposta = await requisicao.status;

    return resposta;
}

document.querySelector("#cadastrar").addEventListener("click", async (e) => {
    e.preventDefault();

    let cliente = {
        nmCliente: document.querySelector("#nome").value,
        nmSobrenome: document.querySelector("#sobrenome").value,
        nrCpf: document.querySelector("#cpf").value,
        dtNascimento: document.querySelector("#dataNasc").value,
        nrTelefone: document.querySelector("#telefone").value,
        nmLogin: document.querySelector("#login").value,
        nmSenha: document.querySelector("#senha").value,
    };

    const resposta = await cadastrar(cliente);

    if (resposta === 200) {
        window.location = "/src/pages/login.html";
    } else {
        console.log("Ocorreu uma falha");
    }
});

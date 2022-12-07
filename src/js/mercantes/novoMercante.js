const fetchUrl = "https://129.148.45.5:30001/api";

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

document
    .querySelector("#enviarMercante")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        const idCliente = sessionStorage.getItem("idCliente");

        const mercante = {
            nmLoja: document.querySelector("#nome").value,
            dsLoja: document.querySelector("#descricao").value,
            imgLogo: document.querySelector("#logoUrl").value,
            nrCnpj: document.querySelector("#cnpj").value,
            fkCdCliente: parseInt(idCliente),
        };

        const resposta = await enviarMercante(mercante, token);

        switch (resposta.status) {
            case 201:
                console.log("Loja adicionada com sucesso.");
                window.location = "/src/pages/mercantes/mercantes.html";
            default:
                console.log(
                    "Ocorreu um erro durante a requisição. STATUS: " +
                        resposta.status
                );
                break;
        }
    });

const fetchUrl = "http://129.148.45.5:30001/api";

async function enviarMercante(mercante, token) {
    const requisicao = await fetch(`${fetchUrl}/mercantes/cadastrar`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(mercante),
    });
    const resposta = requisicao.status;

    return resposta;
}

document
    .querySelector("#enviarMercante")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");
        const idCliente = sessionStorage.getItem("idCliente");

        const mercante = {
            nmLoja: document.querySelector("#nomeMercanteNovo").value,
            dsLoja: document.querySelector("#descricaoMercanteNovo").value,
            imgLogoLink: document.querySelector("#logoUrlMercanteNovo").value,
            imgLogo: null,
            nrCnpj: document.querySelector("#cnpjMercanteNovo").value,
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

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "/";
    }
});

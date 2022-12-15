async function configurarUrl() {
    const location = window.location.hostname;
    

    switch (location) {
        case "www.buyge.com.br":
            var url = "https://https://129.148.45.5:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
        case "127.0.0.1":
            var url = "https://localhost:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
    }
}

function retornarUrl() {
    return sessionStorage.getItem("fetchUrl");
}

async function enviarMercante(mercante, token) {
    const fetchUrl = retornarUrl();

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

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    await configurarUrl();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "/";
    }
});

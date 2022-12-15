//const fetchUrl = "https://129.148.45.5:30001/api";
const fetchUrl = "https://localhost:30001/api";

async function salvarDadosCompra(idCliente, token, novaCompra) {
    const response = await fetch(`${fetchUrl}/comprar/salvar/${idCliente}`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(novaCompra),
    });

    const status = response.status;

    switch (status) {
        case 201:
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

async function salvarCompra(respostaMercadoPago) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Inválido");
    }

    const idCliente = sessionStorage.getItem("idCliente");

    respostaMercadoPago.fkCdCliente = idCliente;

    const respostaCompra = await salvarDadosCompra(
        idCliente,
        token,
        respostaMercadoPago
    );

    if (respostaCompra.status === 201) {
        console.log("Compra Salva");
    } else {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + respostaCompra.status
        );
    }
}

function exibeResultados(resultado) {
    /*
    const allStatus = [
        "approved",
        "pending",
        "rejected",
        "authorized",
        "in_process",
        "in_mediation",
        "cancelled",
        "refunded",
        "charged_back",
    ];
    */

    const componentes = document.querySelectorAll(".resultado-compra");

    componentes.forEach((componente) => {
        if (componente.id == resultado) {
            componente.className = "resultado-compra mostrar";
        } else {
            componente.className = "resultado-compra esconder";
        }
    });
}

function acompanharCompra() {
    window.location = "/src/pages/usuario/usuario.html?pedidos";
}

function voltaInicio() {
    window.location = "/";
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const statusCompra = urlParams.get("status");

    if (statusCompra === null) {
        window.location = "/";
    }

    const respostaMercadoPago = {
        idPreferencia: urlParams.get("preference_id"),
        nmCollectionId: urlParams.get("collection_id"),
        nmCollectionStatus: urlParams.get("collection_status"),
        nmPaymentId: urlParams.get("payment_id"),
        nmStatus: urlParams.get("status"),
        nmPaymentType: urlParams.get("payment_type"),
        nmMerchantOrderId: urlParams.get("merchant_order_id"),
        fkCdCliente: null,
    };

    await salvarCompra(respostaMercadoPago);

    switch (statusCompra) {
        case "approved":
            exibeResultados("approved");
            return;

        case "pending":
            exibeResultados("pending");
            return;

        case "rejected":
            exibeResultados("rejected");
            return;

        case "authorized":
            exibeResultados("authorized");
            return;

        case "in_process":
            exibeResultados("in_process");
            return;

        case "in_mediation":
            exibeResultados("in_mediation");
            return;

        case "cancelled":
            exibeResultados("cancelled");
            return;

        case "refunded":
            exibeResultados("refunded");
            return;

        case "charged_back":
            exibeResultados("charged_back");
            return;
    }

    exibeResultados(statusCompra);
});

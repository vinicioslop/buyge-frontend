const fetchUrl = "https://localhost:7240/api";

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

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const statusCompra = urlParams.get("collection_status");

    switch (statusCompra) {
        case "approved":
            let respostaMercadoPago = {
                idPreferencia: urlParams.get("preference_id"),
                nmCollectionId: urlParams.get("collection_id"),
                nmCollectionStatus: urlParams.get("collection_status"),
                nmPaymentId: urlParams.get("payment_id"),
                nmStatus: urlParams.get("status"),
                nmPaymentType: urlParams.get("payment_type"),
                nmMerchantOrderId: urlParams.get("merchant_order_id"),
                fkCdCliente: null,
            };

            const respostaSalvarCompra = await salvarCompra(
                respostaMercadoPago
            );

            break;
        case "pending":
            console.log("Pendente");
            break;
        case "rejected":
            console.log("Rejeitado");
            break;
        case "authorized":
            console.log("Autorizado");
            break;
        case "in_process":
            console.log("Em processo");
            break;
        case "in_mediation":
            console.log("Em mediação");
            break;
        case "cancelled":
            console.log("Cancelado");
            break;
        case "refunded":
            console.log("Reembolso");
            break;
        case "charged_back":
            console.log("Devolvido");
            break;
    }
});

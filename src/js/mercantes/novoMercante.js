const fetchUrl = "https://localhost:7240/api";

const enviarMercante = async (mercante) => {
    const requisicao = await fetch(`${fetchUrl}/mercantes`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mercante),
    });
    const resposta = await requisicao.json();
};

const carregarCLientes = async () => {
    const response = await fetch(`${fetchUrl}/clientes`, {
        mode: "cors",
    });
    const clientes = await response.json();

    montar(clientes);
};

function montar(clientes) {
    const clienteSelect = document.querySelector("#administrador");

    clientes.forEach((cliente) => {
        let clienteItem = document.createElement("option");
        clienteItem.value = cliente.cdCliente;
        clienteItem.innerHTML = cliente.nmCliente;

        clienteSelect.appendChild(clienteItem);
    });
}

document.querySelector("#enviarMercante").addEventListener("click", (e) => {
    e.preventDefault();

    const mercador = {
        nmLoja: document.querySelector("#nome").value,
        dsLoja: document.querySelector("#descricao").value,
        imgLogo: document.querySelector("#logoUrl").value,
        nrCnpj: document.querySelector("#cnpj").value,
        fkCdCliente: document.querySelector("#administrador").value,
    };

    enviarMercante(mercador);

    // Recarrega a página atual sem usar o cache
    document.location.reload(true);

    window.location = "/src/pages/mercantes/mercantes.html";
});

document.addEventListener("DOMContentLoaded", carregarCLientes());

const fetchUrl = "https://localhost:7240/api";

const carregarMercante = async (idMercante) => {
    const response = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "GET",
        mode: "cors",
    });
    const mercante = await response.json();
    carregarCliente(mercante);
};

const carregarCliente = async (mercante) => {
    const response = await fetch(`${fetchUrl}/clientes/${mercante.fkCdCliente}`, {
        method: "GET",
        mode: "cors",
    });
    const cliente = await response.json();
    carregarInformacoesMercante(mercante, cliente);
};

const atualizarMercante = async (mercante) => {
    await fetch(`${fetchUrl}/mercantes/${mercante.cdMercante}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mercante),
    });
};

const removerMercante = async (idMercante) => {
    await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "DELETE",
        mode: "cors",
    });
};

const enviarRemoverMercante = (idMercante) => {
    removerMercante(idMercante);

    // Recarrega a página atual sem usar o cache
    window.location.replace("/src/pages/mercantes/mercantes.html");
};

const carregarInformacoesMercante = (mercante, cliente) => {
    const nome = document.querySelector("#nome");
    const descricao = document.querySelector("#descricao");
    const logoUrl = document.querySelector("#logoUrl");
    const cnpj = document.querySelector("#cnpj");
    const administradorSelect = document.querySelector("#administrador");

    nome.value = mercante.nmLoja;
    descricao.value = mercante.dsLoja;
    logoUrl.value = mercante.imgLogo;
    cnpj.value = mercante.nrCnpj;

    let adminstradoritem = document.createElement("option");
    adminstradoritem.value = mercante.fkCdCliente;
    adminstradoritem.innerHTML = cliente.nmCliente;

    administradorSelect.append(adminstradoritem);
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    carregarMercante(idMercante);
});

document.querySelector("#atualizarMercante").addEventListener("click", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    const mercador = {
        cdMercante: idMercante,
        nmLoja: document.querySelector("#nome").value,
        dsLoja: document.querySelector("#descricao").value,
        imgLogo: document.querySelector("#logoUrl").value,
        nrCnpj: document.querySelector("#cnpj").value,
        fkCdCliente: document.querySelector("#administrador").value
    }

    atualizarMercante(mercador);
    // Recarrega a página atual sem usar o cache
    document.location.reload(true);
});

document.querySelector("#excluirMercante").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    enviarRemoverMercante(idMercante);
});

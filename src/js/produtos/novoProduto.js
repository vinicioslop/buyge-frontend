const fetchUrl = "https://localhost:7240/api";

String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};

function mascaraMoeda(campo, evento) {
    var tecla = !evento ? window.event.keyCode : evento.which;
    var valor = campo.value.replace(/[^\d]+/gi, "").reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length; ) {
        if (mascara.charAt(x) != "#") {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}

async function enviarProduto(produto, token) {
    const requisicao = await fetch(`${fetchUrl}/produtos`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(produto),
    });
    const resposta = await requisicao.json();

    return resposta;
}

async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    });
    const categorias = await response.json();

    return categorias;
}

async function carregarMercante(idMercante, token) {
    const response = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const mercante = await response.json();

    return mercante;
}

async function montar() {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Usuário não está autenticado.");
        return;
    }

    const categorias = await carregarCategorias();
    const categoriaSelect = document.querySelector("#categoria");

    categorias.forEach((categoria) => {
        let categoriaItem = document.createElement("option");
        categoriaItem.value = categoria.cdCategoria;
        categoriaItem.innerHTML = categoria.nmCategoria;

        categoriaSelect.appendChild(categoriaItem);
    });
}

document.querySelector("#enviar").addEventListener("click", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");

    let produto = {
        nmProduto: document.querySelector("#nome").value,
        dsProduto: document.querySelector("#descricao").value,
        vlProduto: parseFloat(document.querySelector("#preco").value),
        qtProduto: parseInt(document.querySelector("#quantidade").value),
        fkCdMercante: parseInt(idMercante),
        fkCdCategoria: parseInt(document.querySelector("#categoria").value),
    };

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Usuário não está autenticado.");
        return;
    }

    enviarProduto(produto, token);

    window.location =
        "/src/pages/mercantes/produtosMercante.html?idMercante=" + idMercante;
});

document.addEventListener("DOMContentLoaded", montar());

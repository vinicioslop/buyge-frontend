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

const enviarProduto = async (produto) => {
    const requisicao = await fetch(`${fetchUrl}/produtos`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
    });
    const resposta = await requisicao.json();
};

function montar(mercante, categorias) {
    const categoriaSelect = document.querySelector("#categoria");
    const mercanteSelect = document.querySelector("#mercador");

    categorias.forEach((categoria) => {
        let categoriaItem = document.createElement("option");
        categoriaItem.value = categoria.cdCategoria;
        categoriaItem.innerHTML = categoria.nmCategoria;

        categoriaSelect.appendChild(categoriaItem);
    });

    let mercanteItem = document.createElement("option");
    mercanteItem.value = mercante.cdMercante;
    mercanteItem.innerHTML = mercante.nmLoja;

    mercanteSelect.appendChild(mercanteItem);
}

const carregarCategorias = async (mercante) => {
    const response = await fetch(`${fetchUrl}/categorias`, { mode: "cors" });
    const categorias = await response.json();

    montar(mercante, categorias);
};

const carregarMercante = async (idMercante) => {
    const response = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "GET",
        mode: "cors",
    });
    const mercante = await response.json();
    carregarCategorias(mercante);
};

document.querySelector("#enviar").addEventListener("click", (e) => {
    e.preventDefault();

    let produto = {
        nmProduto: document.querySelector("#nome").value,
        dsProduto: document.querySelector("#descricao").value,
        vlProduto: parseFloat(document.querySelector("#preco").value),
        qtProduto: parseFloat(document.querySelector("#quantidade").value),
        fkCdMercante: parseInt(document.querySelector("#mercador").value),
        fkCdCategoria: parseInt(document.querySelector("#categoria").value),
    };

    enviarProduto(produto);

    window.location = "/src/pages/produtos/produtos.html";
    // Recarrega a página atual sem usar o cache
    //document.location.reload(true);
});

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const idMercante = urlParams.get("idMercante");

    carregarMercante(idMercante);
});

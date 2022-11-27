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

function recarregar() {
    window.location.reload();
}

async function carregarMercantes(idVendedor, token) {
    const response = await fetch(
        `${fetchUrl}/mercantes/vendedor/${idVendedor}`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );
    const mercantes = await response.json();

    return mercantes;
}

async function atualizarMercante(mercante, token) {
    const requisicao = await fetch(
        `${fetchUrl}/mercantes/${mercante.cdMercante}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            },
            body: JSON.stringify(mercante),
        }
    );

    return requisicao.status;
}

async function removerMercante(idMercante, token) {
    const requisicao = await fetch(`${fetchUrl}/mercantes/${idMercante}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    return requisicao.status;
}

async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const categorias = await response.json();

    return categorias;
}

async function cadastrarProduto(produto, token) {
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

async function carregarProdutos(idMercante) {
    const response = await fetch(
        `${fetchUrl}/produtos/mercante/${idMercante}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const produtos = await response.json();

    return produtos;
}

async function carregarProduto(idProduto) {
    const response = await fetch(`${fetchUrl}/produtos/${idProduto}`, {
        method: "GET",
        mode: "cors",
    });
    const produto = await response.json();

    return produto;
}

async function atualizarProduto(produto, token) {
    const requisicao = await fetch(
        `${fetchUrl}/produtos/${produto.cdProduto}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            },
            body: JSON.stringify(produto),
        }
    );

    return requisicao.status;
}

async function apagarProduto(idProduto, token) {
    const requisicao = await fetch(`${fetchUrl}/produtos/${idProduto}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    return requisicao.status;
}

async function carregarImagens() {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagem/`, {
        method: "GET",
        mode: "cors",
    });
    const imagens = await response.json();

    return imagens;
}

async function removerProduto(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const status = await apagarProduto(idProduto, token);

    switch (status) {
        case 200:
            console.log("Produto removido com sucesso!");
            window.location.reload();
            break;
        default:
            console.log("Ocorreu uma falha na requisicao. STATUS: " + status);
            break;
    }
}

function editarProduto(idProduto) {
    clicaSecaoInternaProdutos("editarProduto");

    carregarInformacoesEditarProduto(idProduto);
}

async function montarCategorias() {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Usuário não está autenticado.");
        return;
    }

    const categorias = await carregarCategorias();
    const categoriaSelect = document.querySelector("#categoriaProduto");

    categorias.forEach((categoria) => {
        let categoriaItem = document.createElement("option");
        categoriaItem.value = categoria.cdCategoria;
        categoriaItem.innerHTML = categoria.nmCategoria;

        categoriaSelect.appendChild(categoriaItem);
    });
}

async function montarCategoriasEdicao(cdCategoria) {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Usuário não está autenticado.");
        return;
    }

    const categorias = await carregarCategorias();
    const categoriaSelectEdicao = document.querySelector(
        "#categoriaProdutoEdicao"
    );

    categorias.forEach((categoria) => {
        let categoriaItem = document.createElement("option");
        categoriaItem.value = categoria.cdCategoria;
        categoriaItem.innerHTML = categoria.nmCategoria;

        if (cdCategoria == categoria.cdCategoria) {
            categoriaItem.selected = true;
        }

        categoriaSelectEdicao.appendChild(categoriaItem);
    });
}

async function montarProdutos() {
    /*
    <div class="item">
        <div class="fundo">
            <img
                src="/src/icons/image-preto.svg"
                alt=""
                class="imagem"
            />
        </div>
        <div class="nome-data-criacao">
            <h4 class="nome-produto">
                Nome do Produto
            </h4>
            <p class="criacao">Criado em 00/00/0000</p>
        </div>
        <div class="disponibilidade">Desabilitado</div>
        <div class="acoes">
            <img
                src="/src/icons/menu-scale-preto.svg"
                alt=""
            />
        </div>
    </div>
    */

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const idVendedor = sessionStorage.getItem("idCliente");

    const produtos = await carregarProdutos(idVendedor);
    const imagens = await carregarImagens();

    const produtosImagens = [];
    const codigosProdutos = [];

    produtos.forEach((produto) => {
        codigosProdutos.push(produto.cdProduto);
    });

    imagens.forEach((imagem) => {
        codigosProdutos.forEach((codigo) => {
            if (imagem.fkCdProduto === codigo && imagem.idPrincipal === 1) {
                produtosImagens.push(imagem);
            }
        });
    });

    const todosProdutos = document.querySelector("#todosProdutos");

    produtos.forEach((produto) => {
        let imagem = {};

        produtosImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagem = produtoImagem;
            }
        });

        const item = document.createElement("div");
        item.className = "item";

        item.innerHTML = `
        <div class="fundo">
            <img
                src="${imagem.imgProdutoLink}"
                alt=""
                class="imagem"
            />
        </div>
        <div class="nome-data-criacao">
            <h4 class="nome-produto">
                ${produto.nmProduto}
            </h4>
            <p class="criacao">Criado em ${produto.dtCriacao}</p>
        </div>
        <div class="disponibilidade">Desabilitado</div>
        <div class="acoes">
            <img
                src="/src/icons/tres-pontinhos-branco.svg"
                alt=""
            />
        </div>
        <div class="grupo-botoes">
            <a onclick="editarProduto(${produto.cdProduto})">
                <img src="/src/icons/edit-branco2.svg"/>
            </a>
            <a onclick="removerProduto(${produto.cdProduto})">
                <img src="/src/icons/bin-minus-branco.svg"/>
            </a>
        </div>
        `;

        todosProdutos.appendChild(item);
    });
}

async function carregarInformacoesMercantePerfilLoja() {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const idVendedor = sessionStorage.getItem("idCliente");
    const mercante = await carregarMercantes(idVendedor, token);

    const nome = document.querySelector("#nomePerfilLoja");
    const email = document.querySelector("#emailPerfilLoja");
    const descricao = document.querySelector("#descricaoPerfilLoja");

    nome.value = mercante[0].nmLoja;
    email.value = mercante[0].nmEmail;
    descricao.value = mercante[0].dsLoja;
}

async function carregarInformacoesEditarProduto(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const produto = await carregarProduto(idProduto);

    console.log(produto);

    montarCategoriasEdicao(produto.fkCdCategoria);

    let codigoProduto = document.querySelector("#codigoProdutoEdicao");
    let nomeProduto = document.querySelector("#nomeProdutoEdicao");
    let descProduto = document.querySelector("#descricaoProdutoEdicao");
    let precoProduto = document.querySelector("#precoProdutoEdicao");
    let quantidadeProduto = document.querySelector("#quantidadeProdutoEdicao");
    let pesoProduto = document.querySelector("#pesoProdutoEdicao");
    let tamanhoProduto = document.querySelector("#tamanhoProdutoEdicao");
    let freteProduto = document.querySelector("#freteProdutoEdicao");

    codigoProduto.value = produto.cdProduto;
    nomeProduto.value = produto.nmProduto;
    descProduto.value = produto.dsProduto;
    precoProduto.value = produto.vlProduto;
    quantidadeProduto.value = produto.qtProduto;
    pesoProduto.value = produto.vlPeso;
    tamanhoProduto.value = produto.vlTamanho;
    freteProduto.value = produto.vlFrete;
}

function clicaSecaoInternaMinhaLoja(idComponente) {
    const secoes = ["perfilLoja", "dadosLoja"];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "informacoes mostrar");
        } else {
            componente.setAttribute("class", "informacoes esconder");
        }
    });
}

function clicaSecaoInternaProdutos(idComponente) {
    const secoes = ["seusProdutos", "cadastrarProdutos", "editarProduto"];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "informacoes mostrar");
        } else {
            componente.setAttribute("class", "informacoes esconder");
        }
    });
}

function clicaSecao(secaoClicada) {
    const secoes = [
        "secaoMinhaLoja",
        "secaoProdutos",
        "secaoVenda",
        "secaoMensagens",
        "secaoSaldo",
    ];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === secaoClicada) {
            componente.setAttribute("class", "conteudo mostrar");
        } else {
            componente.setAttribute("class", "conteudo esconder");
        }
    });

    switch (secaoClicada) {
        case "secaoMinhaLoja":
            clicaSecaoInternaMinhaLoja("perfilLoja");
            break;
        case "secaoProdutos":
            clicaSecaoInternaProdutos("seusProdutos");
            break;
    }
}

document
    .querySelector("#enviarPerfilLoja")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        if (token === null) {
            console.log("Cliente não autenticado");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const idMercante = urlParams.get("idMercante");
        const idCliente = sessionStorage.getItem("idCliente");

        const mercante = {
            cdMercante: parseInt(idMercante),
            nmLoja: document.querySelector("#nomePerfilLoja").value,
            nmEmail: document.querySelector("#emailPerfilLoja").value,
            dsLoja: document.querySelector("#descricaoPerfilLoja").value,
            fkCdCliente: parseInt(idCliente),
        };

        const status = await atualizarMercante(mercante, token);

        switch (status) {
            case 200:
                console.log("Lojista atualizado.");
                window.location.reload();
                break;
            default:
                console.log("Ocorreu um erro na requisição. STATUS" + status);
                break;
        }
    });

document
    .querySelector("#cadastrarProduto")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        if (token === null) {
            console.log("Cliente não autenticado");
            return;
        }

        const idVendedor = sessionStorage.getItem("idCliente");
        const mercantes = await carregarMercantes(idVendedor, token);

        const produto = {
            nmProduto: document.querySelector("#nomeProduto").value,
            dsProduto: document.querySelector("#descricaoProduto").value,
            vlProduto: parseFloat(
                document.querySelector("#precoProduto").value
            ),
            qtProduto: parseInt(
                document.querySelector("#quantidadeProduto").value
            ),
            vlPeso: parseFloat(document.querySelector("#pesoProduto").value),
            vlTamanho: parseFloat(
                document.querySelector("#tamanhoProduto").value
            ),
            vlFrete: parseFloat(document.querySelector("#freteProduto").value),
            idDisponibilidade: 0,
            dtCricao: Date.now(),
            fkCdMercante: parseInt(mercantes[0].cdMercante),
            fkCdCategoria: parseInt(
                document.querySelector("#categoriaProduto").value
            ),
        };

        cadastrarProduto(produto, token);
    });

document
    .querySelector("#atualizarProduto")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        if (token === null) {
            console.log("Cliente não autenticado");
            return;
        }

        const idVendedor = sessionStorage.getItem("idCliente");
        const mercantes = await carregarMercantes(idVendedor, token);

        const produto = {
            cdProduto: document.querySelector("#codigoProdutoEdicao").value,
            nmProduto: document.querySelector("#nomeProdutoEdicao").value,
            dsProduto: document.querySelector("#descricaoProdutoEdicao").value,
            vlProduto: parseFloat(
                document.querySelector("#precoProdutoEdicao").value
            ),
            qtProduto: parseInt(
                document.querySelector("#quantidadeProdutoEdicao").value
            ),
            vlPeso: parseFloat(
                document.querySelector("#pesoProdutoEdicao").value
            ),
            vlTamanho: parseFloat(
                document.querySelector("#tamanhoProdutoEdicao").value
            ),
            vlFrete: parseFloat(
                document.querySelector("#freteProdutoEdicao").value
            ),
            idDisponibilidade: 1,
            dtCricao: Date.now(),
            fkCdMercante: parseInt(mercantes[0].cdMercante),
            fkCdCategoria: parseInt(
                document.querySelector("#categoriaProdutoEdicao").value
            ),
        };

        atualizarProduto(produto, token);
    });

document.querySelector("#enviar").addEventListener("click", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idMercante = urlParams.get("idMercante");

    const status = await removerMercante(idMercante, token);

    switch (status) {
        case 200:
            console.log("Loja removida com sucesso!");
            window.location = "/src/pages/mercantes/mercantes.html";
            break;
        default:
            console.log("Ocorreu uma falha na requisicao. STATUS: " + status);
            break;
    }
});

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "/";
    }

    carregarInformacoesMercantePerfilLoja();
    montarCategorias();
    montarProdutos();
});

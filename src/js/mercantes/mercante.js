const fetchUrl = "https://129.148.45.5:30001/api";

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

async function carregarEnderecoLoja(idMercante, token) {
    const response = await fetch(
        `${fetchUrl}/mercante/enderecos/${idMercante}`,
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
    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: null,
                status: status,
            };

            return resposta;
    }
}

async function cadastrarEnderecoLoja(endereco, token) {
    const response = await fetch(`${fetchUrl}/mercante/enderecos`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(endereco),
    });
    const status = response.status;

    switch (status) {
        case 201:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: null,
                status: status,
            };

            return resposta;
    }
}

async function atualizarEnderecoLoja(endereco, token) {
    const response = await fetch(
        `${fetchUrl}/mercante/enderecos/${endereco.cdEndereco}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(endereco),
        }
    );
    const status = response.status;

    switch (status) {
        case 200:
            const dados = await response.json();

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: null,
                status: status,
            };

            return resposta;
    }
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

async function cadastrarProduto(produtoComImagem, token) {
    const requisicao = await fetch(`${fetchUrl}/produtos`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(produtoComImagem),
    });
    const resposta = requisicao.status;

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
        categoriaItem.innerText = categoria.nmCategoria;

        if (cdCategoria == categoria.cdCategoria) {
            categoriaItem.selected = true;
        }

        categoriaSelectEdicao.appendChild(categoriaItem);
    });
}

async function montarDisponibilidadeEdicao(idDisponibilidade) {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Usuário não está autenticado.");
        return;
    }

    const disponibilidadeSelectEdicao = document.querySelector(
        "#disponibilidadeProdutoEdicao"
    );

    const itemIndisponivel = document.createElement("option");
    itemIndisponivel.value = 0;
    itemIndisponivel.innerHTML = "Indisponível";

    const itemDisponivel = document.createElement("option");
    itemDisponivel.value = 1;
    itemDisponivel.innerHTML = "Disponível";

    if (idDisponibilidade == 0) {
        itemIndisponivel.selected = true;
    } else {
        itemDisponivel.selected = true;
    }

    disponibilidadeSelectEdicao.appendChild(itemIndisponivel);
    disponibilidadeSelectEdicao.appendChild(itemDisponivel);
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

    const produtosAnterior = document.querySelectorAll(".produto");

    if (produtosAnterior.length > 0) {
        produtosAnterior.forEach((produto) => {
            produto.remove();
        });
    }

    const idVendedor = sessionStorage.getItem("idCliente");

    const produtos = await carregarProdutos(idVendedor);
    const imagens = await carregarImagens();

    const totalProdutos = document.querySelector("#totalProdutos");

    if (produtos.length == 0) {
        totalProdutos.innerText = `Total de ${produtos.length} produtos registrados`;
    } else if (produtos.length <= 1) {
        totalProdutos.innerText = `Total de ${produtos.length} produto registrado`;
    } else if (produtos.length > 1) {
        totalProdutos.innerText = `Total de ${produtos.length} produtos registrados`;
    }

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
        let disponibilidade = "";

        if (produto.idDisponibilidade == 1) {
            disponibilidade =
                "<div class='disponibilidade disponivel'>Disponível</div>";
        } else {
            disponibilidade =
                "<div class='disponibilidade indisponivel'>Indisponível</div>";
        }

        produtosImagens.forEach((produtoImagem) => {
            if (produtoImagem.fkCdProduto === produto.cdProduto) {
                imagem = produtoImagem;
            }
        });

        const data = new Date(produto.dtCriacao)
            .toLocaleDateString()
            .toString();

        let dataCriacao =
            data[0] +
            data[1] +
            "/" +
            data[3] +
            data[4] +
            "/" +
            data[6] +
            data[7] +
            data[8] +
            data[9];

        const item = document.createElement("div");
        item.className = "produto";

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
            <p class="criacao">Criado em ${dataCriacao}</p>
        </div>
        ${disponibilidade}
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

    if (mercante.length == 0) {
        window.location = "/";
    }

    const idMercante = document.querySelector("#idMercantePerfilLoja");
    const nome = document.querySelector("#nomePerfilLoja");
    const email = document.querySelector("#emailPerfilLoja");
    const descricao = document.querySelector("#descricaoPerfilLoja");

    idMercante.value = mercante[0].cdMercante;
    nome.value = mercante[0].nmLoja;
    email.value = mercante[0].nmEmail;
    descricao.value = mercante[0].dsLoja;
}

async function carregarInformacoesMercanteDadosLoja() {
    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const idVendedor = sessionStorage.getItem("idCliente");

    const enderecoLojaResposta = await carregarEnderecoLoja(idVendedor, token);
    const mercantes = await carregarMercantes(idVendedor, token);

    if (enderecoLojaResposta.dados.length != 0) {
        const endereco = enderecoLojaResposta.dados[0];

        const cdEndereco = document.querySelector("#cdEnderecoLoja");
        const cep = document.querySelector("#cepDadosLoja");
        const estado = document.querySelector("#sgEstadoDadosLoja");
        const municipio = document.querySelector("#cidadeDadosLoja");
        const logradouro = document.querySelector("#logradouroDadosLoja");
        const numero = document.querySelector("#numeroDadosLoja");
        const complemento = document.querySelector("#complementoDadosLoja");
        const bairro = document.querySelector("#bairroDadosLoja");

        cdEndereco.value = endereco.cdEndereco;
        cep.value = endereco.nrCep;
        estado.value = endereco.sgEstado;
        municipio.value = endereco.nmCidade;
        logradouro.value = endereco.nmLogradouro;
        numero.value = endereco.nrEndereco;
        complemento.value = "SEM CAMPO NO BANCO";
        bairro.value = endereco.nmBairro;
    }

    const fkCdMercanteLoja = document.querySelector("#fkCdMercanteLoja");
    fkCdMercanteLoja.value = mercantes[0].cdMercante;
}

async function carregarInformacoesEditarProduto(idProduto) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    const produto = await carregarProduto(idProduto);

    montarCategoriasEdicao(produto.fkCdCategoria);
    montarDisponibilidadeEdicao(produto.idDisponibilidade);

    const codigoProduto = document.querySelector("#codigoProdutoEdicao");
    const nomeProduto = document.querySelector("#nomeProdutoEdicao");
    const descProduto = document.querySelector("#descricaoProdutoEdicao");
    const precoProduto = document.querySelector("#precoProdutoEdicao");
    const quantidadeProduto = document.querySelector(
        "#quantidadeProdutoEdicao"
    );
    const pesoProduto = document.querySelector("#pesoProdutoEdicao");
    const tamanhoProduto = document.querySelector("#tamanhoProdutoEdicao");
    const freteProduto = document.querySelector("#freteProdutoEdicao");
    const idMercante = document.querySelector("#idMercanteEdicao");

    codigoProduto.value = produto.cdProduto;
    nomeProduto.value = produto.nmProduto;
    descProduto.value = produto.dsProduto;
    precoProduto.value = produto.vlProduto;
    quantidadeProduto.value = produto.qtProduto;
    pesoProduto.value = produto.vlPeso;
    tamanhoProduto.value = produto.vlTamanho;
    freteProduto.value = produto.vlFrete;
    idMercante.value = produto.fkCdMercante;
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

        const idCliente = sessionStorage.getItem("idCliente");

        const mercante = {
            cdMercante: document.querySelector("#idMercantePerfilLoja").value,
            nmLoja: document.querySelector("#nomePerfilLoja").value,
            nmEmail: document.querySelector("#emailPerfilLoja").value,
            dsLoja: document.querySelector("#descricaoPerfilLoja").value,
            fkCdCliente: idCliente,
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
    .querySelector("#atualizarDadosLoja")
    .addEventListener("click", async (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem("token");

        if (token == null) {
            console.log("Cliente não autenticado");
            window.location = "/";
        }

        const endereco = {
            cdEndereco: document.getElementById("cdEnderecoLoja").value,
            nrCep: document.getElementById("cepDadosLoja").value,
            nmBairro: document.getElementById("bairroDadosLoja").value,
            sgEstado: document.getElementById("sgEstadoDadosLoja").value,
            nmLogradouro: document.getElementById("logradouroDadosLoja").value,
            nmCidade: document.getElementById("cidadeDadosLoja").value,
            nrEndereco: document.getElementById("numeroDadosLoja").value,
            fkCdMercante: document.querySelector("#fkCdMercanteLoja"),
        };

        if (endereco.cdEndereco == null) {
            var resposta = await cadastrarEnderecoLoja(endereco, token);

            if (resposta.status === 200) {
                carregarInformacoesMercanteDadosLoja();
                clicaSecao("secaoMinhaLoja");
                clicaSecaoInternaMinhaLoja("dadosLoja");
            } else {
                console.log(
                    "Ocorreu um erro na requisição. STATUS: " + resposta.status
                );
            }
        } else {
            var resposta = await atualizarEnderecoLoja(endereco, token);

            if (resposta.status === 200) {
                carregarInformacoesMercanteDadosLoja();
                clicaSecao("secaoMinhaLoja");
                clicaSecaoInternaMinhaLoja("dadosLoja");
            } else {
                console.log(
                    "Ocorreu um erro na requisição. STATUS: " + resposta.status
                );
            }
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
            /*vlPeso: parseFloat(document.querySelector("#pesoProduto").value),
            vlTamanho: parseFloat(
                document.querySelector("#tamanhoProduto").value
            ),
            vlFrete: parseFloat(document.querySelector("#freteProduto").value),*/
            idDisponibilidade: 0,
            fkCdMercante: parseInt(mercantes[0].cdMercante),
            fkCdCategoria: parseInt(
                document.querySelector("#categoriaProduto").value
            ),
        };

        const resposta = await cadastrarProduto(produto, token);

        if (resposta == 201) {
            await montarProdutos();
            clicaSecao("secaoProdutos");
        }
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
            idDisponibilidade: parseInt(
                document.querySelector("#disponibilidadeProdutoEdicao").value
            ),
            fkCdMercante: parseInt(
                document.querySelector("#idMercanteEdicao").value
            ),
            fkCdCategoria: parseInt(
                document.querySelector("#categoriaProdutoEdicao").value
            ),
        };

        const resposta = await atualizarProduto(produto, token);

        if (resposta == 200) {
            await montarProdutos();
            clicaSecao("secaoProdutos");
        }
    });

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "/";
    }

    carregarInformacoesMercantePerfilLoja();
    carregarInformacoesMercanteDadosLoja();
    montarCategorias();
    montarProdutos();
});

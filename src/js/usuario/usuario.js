const fetchUrl = "https://129.148.45.5:30001/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
}

function removeSessao() {
    sessionStorage.clear();
}

async function testarToken(token) {
    const requisicao = await fetch(`${url}/token`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = requisicao.status;

    switch (status) {
        case 200:
            return true;
        case 401:
            return false;
    }
}

async function testar() {
    const token = sessionStorage.getItem("token");
    const valido = await testarToken(token);

    if (valido) {
        return true;
    } else {
        removeSessao();
        return false;
    }
}

async function buscarClienteLogado(idCliente, token) {
    const response = await fetch(`${fetchUrl}/cliente/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
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

async function atualizarCliente(cliente, token) {
    const result = await fetch(
        `${fetchUrl}/cliente/atualizar/${cliente.cdCliente}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(cliente),
        }
    );

    const response = result.status;

    return response;
}

async function atualizarSenha(idCliente, novaSenha, token) {
    const response = await fetch(
        `${fetchUrl}/cliente/senha/trocar/${idCliente}`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(novaSenha),
        }
    );
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

async function carregarEndereco(idEndereco, token) {
    const response = await fetch(`${fetchUrl}/endereco/${idEndereco}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = response.status;

    switch (status) {
        case 200:
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

async function carregarEnderecos(idCliente, token) {
    const response = await fetch(`${fetchUrl}/enderecos/cliente/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = response.status;

    switch (status) {
        case 200:
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

async function adicionarEndereco(endereco, token) {
    const response = await fetch(`${fetchUrl}/enderecos/adicionar`, {
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

async function atualizarEndereco(endereco, token) {
    const response = await fetch(
        `${fetchUrl}/endereco/atualizar/${endereco.cdEndereco}`,
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

async function mudarPrincipal(idEndereco, token) {
    const response = await fetch(
        `${fetchUrl}/endereco/principal/${idEndereco}`,
        {
            method: "PATCH",
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

async function removerEndereco(idEndereco, token) {
    const response = await fetch(`${fetchUrl}/endereco/remover/${idEndereco}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = response.status;

    switch (status) {
        case 200:
            return status;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);
            return status;
    }
}

async function carregarCompras(idCliente, token) {
    const response = await fetch(`${fetchUrl}/compras/${idCliente}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = response.status;

    switch (status) {
        case 200:
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

async function carregarItensCompra(idCompra, token) {
    const response = await fetch(`${fetchUrl}/compras/items/${idCompra}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
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
                dados: dados,
                status: status,
            };

            return resposta;
    }
}

async function carregarProduto(idProduto) {
    const response = await fetch(`${fetchUrl}/produto/${idProduto}`, {
        method: "GET",
        mode: "cors",
    });
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

async function carregarImagens(idProduto) {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${idProduto}/todas`,
        {
            method: "GET",
            mode: "cors",
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

async function excluirEndereco(idEndereco) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inválida!");
        window.location = "/";
    }

    const resposta = await removerEndereco(idEndereco, token);

    if (resposta == 200) {
        montarAlerta("Endereço removido com sucesso!");
        montarEnderecos();
        clicaSecao("secaoEndereco");
    }
}

async function montarEnderecos() {
    /*
    <div class="endereco">
        <div class="titulo-principal">
            <h3 class="titulo">TITULO ENDERECO</h3>
            <a href="#" class="principal-link">
                <img src="/src/icons/star-branca.svg" alt="">
            </a>
        </div>
        <div class="dados-endereco">
            <p class="logradouro-numero-bairro">Rua Um, 000 - Bairro</p>
            <p class="cidade-estado">São Paulo/São Paulo</p>
        </div>
        <a href="#" class="editar-link">
            <img src="/src/icons/edit-branco3.svg" alt="">
        </a>
    </div>
    */

    const enderecosPrevios = document.getElementsByClassName("endereco");

    if (enderecosPrevios.length > 0) {
        enderecosPrevios.forEach((endereco) => {
            endereco.remove();
        });
    }

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        return;
    }

    const idCliente = sessionStorage.getItem("idCliente");
    const enderecosResposta = await carregarEnderecos(idCliente, token);

    const enderecos = enderecosResposta.dados;

    const divEnderecos = document.querySelector(".enderecos");

    enderecos.forEach((endereco) => {
        const item = document.createElement("div");
        item.className = "endereco";

        let srcIcone = "";

        if (endereco.idPrincipal == 1) {
            srcIcone = "/src/icons/star-fill-preto.svg";
        } else {
            srcIcone = "/src/icons/star-preto.svg";
        }

        item.innerHTML = `
        <div class="titulo-principal">
            <div class="titulo-tipo">
                <h3 class="titulo">${endereco.nmTituloEndereco}</h3>
                <p class="tipo">${endereco.nmTipoEndereco}</tipo>
            </div>
            <a onclick="enviarConfirmacaoEnderecoPrincipal(event, ${endereco.cdEndereco})" class="principal-link">
                <img src="${srcIcone}" alt="">
            </a>
        </div>
        <div class="dados-endereco">
            <p class="logradouro-numero-bairro">${endereco.nmLogradouro}, ${endereco.nrEndereco} - ${endereco.nmBairro}</p>
            <p class="cidade-estado">${endereco.nmCidade}/${endereco.sgEstado}</p>
        </div>
        <a onclick="editarEndereco(${endereco.cdEndereco})" class="editar-link">
            <img src="/src/icons/edit-branco3.svg" alt="">
        </a>
        <a onclick="enviarConfirmacaoRemoverEndereco(event, ${endereco.cdEndereco})" class="remover-link">
            <img src="/src/icons/bin-minus-branco.svg" alt="">
        </a>
        `;

        divEnderecos.appendChild(item);
    });
}

async function montarCompras() {
    /*
    <div class="compra">
        <div class="fundo-imagem">
            <img src="/src/icons/image-preto.svg" alt="" />
        </div>
        <div class="nome-produto">Nome do Produto</div>
        <div class="status">Status</div>
        <div class="valor-total">Valor Total</div>
    </div>
    */

    const comprasPrevias = document.querySelectorAll(".compra");

    if (comprasPrevias.length > 0) {
        comprasPrevias.forEach((compra) => {
            compra.remove();
        });
    }

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    const idCliente = sessionStorage.getItem("idCliente");
    const comprasResposta = await carregarCompras(idCliente, token);

    const compras = comprasResposta.dados;

    const divCompras = document.querySelector(".compras");

    compras.forEach(async (compra) => {
        const item = document.createElement("div");
        item.className = "compra";

        let status = "";
        let icone = "";

        switch (compra.nmStatus) {
            case "approved":
                status = "APROVADO";
                icone = "/src/icons/shopping-bag-check-branca.svg";
                break;
            case "pending":
                status = "PENDENTE";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "rejected":
                status = "REJEITADO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "authorized":
                status = "AUTORIZADO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "in_process":
                status = "EM PROGRESSO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "in_mediation":
                status = "EM MEDIAÇÃO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "cancelled":
                status = "CANCELADO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "refunded":
                status = "DEVOLVIDO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
            case "charged_back":
                status = "REEMBOLSADO";
                icone = "/src/icons/shopping-bag-issue-branca.svg";
                break;
        }

        item.innerHTML = `
        <div class="fundo-imagem">
            <img src="${icone}" alt="" />
        </div>
        <div class="status">${status}</div>
        <div class="valor-total">${mascaraPreco(compra.vlTotalCompra)}</div>
        `;

        divCompras.appendChild(item);
    });
}

async function montarPedidos() {
    /*
    <tr class="pedido-item">
        <td>Número do Pedido</td>
        <td>Status da Compra</td>
        <td>QUANTIDADE</td>
        <td>VALOR</td>
        <td>CÓDIGO</td>
    </tr>
    */

    const pedidosPrevios = document.querySelectorAll(".pedido-item");

    if (pedidosPrevios.length > 0) {
        pedidosPrevios.forEach((pedido) => {
            pedido.remove();
        });
    }

    const token = sessionStorage.getItem("token");

    if (token === null) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    const idCliente = sessionStorage.getItem("idCliente");
    const comprasResposta = await carregarCompras(idCliente, token);

    const compras = comprasResposta.dados;

    const divPedidos = document.querySelector(".pedidos");

    compras.forEach(async (compra) => {
        const itemsCompra = await carregarItensCompra(compra.cdCompra, token);

        const itemPedido = document.createElement("tr");
        itemPedido.className = "pedido-item";

        let status = "";

        switch (compra.nmStatus) {
            case "approved":
                status = "APROVADO";
                break;
            case "pending":
                status = "PENDENTE";
                break;
            case "rejected":
                status = "REJEITADO";
                break;
            case "authorized":
                status = "AUTORIZADO";
                break;
            case "in_process":
                status = "EM PROGRESSO";
                break;
            case "in_mediation":
                status = "EM MEDIAÇÃO";
                break;
            case "cancelled":
                status = "CANCELADO";
                break;
            case "refunded":
                status = "DEVOLVIDO";
                break;
            case "charged_back":
                status = "REEMBOLSADO";
                break;
        }

        itemPedido.innerHTML = `
        <td>${compra.cdCompra}</td>
        <td>${status}</td>
        <td>${itemsCompra.dados.length}</td>
        <td>${mascaraPreco(compra.vlTotalCompra)}</td>
        <td>CÓDIGO</td>
        `;

        divPedidos.appendChild(itemPedido);
    });
}

function editarEndereco(idEndereco) {
    clicaSecaoInternaEnderecos("editarEndereco");

    insereEnderecoUsuario(idEndereco);
}

async function trocarEnderecoPrincipal(idEndereco) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inválida!");
        window.location = "/";
    }

    const resposta = await mudarPrincipal(idEndereco, token);

    if (resposta.status == 200) {
        montarAlerta("Endereço principal trocado com sucesso!");
        montarEnderecos();
        clicaSecao("secaoEndereco");
    } else {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + resposta.status
        );
    }
}

function adicionarConfirmacao(conteudo, botoesMontados) {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");
    const mensagem = document.querySelector(".mensagem");

    mensagem.innerText = conteudo;

    const botoes = document.querySelector("#botoes");

    botoesMontados.forEach((botao) => {
        botoes.appendChild(botao);
    });

    fundoMensagem.className = "mostrar-popup";
}

function removerConfirmacao() {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");

    fundoMensagem.className = "esconder-popup";
}

function montarAlerta(conteudo) {
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "OK";
    botaoConfirmar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = conteudo;

    const botoes = [botaoConfirmar];

    adicionarConfirmacao(mensagem, botoes);
}

async function insereInformacoesUsuario() {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        window.location = "";
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const clienteResposta = await buscarClienteLogado(idCliente, token);
    const cliente = clienteResposta.dados;

    const nome = document.querySelector("#nomeClienteEdicao");
    const sobrenome = document.querySelector("#sobrenomeClienteEdicao");
    const email = document.querySelector("#emailClienteEdicao");
    const cpf = document.querySelector("#cpfClienteEdicao");
    const telefone = document.querySelector("#numeroTelefoneEdicao");
    const dataNasc = document.querySelector("#dataNascimentoEdicao");

    const data = new Date(cliente.dtNascimento).toLocaleDateString().toString();

    let dataNascimento =
        data[6] +
        data[7] +
        data[8] +
        data[9] +
        "-" +
        data[3] +
        data[4] +
        "-" +
        data[0] +
        data[1];

    nome.value = cliente.nmCliente;
    sobrenome.value = cliente.nmSobrenome;
    email.value = cliente.nmEmail;
    cpf.value = cliente.nrCpf;
    telefone.value = cliente.nrTelefone;
    dataNasc.value = dataNascimento;
}

async function insereEnderecoUsuario(idEndereco) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inválida!");
        window.location = "/";
    }

    const enderecoResposta = await carregarEndereco(idEndereco, token);

    const endereco = enderecoResposta.dados;

    const cdEndereco = document.getElementById("idEnderecoEditar");
    const nmTitulo = document.getElementById("tituloEnderecoEditar");
    const nmTipo = document.getElementById("tipoEnderecoEditar");
    const cep = document.getElementById("cepClienteEditar");
    const bairro = document.getElementById("bairroClienteEditar");
    const logradouro = document.getElementById("logradouroClienteEditar");
    const cidade = document.getElementById("cidadeClienteEditar");
    const numero = document.getElementById("numeroClienteEditar");

    const opcaoEstado = document.querySelector("#" + endereco.sgEstado);

    cdEndereco.value = endereco.cdEndereco;
    cep.value = endereco.nrCep;
    bairro.value = endereco.nmBairro;
    opcaoEstado.selected = true;
    logradouro.value = endereco.nmLogradouro;
    cidade.value = endereco.nmCidade;
    numero.value = endereco.nrEndereco;
    nmTitulo.value = endereco.nmTituloEndereco;
    nmTipo.value = endereco.nmTipoEndereco;
}

function clicaSecaoInternaEnderecos(idComponente) {
    const secoes = ["meusEnderecos", "novoEndereco", "editarEndereco"];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "informacoes mostrar");
        } else {
            componente.setAttribute("class", "informacoes esconder");
        }
    });
}

function clicaSecaoInternaCompras(idComponente) {
    const secoes = ["pedidos", "historico"];

    secoes.forEach((secao) => {
        const componente = document.querySelector("#" + secao);

        if (secao === idComponente) {
            componente.setAttribute("class", "informacoes mostrar");
        } else {
            componente.setAttribute("class", "informacoes esconder");
        }
    });
}

function clicaSecaoInternaSeguranca(idComponente) {
    const secoes = ["trocarDeSenha"];

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
        "secaoMeusDados",
        "secaoEndereco",
        "secaoCompras",
        "secaoSeguranca",
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
        case "secaoEndereco":
            clicaSecaoInternaEnderecos("meusEnderecos");
            break;
    }
}

async function enviarConfirmacaoRemoverEndereco(event, idEndereco) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute("onclick", `excluirEndereco(${idEndereco})`);

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja remover o endereço selecionado?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

async function enviarConfirmacaoEnderecoPrincipal(event, idEndereco) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute(
        "onclick",
        `trocarEnderecoPrincipal(${idEndereco})`
    );

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja selecionar o endereço como principal?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

function enviarConfirmacaoAtualizarEndereco(event) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute("onclick", "enviarAtualizarEndereco()");

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja confirmar as alterações?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

async function enviarAtualizarEndereco() {
    const token = sessionStorage.getItem("token");
    const idCliente = parseInt(sessionStorage.getItem("idCliente"));

    const valido = await testar();

    if (!valido) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    const endereco = {
        cdEndereco: document.getElementById("idEnderecoEditar").value,
        nrCep: document.getElementById("cepClienteEditar").value,
        nmBairro: document.getElementById("bairroClienteEditar").value,
        sgEstado: document.getElementById("sgEstadoEditar").value,
        nmLogradouro: document.getElementById("logradouroClienteEditar").value,
        nmCidade: document.getElementById("cidadeClienteEditar").value,
        nrEndereco: document.getElementById("numeroClienteEditar").value,
        nmTituloEndereco: document.getElementById("tituloEnderecoEditar").value,
        nmTipoEndereco: document.getElementById("tipoEnderecoEditar").value,
        fkCdCliente: idCliente,
    };

    const resposta = await atualizarEndereco(endereco, token);

    if (resposta.status === 200) {
        montarAlerta("Endereço atualizado com sucesso!");
        montarEnderecos();
        clicaSecao("secaoEndereco");
    } else {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + resposta.status
        );
    }
}

function enviarConfirmacaoNovoEndereco(event) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute("onclick", "enviarNovoEndereco()");

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja confirmar as alterações?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

async function enviarNovoEndereco() {
    const token = sessionStorage.getItem("token");
    const idCliente = parseInt(sessionStorage.getItem("idCliente"));

    const valido = await testar();

    if (!valido) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    const enderecos = await carregarEnderecos(idCliente, token);

    const endereco = {
        nrCep: document.getElementById("cepClienteNovo").value,
        nmBairro: document.getElementById("bairroClienteNovo").value,
        sgEstado: document.getElementById("sgEstadoNovo").value,
        nmLogradouro: document.getElementById("logradouroClienteNovo").value,
        nmCidade: document.getElementById("cidadeClienteNovo").value,
        nrEndereco: document.getElementById("numeroClienteNovo").value,
        nmTituloEndereco: document.getElementById("tituloEnderecoNovo").value,
        nmTipoEndereco: document.getElementById("tipoEnderecoNovo").value,
        idPrincipal: enderecos.dados.length == 0 ? 1 : 0,
        fkCdCliente: idCliente,
    };

    const resposta = await adicionarEndereco(endereco, token);

    if (resposta.status == 201) {
        montarAlerta("Endereco adicionado com sucesso!");
        montarEnderecos();
        clicaSecao("secaoEndereco");
    } else {
        console.log(
            "Ocorreu um erro na requisição. STATUS: " + resposta.status
        );
    }
}

function enviarConfirmacaoSalvarCliente(event) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute("onclick", "enviarAtualizarCliente()");

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja confirmar as alterações?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

async function enviarAtualizarCliente() {
    const token = sessionStorage.getItem("token");
    const idCliente = parseInt(sessionStorage.getItem("idCliente"));

    const valido = await testar();

    if (!valido) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    const cliente = {
        cdCliente: idCliente,
        nmCliente: document.querySelector("#nomeClienteEdicao").value,
        nmSobrenome: document.querySelector("#sobrenomeClienteEdicao").value,
        nrCpf: document.querySelector("#cpfClienteEdicao").value,
        dtNascimento: document.querySelector("#dataNascimentoEdicao").value,
        nrTelefone: document.querySelector("#numeroTelefoneEdicao").value,
        nmEmail: document.querySelector("#emailClienteEdicao").value,
    };

    const status = await atualizarCliente(cliente, token);

    if (status === 200) {
        montarAlerta("Cliente atualizado com sucesso!");
        insereInformacoesUsuario();
    } else {
        console.log("Ocorreu um erro na requisição. STATUS: " + status);
    }
}

function enviarConfirmacaoAtualizarSenha(event) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute("onclick", "enviarAtualizarSenha()");

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja alterar a senha para a informada?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

async function enviarAtualizarSenha() {
    const token = sessionStorage.getItem("token");
    const idCliente = parseInt(sessionStorage.getItem("idCliente"));

    const valido = await testar();

    if (!valido) {
        console.log("Cliente não autenticado");
        window.location = "/";
    }

    if (
        document.querySelector("#novaSenhaCliente").value !=
        document.querySelector("#confirmaNovaSenhaCliente").value
    ) {
        montarAlerta("Senhas precisam ser iguais!");
        return;
    }

    const novaSenha = {
        senhaAtual: document.querySelector("#senhaAtualCliente").value,
        novaSenha: document.querySelector("#novaSenhaCliente").value,
    };

    const status = await atualizarSenha(idCliente, novaSenha, token);

    if (status == 201) {
        montarAlerta("Senha atualizada com sucesso!");
    } else {
        console.log("Ocorreu um erro na requisição. STATUS: " + status);
    }
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const valido = await testar();

    if (!valido) {
        console.log("Cliente não autenticado");
        window.location = "/src/pages/login.html";
    }

    if (valido) {
        insereInformacoesUsuario();
        montarEnderecos();
        montarCompras();
        montarPedidos();
    } else {
        console.log("Usuário não encontrado");
    }

    const urlParams = new URLSearchParams(window.location.search);

    const enderecos = urlParams.get("enderecos");

    if (valido) {
        clicaSecao("secaoEndereco");
        clicaSecaoInternaEnderecos("meusEnderecos");
    }

    const pedidos = urlParams.get("pedidos");

    if (pedidos != null) {
        clicaSecao("secaoCompras");
        clicaSecaoInternaCompras("pedidos");
    }
});

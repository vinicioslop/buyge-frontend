const fetchUrl = "https://129.148.45.5:30001/api";

function mascaraPreco(preco) {
    const valorFormatado = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return valorFormatado;
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

function recarregarPagina() {
    window.location.reload();
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

function montarAlertaRecarregar(conteudo) {
    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "OK";
    botaoConfirmar.setAttribute("onclick", "recarregarPagina()");

    const mensagem = conteudo;

    const botoes = [botaoConfirmar];

    adicionarConfirmacao(mensagem, botoes);
}

async function carregarProduto(idProduto) {
    const response = await fetch(`${fetchUrl}/produto/${idProduto}`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const produto = await response.json();

    return produto;
}

async function carregarImagems(idProduto) {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${idProduto}/todas`,
        {
            mode: "cors",
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

async function carregarItensCarrinho(idCliente, token) {
    const response = await fetch(`${fetchUrl}/carrinho/items/${idCliente}`, {
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

async function adicionarItemCarrinho(idCliente, idProduto, token) {
    const requisicao = await fetch(
        `${fetchUrl}/carrinho/item/novo/${idCliente}/${idProduto}`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );
    const resposta = await requisicao.json();

    return resposta;
}

async function atualizarItemCarrinho(idItemCarrinho, itemCarrinho, token) {
    const response = await fetch(
        `${fetchUrl}/carrinho/item/${idItemCarrinho}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(itemCarrinho),
        }
    );
    const status = await response.status;

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

async function apagarItemCarrinho(idItemCarrinho, token) {
    const requisicao = await fetch(
        `${fetchUrl}/carrinho/item/remover/${idItemCarrinho}`,
        {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    return requisicao.status;
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

            var resposta = {
                dados: dados,
                status: status,
            };

            return resposta;
        default:
            console.log("Ocorreu um erro na requisição. STATUS: " + status);

            var resposta = {
                dados: [],
                status: status,
            };

            return resposta;
    }
}

async function gerarPreferencia(idCliente, token) {
    const response = await fetch(`${fetchUrl}/comprar/${idCliente}`, {
        method: "POST",
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

function trocarEndereco() {
    window.location = "/src/pages/usuario/usuario.html?enderecos=true";
}

async function removerItemCarrinhoLogado(idItemCarrinho) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Usuário não autenticado!");
        window.location = "/";
    }

    const resposta = await apagarItemCarrinho(idItemCarrinho, token);

    if (resposta == 200) {
        window.location.reload(true);
    }
}

function enviarConfirmacaoRemoverItemCarrinho(event, idItemCarrinho) {
    event.preventDefault();

    const botaoConfirmar = document.createElement("button");
    botaoConfirmar.className = "popup-button";
    botaoConfirmar.innerHTML = "Confirmar";
    botaoConfirmar.setAttribute(
        "onclick",
        `removerItemCarrinhoLogado(${idItemCarrinho})`
    );

    const botaoCancelar = document.createElement("button");
    botaoCancelar.className = "popup-button";
    botaoCancelar.innerHTML = "Descartar";
    botaoCancelar.setAttribute("onclick", "removerConfirmacao()");

    const mensagem = "Deseja remover o produto do carrinho?";

    const botoes = [botaoConfirmar, botaoCancelar];

    adicionarConfirmacao(mensagem, botoes);
}

async function atualizaSubTotal(idItemCarrinho) {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inváldia");
        window.location.reload();
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

    let itemCarrinho = {};

    itemsCarrinho.dados.forEach((item) => {
        if (item.cdItemCarrinho == idItemCarrinho) {
            itemCarrinho = item;
        }
    });

    const produto = await carregarProduto(itemCarrinho.fkCdProduto);

    const subtotal = document.querySelector("#subtotal" + idItemCarrinho);
    const qtItemCarrinho = document.querySelector(
        "#qtItemCarrinho" + idItemCarrinho
    );

    subtotal.innerText = mascaraPreco(
        produto.vlProduto * parseInt(qtItemCarrinho.value)
    );

    const carrinhoItem = {
        cdItemCarrinho: itemCarrinho.cdItemCarrinho,
        qtItemCarrinho: qtItemCarrinho.value,
        fkCdProduto: produto.fkCdProduto,
    };

    const repostaAtualizarItemCarrinho = await atualizarItemCarrinho(
        idItemCarrinho,
        carrinhoItem,
        token
    );

    if (repostaAtualizarItemCarrinho.status == 200) {
        console.log("Atualizado");
        window.location.reload(true);
    }
}

function diminuirQtItem(idItemCarrinho) {
    const qtItemCarrinho = document.querySelector(
        "#qtItemCarrinho" + idItemCarrinho
    );

    if (qtItemCarrinho.value > 1) {
        qtItemCarrinho.value--;
    }

    atualizaSubTotal(idItemCarrinho);
}

function aumentarQtItem(idItemCarrinho) {
    const qtItemCarrinho = document.querySelector(
        "#qtItemCarrinho" + idItemCarrinho
    );

    qtItemCarrinho.value++;

    atualizaSubTotal(idItemCarrinho);
}

async function montarItemCarrinhoLogado() {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inválida!");
        return;
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

    const containerProdutos = document.querySelector(".produtos");

    itemsCarrinho.dados.forEach(async (item) => {
        let produto = await carregarProduto(item.fkCdProduto);
        let imagens = await carregarImagems(item.fkCdProduto);

        let imagemPrincipal = {};

        imagens.dados.forEach((imagem) => {
            if (imagem.idPrincipal == 1) {
                imagemPrincipal = imagem;
            }
        });

        const divProduto = document.createElement("div");
        divProduto.classList.add("produto");

        divProduto.innerHTML = `<div class="nome-produto">
            <div class="imagem">
                <img
                    src="${imagemPrincipal.imgProdutoLink}"
                    alt=""
                />
            </div>
            <p>${produto.nmProduto}</p>
        </div>
        <div class="quantidade-produto">
            <button onclick="diminuirQtItem(${
                item.cdItemCarrinho
            })" class="remover">-</button>
            <div class="quantidade-produto">
                <input type="number" name="quantidadeProduto"
                    id="qtItemCarrinho${item.cdItemCarrinho}" value="${parseInt(
            item.qtItemCarrinho
        )}"
                />
            </div>
            <button onclick="aumentarQtItem(${
                item.cdItemCarrinho
            })" class="adicionar">+</button>
        </div>
        <div id="valorUnitario${
            item.cdItemCarrinho
        }" class="valor-unitario-produto">
            ${mascaraPreco(produto.vlProduto)}
        </div>
        <div id="subtotal${item.cdItemCarrinho}"
            class="subtotal-produto">${mascaraPreco(
                produto.vlProduto * item.qtItemCarrinho
            )}
        </div>
        <div onclick="enviarConfirmacaoRemoverItemCarrinho(event, ${
            item.cdItemCarrinho
        })"
            class="remover-produto">
            <img src="/src/icons/remover-preto.svg" alt="">
        </div>`;

        containerProdutos.appendChild(divProduto);
    });
}

async function montarValoresLogado() {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inválida!");
        return;
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

    const campoValorBruto = document.querySelector("#valorBruto");
    const campoValorDesconto = document.querySelector("#valorDesconto");
    const campoValorEntrega = document.querySelector("#valorEntrega");
    const campoValorTotal = document.querySelector("#valorTotal");

    let contador = 0;
    let valorBruto = 0;

    let valorDesconto = 0;
    let valorEntrega = 0;

    itemsCarrinho.dados.forEach(async (item) => {
        const produto = await carregarProduto(item.fkCdProduto);

        valorBruto += produto.vlProduto * item.qtItemCarrinho;

        contador++;

        if (contador == itemsCarrinho.dados.length) {
            campoValorBruto.innerText = mascaraPreco(valorBruto);
            campoValorDesconto.innerText = "- " + mascaraPreco(valorDesconto);

            if (valorEntrega == 0) {
                campoValorEntrega.innerText = "Grátis";
            } else {
                campoValorEntrega.innerText = mascaraPreco(valorEntrega);
            }

            campoValorTotal.innerText = mascaraPreco(
                valorBruto - valorDesconto
            );
        }
    });
}

async function montarFinalizacao() {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Sessão inválida");
        window.location = "/";
    }

    const idCliente = sessionStorage.getItem("idCliente");

    const itemsCarrinhoResposta = await carregarItensCarrinho(idCliente, token);

    if (itemsCarrinhoResposta.dados.length < 1) {
        console.log("Sem itens no carrinho!");
        window.location.reload();
    }

    /*
    <div class="item">
        <div class="imagem">
            <img src="/src/icons/image-preto.svg" alt="" />
        </div>
        <div class="valorQuantidade">
            <div class="valorUnitario">
                Valor do Produto
            </div>
            <div class="quantidadeSubtotal">
                Quantidade unitária/ Valor
            </div>
        </div>
    </div>
    */

    const campoValorCompra = document.querySelector(".valor-compra");
    const campoValorBrutoFinal = document.querySelector("#valorBrutoFinal");
    const campoValorDescontoFinal = document.querySelector(
        "#valorDescontoFinal"
    );
    const campoValorEntregaFinal = document.querySelector("#valorEntregaFinal");
    const campoValorTotalFinal = document.querySelector("#valorTotalFinal");

    let contador = 0;
    let valorBruto = 0;
    let valorEntrega = 0;
    let valorDesconto = 0;

    const itemsDiv = document.querySelector("#itensProdutosFinal");

    itemsCarrinhoResposta.dados.forEach(async (item) => {
        const imagensResposta = await carregarImagems(item.fkCdProduto);

        let imagemPrincipal = {};

        imagensResposta.dados.forEach((imagem) => {
            if (imagem.idPrincipal == 1) {
                imagemPrincipal = imagem;
            }
        });

        const produto = await carregarProduto(item.fkCdProduto);

        const itemCarrinho = document.createElement("div");
        itemCarrinho.className = "item";

        itemCarrinho.innerHTML = `
        <div class="imagem">
            <img src="${imagemPrincipal.imgProdutoLink}" alt="" />
        </div>
        <div class="nomeValorQuantidade">
            <div class="nomeProduto">
                ${produto.nmProduto}
            </div>
            <div class="valorUnitario">
                ${mascaraPreco(produto.vlProduto)}
            </div>
            <div class="quantidadeSubtotal">
                ${item.qtItemCarrinho} x ${mascaraPreco(
            produto.vlProduto
        )} = ${mascaraPreco(produto.vlProduto * item.qtItemCarrinho)}
            </div>
        </div>
        `;

        itemsDiv.appendChild(itemCarrinho);

        valorBruto += produto.vlProduto * item.qtItemCarrinho;

        contador++;

        if (contador == itemsCarrinhoResposta.dados.length) {
            campoValorCompra.innerText = mascaraPreco(
                valorBruto - valorDesconto
            );

            campoValorBrutoFinal.innerText = mascaraPreco(valorBruto);
            campoValorDescontoFinal.innerText =
                "- " + mascaraPreco(valorDesconto);

            if (valorEntrega == 0) {
                campoValorEntregaFinal.innerText = "Grátis";
            } else {
                campoValorEntregaFinal.innerText = mascaraPreco(valorEntrega);
            }

            campoValorTotalFinal.innerText = mascaraPreco(
                valorBruto - valorDesconto
            );
        }
    });

    /*
    <div class="endereco">
        <div class="nome-numero">
            Nome da rua, número da casa
        </div>
        <div class="bairro-cidade-estado">
            Bairro-Cidade-Estado
        </div>
        <div class="cep">CEP</div>
        <div class="grupo-icones">
            <img
                src="/src/icons/loader2-branco.svg"
                alt=""
                id="trocarEndereco"
                onclick="trocarEndereco()"
            />
        </div>
    </div>
    */

    const enderecosReposta = await carregarEnderecos(idCliente, token);

    const grupoEndereco = document.querySelector(".grupo-endereco");

    const divEndereco = document.createElement("div");
    divEndereco.className = "endereco";

    if (enderecosReposta.dados.length > 0) {
        let endereco = {};

        enderecosReposta.dados.forEach((item) => {
            if (item.idPrincipal == 1) {
                endereco = item;
            }
        });

        divEndereco.innerHTML = `
        <div class="nome-numero">
            ${endereco.nmLogradouro}, ${endereco.nrEndereco}
        </div>
        <div class="bairro-cidade-estado">
            ${endereco.nmBairro} - ${endereco.nmCidade} - ${endereco.sgEstado}
        </div>
        <div class="cep">${endereco.nrCep}</div>
        <div class="grupo-icones">
            <img
                src="/src/icons/loader2-branco.svg"
                alt=""
                id="trocarEndereco"
                onclick="trocarEndereco()"
            />
        </div>
        `;

        grupoEndereco.appendChild(divEndereco);
    } else {
        divEndereco.innerHTML = `
        <div>SEM ENDEREÇO CADASTRADO!</div>
        <div>Adicione um endereço para finalizar a compra.</div>
        <div class="grupo-icones">
            <img
                src="/src/icons/home-branco.svg"
                alt=""
                id="trocarEndereco"
                onclick="trocarEndereco()"
            />
        </div>
        `;

        grupoEndereco.appendChild(divEndereco);
    }

    const dadosEntrega = document.querySelector("#dadosEntrega");
    const informacoes = document.querySelector(".informacoes");

    informacoes.classList = "informacoes esconder";
    dadosEntrega.classList = "mostrar";
}

async function acionaMercadoPago() {
    const token = sessionStorage.getItem("token");

    if (token == null) {
        console.log("Inválido");
    } else {
        const idCliente = sessionStorage.getItem("idCliente");

        const enderecosReposta = await carregarEnderecos(idCliente, token);

        if (enderecosReposta.dados.length == 0) {
            console.log("Cliente não possue endereço cadastrado!");
            return;
        }

        const resposta = await gerarPreferencia(idCliente, token);

        if (resposta.status === 200) {
            window.location = resposta.dados.sandboxInitPoint;
        } else {
            console.log(
                "Ocorreu um erro na requisição. STATUS: " + resposta.status
            );
        }
    }
}

async function montarItemCarrinhoDeslogado(itemsCarrinho) {
    const tabelaProdutos = document.querySelector(".tabela-produtos");

    itemsCarrinho.forEach(async (item) => {
        let produto = await carregarProduto(item.id);
        let imagens = await carregarImagems(item.id);

        let imagemPrincipal = {};

        imagens.dados.forEach((imagem) => {
            if (imagem.idPrincipal == 1) {
                imagemPrincipal = imagem;
            }
        });

        const tr = document.createElement("tr");
        tr.classList.add("produto");

        tr.innerHTML = `<td class="nome-produto">
                <div class="imagem">
                <img
                    src="${imagemPrincipal.imgProdutoLink}"
                    alt=""
                />
                </div>
                <p>${produto.nmProduto}</p>
            </td>
            <td class="quantidade-produto">
                <button class="remover">-</button>
                <input
                type="number"
                name="quantidadeProduto"
                id="quantidadeProduto"
                value="${0}"
                />
                <button class="adicionar">+</button>
            </td>
            <td class="valor-unitario-produto">
                ${mascaraPreco(produto.vlProduto)}
            </td>
            <td class="subtotal-produto">${mascaraPreco(produto.vlProduto)}</td>
            <td onclick="removerItemCarrinhoDeslogado(${
                item.id
            })" class="removerProduto">
                <img src="/src/icons/remover-preto.svg" alt="">
            </td>`;

        tabelaProdutos.appendChild(tr);
    });
}

function retornaItemsCarrinhoDeslogado() {
    var listaItemsCarrinho = JSON.parse(
        localStorage.getItem("itemsCarrinho") || "[]"
    );

    return listaItemsCarrinho;
}

function removerItemCarrinhoDeslogado(idProduto) {
    var listaItemsCarrinho = JSON.parse(
        localStorage.getItem("itemsCarrinho") || "[]"
    );

    listaItemsCarrinho.forEach((item, index) => {
        if (item.id == idProduto) {
            listaItemsCarrinho.splice(index, 1);
            console.log(listaItemsCarrinho[index]);
        }
    });

    localStorage.setItem("itemsCarrinho", JSON.stringify(listaItemsCarrinho));

    window.location.reload();
}

function mostraProdutos() {
    const iconeSeta = document.querySelector("#iconeSeta");
    const itensProdutosFinal = document.querySelector("#itensProdutosFinal");
    const valoresProdutosFinal = document.querySelector(
        "#valoresProdutosFinal"
    );

    if (itensProdutosFinal.classList.contains("esconder")) {
        iconeSeta.setAttribute("src", "/src/icons/seta-cima-branca.svg");

        itensProdutosFinal.className = "itens mostrar";
        valoresProdutosFinal.className = "valores mostrar";
    } else {
        iconeSeta.setAttribute("src", "/src/icons/seta-baixo-branco.svg");

        itensProdutosFinal.className = "itens esconder";
        valoresProdutosFinal.className = "valores esconder";
    }
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (token == null) {
        var itemsCarrinho = retornaItemsCarrinhoDeslogado();

        if (itemsCarrinho == 0) {
            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo";
            informacoes.className = "informacoes esconder";
            semItems.className = "mostrar";
        } else {
            montarItemCarrinhoDeslogado(itemsCarrinho);

            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo";
            informacoes.className = "informacoes mostrar";
            semItems.className = "esconder";
        }
    } else {
        const idCliente = sessionStorage.getItem("idCliente");
        const itemsCarrinho = await carregarItensCarrinho(idCliente, token);

        if (itemsCarrinho.dados.length === 0) {
            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo esconder";
            informacoes.className = "informacoes esconder";
            semItems.className = "mostrar";
        } else {
            await montarItemCarrinhoLogado();
            await montarValoresLogado();

            let titulo = document.querySelector(".titulo");
            let semItems = document.querySelector("#semItens");
            let informacoes = document.querySelector(".informacoes");

            titulo.className = "titulo";
            informacoes.className = "informacoes mostrar";
            semItems.className = "esconder";
        }
    }
});

async function configuraUrl() {
    const location = window.location.hostname;

    switch (location) {
        case "www.buyge.com.br":
            var url = "https://129.148.45.5:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
        case "127.0.0.1":
            var url = "https://localhost:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
    }
}

function retornaUrl() {
    return sessionStorage.getItem("fetchUrl");
}

async function buscarCategorias() {
    const url = retornaUrl();

    const response = await fetch(`${url}/categorias`, { mode: "cors" });
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

async function buscarDadosCliente(idCliente, token) {
    const url = retornaUrl();

    const response = await fetch(`${url}/cliente/${idCliente}`, {
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

async function buscarMercantes(idVendedor, token) {
    const url = retornaUrl();

    const response = await fetch(`${url}/mercantes/vendedor/${idVendedor}`, {
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

async function veriricarToken(token) {
    const url = retornaUrl();

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

function logar() {
    window.location = "/src/pages/login.html";
}

function criarConta() {
    window.location = "/src/pages/sign.html";
}

function desconectar() {
    sessionStorage.clear();

    window.location.reload();
}

function redirecionarPefilUsuario() {
    window.location = "/src/pages/usuario/usuario.html";
}

function redirecionarFavoritos() {
    window.location = "/src/pages/favoritos.html";
}

function redirecionarCarrinho() {
    window.location = "/src/pages/carrinho.html";
}

async function montaBarraNavegacaoPequena(categorias) {
    // BARRA DE NAVEGAÇÃO
    const barraPequena = document.querySelector("#barraPequena");
    barraPequena.innerHTML = `
    <div class="grupo-esquerdo navbar">
        <div class="dropdown">
            <img src="/src/icons/menu-branco.svg" class="menu dropbtn">
            <div id="menuConteudo" class="dropdown-content"></div>
        </div>
    </div>
    <div class="grupo-meio">
        <a href="/index.html" class="logo-link">
            <img class="logo" src="/src/imgs/logo/buyge_logo_novo_branco_full.png" alt="Logo do projeto branco e preto">
        </a>
    </div>
    <div class="grupo-direito navbar">
        <div class="dropdown">
            <img class="dropbtn user-icone" src="/src/icons/user-branco.svg">
            <div id="userConteudo" class="dropdown-content"></div>
        </div>
    </div>
    `;
    barraPequena.setAttribute("class", "mostrar-row");

    // CONTEÚDO DO MENU
    const menuConteudo = document.getElementById("menuConteudo");

    categorias.forEach((categoria) => {
        var item = document.createElement("a");
        item.setAttribute("href", "#");
        item.innerText = categoria.nmCategoria;

        menuConteudo.appendChild(item);
    });

    const todosProdutos = document.createElement("a");
    todosProdutos.setAttribute("href", "/src/pages/produtos/produtos.html");
    todosProdutos.id = "todasLojas";
    todosProdutos.innerText = "Todos os Produtos";

    menuConteudo.appendChild(todosProdutos);

    // CONTEÚDO DO USUÁRIO
    const userConteudo = document.getElementById("userConteudo");

    const token = sessionStorage.getItem("token");

    if (token != null) {
        const idCliente = sessionStorage.getItem("idCliente");

        const respostaCliente = await buscarDadosCliente(idCliente, token);
        const respostaMercantes = await buscarMercantes(idCliente, token);

        const cliente = respostaCliente.dados;
        const mercantes = respostaMercantes.dados;

        const nomeCliente = document.createElement("a");
        nomeCliente.id = "nomeCliente";
        nomeCliente.innerText = `Olá, ${cliente.nmCliente}`;

        const perfilUsuario = document.createElement("a");
        perfilUsuario.setAttribute("onclick", "redirecionarPefilUsuario()");
        perfilUsuario.id = "perfilUsuario";
        perfilUsuario.innerText = "Minha Conta";

        const desconectar = document.createElement("a");
        desconectar.setAttribute("onclick", "desconectar()");
        desconectar.id = "desconectar";
        desconectar.innerText = "Desconectar";

        const favoritos = document.createElement("a");
        favoritos.setAttribute("onclick", "redirecionarFavoritos()");
        favoritos.id = "favoritos";
        favoritos.innerText = "Favoritos";

        const carrinho = document.createElement("a");
        carrinho.setAttribute("onclick", "redirecionarCarrinho()");
        carrinho.id = "carrinho";
        carrinho.innerText = "Carrinho";

        userConteudo.appendChild(nomeCliente);
        userConteudo.appendChild(perfilUsuario);
        userConteudo.appendChild(favoritos);
        userConteudo.appendChild(carrinho);

        if (cliente.nmTipoConta == "Vendedor" && mercantes.length > 0) {
            const mercanteLink = document.createElement("a");
            mercanteLink.setAttribute(
                "href",
                "/src/pages/mercantes/mercante.html"
            );
            mercanteLink.className = "icone-link";
            mercanteLink.innerText = "Minha Loja";

            userConteudo.appendChild(mercanteLink);
        } else {
            const mercanteLink = document.createElement("a");
            mercanteLink.setAttribute(
                "href",
                "/src/pages/mercantes/novoMercante.html"
            );
            mercanteLink.className = "icone-link";

            mercanteLink.innerHTML = `
            <img
                class="icone"
                id="mercantes-icon"
                src="/src/icons/lojas-branco.svg"
                alt="Ícone de mercantes branco"
            />
            `;

            grupoIcones.insertBefore(mercanteLink, iconeFavoritos);
        }

        userConteudo.appendChild(desconectar);
    } else {
        const logar = document.createElement("a");
        logar.setAttribute("onclick", "logar()");
        logar.innerText = "Conectar";

        const cadastrar = document.createElement("a");
        cadastrar.setAttribute("onclick", "criarConta()");
        cadastrar.innerText = "Crie sua conta";

        userConteudo.appendChild(logar);
        userConteudo.appendChild(cadastrar);
    }
}

async function montaBarraNavegacaoGrande(categorias) {
    // BARRA DE NAVEGAÇÃO
    const barraGrande = document.querySelector("#barraGrande");

    barraGrande.innerHTML = `
    <div class="grupo-superior">
        <div class="grupo-superior-esquerdo">
            <a href="/index.html" class="logo-link">
                <img
                    src="/src/imgs/logo/buyge_logo_novo_branco_full.png"
                    alt="Logo do projeto branco"
                    class="logo"
                />
            </a>
        </div>
        <div class="grupo-superior-meio">
            <div class="barra-pesquisa">
                <input
                    type="text"
                    id="barra-pesquisa-input"
                    placeholder="Digite aqui o que procura..."
                />
                <a class="barra-pesquisa-link" href="/src/pages/produtos/produtos.html">
                    <img
                        src="/src/icons/search-roxo.svg"
                        alt="Ícone de pesquisa"
                        id="barra-pesquisa-icone"
                    />
                </a>
            </div>
        </div>
        <div class="grupo-superior-direito navbarDireita">
            <div class="grupo-icones">
                
                <a href="/src/pages/favoritos.html" id="linkFavoritos" class="icone-link">
                    <img
                        class="icone"
                        id="favoritos-icon"
                        src="/src/icons/heart-branco.svg"
                        alt="Ícone de favoritos branco"
                    />
                </a>
                <a href="/src/pages/carrinho.html" class="icone-link">
                    <img
                        class="icone"
                        id="carrinho-icon"
                        src="/src/icons/shopping-cart-branco.svg"
                        alt="Ícone de carrinho branco"
                    />
                </a>
                <div class="menuUsuario">
                    <div class="usuario ativador">
                        <img
                            class="icone"
                            id="user-icon"
                            src="/src/icons/user-branco.svg"
                            alt="Ícone de usuario branco"
                        />
                    </div>
                    <div id="usuarioConteudo" class="usuarioConteudo"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="grupo-inferior">
        <div class="grupo-inferior-esquerdo navbarEsquerda">
            <div class="menuCategorias">
                <div class="categorias ativador">
                    <img
                        class="icone"
                        id="categorias-icone"
                        src="/src/icons/menu-branco.svg"
                        alt="Ícone de menu branco"
                    />
                    <p id="categorias-titulo">Todas as categorias</p>
                </div>
                <div id="categoriasConteudo" class="categoriasConteudo"></div>
            </div>
        </div>
        <div class="grupo-inferior-direito">
            <div class="temas">
                <p class="tema">DEMON SLAYER</p>
                <p class="tema">DEATH NOTE</p>
                <p class="tema">BOKU NO HERO</p>
                <p class="tema">ONE PIECE</p>
                <p class="tema">NARUTO</p>
                <p class="tema">MADE IN ABYSS</p>
                <p class="tema">POKEMON</p>
            </div>
        </div>
    </div>
    `;

    // CONTEÚDO DO MENU
    const categoriasConteudo = document.getElementById("categoriasConteudo");

    categorias.forEach((categoria) => {
        let item = document.createElement("a");
        item.setAttribute("href", "#");
        item.innerText = categoria.nmCategoria;

        categoriasConteudo.appendChild(item);
    });

    const todosProdutos = document.createElement("a");
    todosProdutos.setAttribute("href", "/src/pages/produtos/produtos.html");
    todosProdutos.id = "todasLojas";
    todosProdutos.innerText = "Todos os Produtos";

    categoriasConteudo.appendChild(todosProdutos);

    const usuarioConteudo = document.getElementById("usuarioConteudo");

    const token = sessionStorage.getItem("token");

    if (token === null) {
        const logar = document.createElement("a");
        logar.setAttribute("onclick", "logar()");
        logar.id = "logar";
        logar.innerText = "Logar";

        const criarConta = document.createElement("a");
        criarConta.setAttribute("onclick", "criarConta()");
        criarConta.id = "criarConta";
        criarConta.innerText = "Criar Conta";

        usuarioConteudo.appendChild(logar);
        usuarioConteudo.appendChild(criarConta);
    } else {
        const grupoIcones = document.querySelector(".grupo-icones");
        const iconeFavoritos = document.querySelector("#linkFavoritos");

        const idCliente = sessionStorage.getItem("idCliente");

        const respostaCliente = await buscarDadosCliente(idCliente, token);
        const respostaMercantes = await buscarMercantes(idCliente, token);

        const cliente = respostaCliente.dados;
        const mercantes = respostaMercantes.dados;

        if (cliente.nmTipoConta == "Vendedor" && mercantes.length > 0) {
            const mercanteLink = document.createElement("a");
            mercanteLink.setAttribute(
                "href",
                "/src/pages/mercantes/mercante.html"
            );
            mercanteLink.className = "icone-link";

            mercanteLink.innerHTML = `
            <img
                class="icone"
                id="mercantes-icon"
                src="/src/icons/lojas-branco.svg"
                alt="Ícone de mercantes branco"
            />
            `;

            grupoIcones.insertBefore(mercanteLink, iconeFavoritos);
        } else {
            const mercanteLink = document.createElement("a");
            mercanteLink.setAttribute(
                "href",
                "/src/pages/mercantes/novoMercante.html"
            );
            mercanteLink.className = "icone-link";

            mercanteLink.innerHTML = `
            <img
                class="icone"
                id="mercantes-icon"
                src="/src/icons/lojas-branco.svg"
                alt="Ícone de mercantes branco"
            />
            `;

            grupoIcones.insertBefore(mercanteLink, iconeFavoritos);
        }

        const nomeCliente = document.createElement("a");
        nomeCliente.id = "nomeCliente";
        nomeCliente.innerText = `Olá, ${cliente.nmCliente}`;

        const perfilUsuario = document.createElement("a");
        perfilUsuario.setAttribute("onclick", "redirecionarPefilUsuario()");
        perfilUsuario.id = "perfilUsuario";
        perfilUsuario.innerText = "Minha Conta";

        const desconectar = document.createElement("a");
        desconectar.setAttribute("onclick", "desconectar()");
        desconectar.id = "desconectar";
        desconectar.innerText = "Desconectar";

        usuarioConteudo.appendChild(nomeCliente);
        usuarioConteudo.appendChild(perfilUsuario);
        usuarioConteudo.appendChild(desconectar);
    }

    barraGrande.setAttribute("class", "mostrar-column");
}

function esconderConteudoBarra(barra) {
    switch (barra) {
        case "pequena":
            let barraPequena = document.querySelector("#barraPequena");
            barraPequena.setAttribute("class", "esconder");
            break;
        case "grande":
            let barraGrande = document.querySelector("#barraGrande");
            barraGrande.setAttribute("class", "esconder");
            break;
    }
}

function montaBarra(categorias) {
    if (window.screen.width < 820) {
        esconderConteudoBarra("grande");
        montaBarraNavegacaoPequena(categorias);
    } else {
        esconderConteudoBarra("pequena");
        montaBarraNavegacaoGrande(categorias);
    }
}

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    await configuraUrl();

    const categoriasResposta = await buscarCategorias();
    const categorias = categoriasResposta.dados;

    montaBarra(categorias);
});

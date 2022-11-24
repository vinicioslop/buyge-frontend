const url = "https://localhost:7240/api";

async function buscarCategorias() {
    const response = await fetch(`${url}/categorias`, { mode: "cors" });
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

async function veriricarToken(token) {
    const requisicao = await fetch(`${url}/token`, {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    const status = await requisicao.status;
    console.log(status);

    switch (status) {
        case 200:
            return true;
        case 401:
            return false;
    }
}

function montaBarraNavegacaoPequena(categorias) {
    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.innerHTML = `
    <div class="grupo-esquerdo navbar">
        <div class="dropdown">
            <img src="/src/icons/menu-branco.svg" class="menu dropbtn">
            <div class="dropdown-content"></div>
        </div>
    </div>
    <div class="grupo-meio">
        <a href="/index.html" class="logo-link">
            <img class="logo" src="/src/imgs/logo/buyge_logo_novo_branco_full.png" alt="Logo do projeto branco e preto">
        </a>
    </div>
    <div class="grupo-direito">
        <a class="pesquisa-link" href="/src/pages/produtos/produtos.html">
            <img class="pesquisa-icone" src="/src/icons/search-branco.svg">
        </a>
    </div>
    `;

    // CONTEÚDO DO MENU
    const menuConteudo = document.getElementsByClassName("dropdown-content")[0];

    categorias.forEach((categoria) => {
        let item = document.createElement("a");
        item.setAttribute("href", "#");
        item.innerText = categoria.nmCategoria;

        menuConteudo.appendChild(item);
    });
}

function montaBarraNavegacaoGrande(categorias) {
    // BARRA DE PESQUISA
    const barraPesquisa = document.createElement("div");
    barraPesquisa.classList.add("barra-pesquisa");

    // BARRA DE PESQUISA INPUT
    const barraPesquisaInput = document.createElement("input");
    barraPesquisaInput.setAttribute("type", "text");
    barraPesquisaInput.setAttribute("id", "barra-pesquisa-input");
    barraPesquisaInput.setAttribute(
        "placeholder",
        "Digite aqui o que procura..."
    );
    barraPesquisa.appendChild(barraPesquisaInput);
    // BARRA DE PESQUISA INPUT

    // BARRA DE PESQUISA ICONE
    const barraPesquisaLink = document.createElement("a");
    barraPesquisaLink.classList.add("barra-pesquisa-link");
    barraPesquisaLink.href = "/src/pages/produtos/produtos.html";
    const barraPesquisaIcone = document.createElement("img");
    barraPesquisaIcone.setAttribute("src", "/src/icons/search-roxo.svg");
    barraPesquisaIcone.setAttribute("alt", "Ícone de pesquisa");
    barraPesquisaIcone.setAttribute("id", "barra-pesquisa-icone");
    barraPesquisaLink.appendChild(barraPesquisaIcone);
    barraPesquisa.appendChild(barraPesquisaLink);
    // BARRA DE PESQUISA ICONE

    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.innerHTML = `
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
        <div class="grupo-superior-direito">
            <div class="grupo-icones">
                <a href="/src/pages/favoritos.html" class="icone-link">
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
                <a href="/src/pages/login.html" class="icone-link"
                    ><img
                        class="icone"
                        id="user-icon"
                        src="/src/icons/user-branco.svg"
                        alt="Ícone de usuario branco"
                /></a>
            </div>
        </div>
    </div>
    <div class="grupo-inferior">
        <div class="grupo-inferior-esquerdo navbar">
            <div class="dropdown">
                <div class="categorias dropbtn">
                    <img
                        class="icone"
                        id="categorias-icone"
                        src="/src/icons/menu-branco.svg"
                        alt="Ícone de menu branco"
                    />
                    <p id="categorias-titulo">Todas as categorias</p>
                </div>
                <div class="dropdown-content"></div>
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
    const menuConteudo = document.getElementsByClassName("dropdown-content")[0];

    categorias.forEach((categoria) => {
        let item = document.createElement("a");
        item.setAttribute("href", "#");
        item.innerText = categoria.nmCategoria;

        menuConteudo.appendChild(item);
    });

    const criarLoja = document.createElement("a");
    criarLoja.setAttribute("href", "/src/pages/mercantes/mercantes.html");
    criarLoja.id = "criarLoja";
    criarLoja.innerText = "Criar Loja";

    menuConteudo.appendChild(criarLoja);
}

function montaBarra(categorias) {
    if (window.screen.width < 820) {
        montaBarraNavegacaoPequena(categorias);
    } else {
        montaBarraNavegacaoGrande(categorias);
    }
}

async function clicarUsuario() {
    const token = sessionStorage.getItem("token");
    const valido = await veriricarToken(token);

    if (valido) {
        logado();
    } else {
        deslogado();
    }
}

function logado() {
    window.location = "/src/pages/usuario/usuario.html";
}

function deslogado() {
    window.location = "/src/pages/login.html";
}

document.addEventListener("load", async (e) => {
    e.preventDefault();

    await veriricarToken();
});

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    const categoriasResposta = await buscarCategorias();
    const categorias = categoriasResposta.dados;

    montaBarra(categorias);
});

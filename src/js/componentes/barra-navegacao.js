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
    barraNavegacao.innerHTML = "";

    // GRUPO ESQUERDO
    const grupoEsquerdo = document.createElement("div");
    grupoEsquerdo.classList.add("grupo-esquerdo");
    grupoEsquerdo.classList.add("navbar");

    // MENU FLUTUANTE
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    // ICONE DO MENU
    const menuIcone = document.createElement("img");
    menuIcone.setAttribute("src", "/src/icons/menu-branco.svg");
    menuIcone.classList.add("menu");
    menuIcone.classList.add("dropbtn");

    // CONTEÚDO DO MENU
    const menuConteudo = document.createElement("div");
    menuConteudo.classList.add("dropdown-content");

    categorias.forEach((categoria) => {
        let item = document.createElement("a");
        item.setAttribute("href", "#");
        item.innerText = categoria.nmCategoria;

        menuConteudo.appendChild(item);
    });

    dropdown.appendChild(menuIcone);
    dropdown.appendChild(menuConteudo);

    grupoEsquerdo.appendChild(dropdown);

    barraNavegacao.appendChild(grupoEsquerdo);
    // GRUPO ESQUERDO

    // GRUPO MEIO
    const grupoMeio = document.createElement("div");
    grupoMeio.classList.add("grupo-meio");

    // LOGO DO PROJETO
    const logoLink = document.createElement("a");
    logoLink.classList.add("logo-link");
    logoLink.setAttribute("href", "/index.html");

    const logo = document.createElement("img");
    logo.classList.add("logo");
    logo.setAttribute("src", "/src/imgs/logo/buyge_logo_novo_branco_full.png");
    logo.setAttribute("alt", "Logo do projeto branco e preto");

    logoLink.appendChild(logo);

    grupoMeio.appendChild(logoLink);
    // LOGO DO PROJETO

    barraNavegacao.appendChild(grupoMeio);
    // GRUPO MEIO

    // GRUPO DIREITO
    const grupoDireito = document.createElement("div");
    grupoDireito.classList.add("grupo-direito");

    // ICONE DE PESQUISA
    const pesquisaLink = document.createElement("a");
    pesquisaLink.classList.add("pesquisa-link");
    pesquisaLink.href = "/src/pages/produtos/produtos.html";
    const pesquisaIcone = document.createElement("img");
    pesquisaIcone.setAttribute("src", "/src/icons/search-branco.svg");
    pesquisaIcone.classList.add("pesquisa-icone");

    pesquisaLink.appendChild(pesquisaIcone);

    grupoDireito.appendChild(pesquisaLink);
    // ICONE DE PESQUISA

    barraNavegacao.appendChild(grupoDireito);
    // GRUPO DIREITO
}

function montaBarraNavegacaoGrande(categorias) {
    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.innerHTML = "";

    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR
    const grupoSuperior = document.createElement("div");
    grupoSuperior.classList.add("grupo-superior");

    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR ESQUERDO
    const grupoSuperiorEsquerdo = document.createElement("div");
    grupoSuperiorEsquerdo.classList.add("grupo-superior-esquerdo");

    // LOGO PROJETO
    const logoLink = document.createElement("a");
    logoLink.setAttribute("href", "/index.html");
    logoLink.classList.add("logo-link");
    const logo = document.createElement("img");
    logo.setAttribute("src", "/src/imgs/logo/buyge_logo_novo_branco_full.png");
    logo.setAttribute("alt", "Logo do projeto branco");
    logo.classList.add("logo");

    logoLink.appendChild(logo);
    grupoSuperiorEsquerdo.appendChild(logoLink);
    // LOGO PROJETO

    grupoSuperior.appendChild(grupoSuperiorEsquerdo);
    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR ESQUERDO

    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR MEIO
    const grupoSuperiorMeio = document.createElement("div");
    grupoSuperiorMeio.classList.add("grupo-superior-meio");

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

    grupoSuperiorMeio.appendChild(barraPesquisa);
    // BARRA DE PESQUISA

    grupoSuperior.appendChild(grupoSuperiorMeio);
    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR MEIO

    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR DIREITO
    const grupoSuperiorDireito = document.createElement("div");
    grupoSuperiorDireito.classList.add("grupo-superior-direito");

    // GRUPO DE ICONES
    const grupoIcones = document.createElement("div");
    grupoIcones.classList.add("grupo-icones");

    // ICONE DE FAVORITOS
    const favoritosLink = document.createElement("a");
    favoritosLink.setAttribute("href", "/src/pages/favoritos.html");
    favoritosLink.classList.add("icone-link");
    const favoritosIcone = document.createElement("img");
    favoritosIcone.classList.add("icone");
    favoritosIcone.setAttribute("id", "favoritos-icon");
    favoritosIcone.setAttribute("src", "/src/icons/heart-branco.svg");
    favoritosIcone.setAttribute("alt", "Ícone de favoritos branco");
    favoritosLink.appendChild(favoritosIcone);
    // ICONE DE FAVORITOS

    // ICONE DE CARRINHO
    const carrinhoLink = document.createElement("a");
    carrinhoLink.setAttribute("href", "/src/pages/carrinho.html");
    carrinhoLink.classList.add("icone-link");
    const carrinhoIcone = document.createElement("img");
    carrinhoIcone.classList.add("icone");
    carrinhoIcone.setAttribute("id", "carrinho-icon");
    carrinhoIcone.setAttribute("src", "/src/icons/shopping-cart-branco.svg");
    carrinhoIcone.setAttribute("alt", "Ícone de carrinho branco");
    carrinhoLink.appendChild(carrinhoIcone);
    // ICONE DE CARRINHO

    // ICONE DE USUARIO
    const userLink = document.createElement("a");
    userLink.id = "userLink";
    userLink.classList.add("icone-link");
    userLink.setAttribute("onclick", "clicarUsuario()");
    const userIcone = document.createElement("img");
    userIcone.classList.add("icone");
    userIcone.setAttribute("id", "user-icon");
    userIcone.setAttribute("src", "/src/icons/user-branco-circulo.svg");
    userIcone.setAttribute("alt", "Ícone de usuario branco");
    userLink.appendChild(userIcone);
    // ICONE DE USUARIO

    // ICONE DE PRODUTOS
    const mercantesLink = document.createElement("a");
    mercantesLink.setAttribute("href", "/src/pages/mercantes/mercantes.html");
    mercantesLink.classList.add("icone-link");
    const mercantesIcone = document.createElement("img");
    mercantesIcone.classList.add("icone");
    mercantesIcone.setAttribute("id", "mercante-icon");
    mercantesIcone.setAttribute("src", "/src/icons/lojas-branco.svg");
    mercantesIcone.setAttribute("alt", "Ícone de mercantes branco");
    mercantesLink.appendChild(mercantesIcone);
    // ICONE DE PRODUTOS

    grupoIcones.appendChild(mercantesLink);
    grupoIcones.appendChild(carrinhoLink);
    grupoIcones.appendChild(favoritosLink);
    grupoIcones.appendChild(userLink);
    grupoSuperiorDireito.appendChild(grupoIcones);
    // GRUPO DE ICONES

    grupoSuperior.appendChild(grupoSuperiorDireito);
    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR DIREITO

    barraNavegacao.appendChild(grupoSuperior);
    // BARRA DE NAVEGAÇÃO - GRUPO SUPERIOR

    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR
    const grupoInferior = document.createElement("div");
    grupoInferior.classList.add("grupo-inferior");

    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR ESQUERDO
    const grupoInferiorEsquerdo = document.createElement("div");
    grupoInferiorEsquerdo.classList.add("grupo-inferior-esquerdo");
    grupoInferiorEsquerdo.classList.add("navbar");

    // MENU FLUTUANTE
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    // CATEGORIAS
    const menuCategorias = document.createElement("div");
    menuCategorias.classList.add("categorias");

    const categoriasIcone = document.createElement("img");
    categoriasIcone.classList.add("icone");
    categoriasIcone.setAttribute("id", "categorias-icone");
    categoriasIcone.setAttribute("src", "/src/icons/menu-branco.svg");
    categoriasIcone.setAttribute("alt", "Ícone de menu branco");

    const categoriasTitulo = document.createElement("p");
    categoriasTitulo.setAttribute("id", "categorias-titulo");
    categoriasTitulo.innerText = "CATEGORIAS";

    menuCategorias.appendChild(categoriasIcone);
    menuCategorias.appendChild(categoriasTitulo);
    menuCategorias.classList.add("dropbtn");

    // CONTEÚDO DO MENU
    const menuConteudo = document.createElement("div");
    menuConteudo.classList.add("dropdown-content");

    categorias.forEach((categoria) => {
        let item = document.createElement("a");
        item.setAttribute("href", "#");
        item.innerText = categoria.nmCategoria;

        menuConteudo.appendChild(item);
    });

    const criarLoja = document.createElement("a");
    criarLoja.setAttribute("href", "/src/pages/mercantes");
    criarLoja.id = "criarLoja";
    criarLoja.innerText = "Criar Loja";

    menuConteudo.appendChild(criarLoja);

    dropdown.appendChild(menuCategorias);
    dropdown.appendChild(menuConteudo);

    grupoInferiorEsquerdo.appendChild(dropdown);
    // CATEGORIAS

    grupoInferior.appendChild(grupoInferiorEsquerdo);
    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR ESQUERDO

    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR MEIO
    const grupoInferiorDireito = document.createElement("div");
    grupoInferiorDireito.classList.add("grupo-inferior-direito");

    // TEMAS MAIS PESQUISADOS
    const temas = document.createElement("div");
    temas.classList.add("temas");

    const tema01 = document.createElement("p");
    tema01.classList.add("tema");
    tema01.innerText = "DEMON SLAYER".toUpperCase();

    const tema02 = document.createElement("p");
    tema02.classList.add("tema");
    tema02.innerText = "DEATH NOTE".toUpperCase();

    const tema03 = document.createElement("p");
    tema03.classList.add("tema");
    tema03.innerText = "BOKU NO HERO".toUpperCase();

    const tema04 = document.createElement("p");
    tema04.classList.add("tema");
    tema04.innerText = "ONE PIECE".toUpperCase();

    const tema05 = document.createElement("p");
    tema05.classList.add("tema");
    tema05.innerText = "NARUTO".toUpperCase();

    const tema06 = document.createElement("p");
    tema06.classList.add("tema");
    tema06.innerText = "MADE IN ABYSS".toUpperCase();

    const tema07 = document.createElement("p");
    tema07.classList.add("tema");
    tema07.innerText = "POKEMON".toUpperCase();

    temas.appendChild(tema01);
    temas.appendChild(tema02);
    temas.appendChild(tema03);
    temas.appendChild(tema04);
    temas.appendChild(tema05);
    temas.appendChild(tema06);
    temas.appendChild(tema07);

    grupoInferiorDireito.appendChild(temas);
    // TEMAS MAIS PESQUISADOS

    grupoInferior.appendChild(grupoInferiorDireito);
    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR MEIO

    barraNavegacao.appendChild(grupoInferior);
    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR
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

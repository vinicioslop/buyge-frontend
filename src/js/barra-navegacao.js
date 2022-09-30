document.addEventListener("DOMContentLoaded", montaBarra());
window.onload = function () {
    montaBarra();
};
window.addEventListener("load", montaBarra());

window.onresize = function () {
    montaBarra();
};
window.addEventListener("resize", montaBarra());

window.onchange = function () {
    montaBarra();
};
window.addEventListener("change", montaBarra());

function montaBarra() {
    if (window.screen.width <= 820) {
        limpaBarraNavegacao();
        montaBarraNavegacaoPequena();
    } else {
        limpaBarraNavegacao();
        montaBarraNavegacaoGrande();
    }
}

function limpaBarraNavegacao() {
    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.innerHTML = "";
}

function montaBarraNavegacaoPequena() {
    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.classList.add("barra-navegacao");

    // GRUPO ESQUERDO
    const grupoEsquerdo = document.createElement("div");
    grupoEsquerdo.classList.add("grupo-esquerdo");

    // ICONE DE MENU/CATEGORIAS
    const menuIcone = document.createElement("img");
    menuIcone.setAttribute("src", "/src/icons/menu-branco.svg");
    menuIcone.classList.add("menu");

    grupoEsquerdo.appendChild(menuIcone);
    // ICONE DE MENU/CATEGORIAS

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
    logo.setAttribute("src", "/src/imgs/logo/buyge_logo_v3_branco.png");
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
    const pesquisaIcone = document.createElement("img");
    pesquisaIcone.setAttribute("src", "/src/icons/search-branco.svg");
    pesquisaIcone.classList.add("pesquisa-icone");

    grupoDireito.appendChild(pesquisaIcone);
    // ICONE DE PESQUISA

    barraNavegacao.appendChild(grupoDireito);
    // GRUPO DIREITO
}

function montaBarraNavegacaoGrande() {
    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.classList.add("barra-navegacao");

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
    logo.setAttribute("src", "/src/imgs/logo/buyge_logo_v3_branco.png");
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
    const barraPesquisaIcone = document.createElement("img");
    barraPesquisaIcone.setAttribute("src", "/src/icons/search-roxo.svg");
    barraPesquisaIcone.setAttribute("alt", "Ícone de pesquisa");
    barraPesquisaIcone.setAttribute("id", "barra-pesquisa-icone");
    barraPesquisa.appendChild(barraPesquisaIcone);
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
    userLink.setAttribute("href", "/src/pages/login.html");
    userLink.classList.add("icone-link");
    const userIcone = document.createElement("img");
    userIcone.classList.add("icone");
    userIcone.setAttribute("id", "user-icon");
    userIcone.setAttribute("src", "/src/icons/user-branco.svg");
    userIcone.setAttribute("alt", "Ícone de usuario branco");
    userLink.appendChild(userIcone);
    // ICONE DE USUARIO

    grupoIcones.appendChild(favoritosLink);
    grupoIcones.appendChild(carrinhoLink);
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

    // CATEGORIAS
    const categorias = document.createElement("div");
    categorias.classList.add("categorias");

    const categoriasIcone = document.createElement("img");
    categoriasIcone.classList.add("icone");
    categoriasIcone.setAttribute("id", "categorias-icone");
    categoriasIcone.setAttribute("src", "/src/icons/menu-branco.svg");
    categoriasIcone.setAttribute("alt", "Ícone de menu branco");
    categorias.appendChild(categoriasIcone);

    const categoriasTitulo = document.createElement("p");
    categoriasTitulo.setAttribute("id", "categorias-titulo");
    categoriasTitulo.innerText = "Todas as categorias";
    categorias.appendChild(categoriasTitulo);

    grupoInferiorEsquerdo.appendChild(categorias);
    // CATEGORIAS

    grupoInferior.appendChild(grupoInferiorEsquerdo);
    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR ESQUERDO

    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR MEIO
    const grupoInferiorMeio = document.createElement("div");
    grupoInferiorMeio.classList.add("grupo-inferior-meio");

    // TEMAS MAIS PESQUISADOS
    const temas = document.createElement("div");
    temas.classList.add("temas");

    const tema01 = document.createElement("p");
    tema01.classList.add("tema");
    tema01.innerText = "demon slayer";

    const tema02 = document.createElement("p");
    tema02.classList.add("tema");
    tema02.innerText = "death note";

    const tema03 = document.createElement("p");
    tema03.classList.add("tema");
    tema03.innerText = "boku no hero";

    const tema04 = document.createElement("p");
    tema04.classList.add("tema");
    tema04.innerText = "one piece";

    const tema05 = document.createElement("p");
    tema05.classList.add("tema");
    tema05.innerText = "naruto";

    const tema06 = document.createElement("p");
    tema06.classList.add("tema");
    tema06.innerText = "made in abyss";

    const tema07 = document.createElement("p");
    tema07.classList.add("tema");
    tema07.innerText = "pokemon";

    temas.appendChild(tema01);
    temas.appendChild(tema02);
    temas.appendChild(tema03);
    temas.appendChild(tema04);
    temas.appendChild(tema05);
    temas.appendChild(tema06);
    temas.appendChild(tema07);

    grupoInferiorMeio.appendChild(temas);
    // TEMAS MAIS PESQUISADOS

    grupoInferior.appendChild(grupoInferiorMeio);
    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR MEIO

    barraNavegacao.appendChild(grupoInferior);
    // BARRA DE NAVEGAÇÃO - GRUPO INFERIOR
}

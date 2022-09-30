document.addEventListener("DOMContentLoaded", montaBarra());

window.onresize = function () {
    montaBarra();
};

window.onchange = function () {
    montaBarra();
};

function montaBarra() {
    if (window.screen.width < 820) {
        montaBarraNavegacaoPequena();
    } else {
        montaBarraNavegacaoGrande();
    }
}

function montaBarraNavegacaoPequena() {
    // BARRA DE NAVEGAÇÃO
    const barraNavegacao = document.querySelector("#barra-navegacao");
    barraNavegacao.innerHTML = "";

    // GRUPO ESQUERDO
    const grupoEsquerdo = document.createElement("div");
    grupoEsquerdo.classList.add("grupo-esquerdo");

    // ICONE DE MENU/CATEGORIAS
    const menuIcone = document.createElement("img");
    menuIcone.setAttribute("src", "/src/icons/menu-branco.svg");
    menuIcone.classList.add("menu");
    grupoEsquerdo.appendChild(menuIcone);

    /* MENU FLUTUANTE
    const menu_flutuante = document.createElement("div");
    menu_flutuante.classList.add("dropdown");
    const menu_botao = document.createElement("button");
    menu_botao.setAttribute("onclick", "myFunction()");
    menu_botao.classList.add("dropbtn");
    menu_botao.setAttribute("innerText", "Dropdown");
    const menu_itens = document.createElement("div");
    menu_itens.setAttribute("id", "myDropdown");
    menu_itens.classList.add("dropdown-content");
    const link01 = document.createElement("a");
    link01.setAttribute("href", "#home");
    link01.setAttribute("innerText", "Home");
    const link02 = document.createElement("a");
    link02.setAttribute("href", "#about");
    link02.setAttribute("innerText", "About");
    const link03 = document.createElement("a");
    link03.setAttribute("href", "#Contact");
    link03.setAttribute("innerText", "Contact");

    menu_itens.appendChild(link01);
    menu_itens.appendChild(link02);
    menu_itens.appendChild(link03);

    menu_flutuante.appendChild(menu_botao);
    menu_flutuante.appendChild(menu_itens);

    grupoEsquerdo.appendChild(menu_flutuante);
    */
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

    const categoriasTitulo = document.createElement("p");
    categoriasTitulo.setAttribute("id", "categorias-titulo");
    categoriasTitulo.innerText = "Todas as categorias";

    categorias.appendChild(categoriasIcone);
    categorias.appendChild(categoriasTitulo);
    grupoInferiorEsquerdo.appendChild(categorias);
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
    tema01.innerText = "DEMON SLAYER";

    const tema02 = document.createElement("p");
    tema02.classList.add("tema");
    tema02.innerText = "DEATH NOTE";

    const tema03 = document.createElement("p");
    tema03.classList.add("tema");
    tema03.innerText = "BOKU NO HERO";

    const tema04 = document.createElement("p");
    tema04.classList.add("tema");
    tema04.innerText = "ONE PIECE";

    const tema05 = document.createElement("p");
    tema05.classList.add("tema");
    tema05.innerText = "NARUTO";

    const tema06 = document.createElement("p");
    tema06.classList.add("tema");
    tema06.innerText = "MADE IN ABYSS";

    const tema07 = document.createElement("p");
    tema07.classList.add("tema");
    tema07.innerText = "POKEMON";

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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content 
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
*/

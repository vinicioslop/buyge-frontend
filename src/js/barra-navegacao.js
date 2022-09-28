document.addEventListener("DOMContentLoaded", () => {
    montaBarraNavegacao();
});

function montaBarraNavegacao() {
    if (screen.width > 1000) {
        let barraNavegacao = document.getElementById("barra-navegacao");
        barraNavegacao.className = "barra-navegacao";

        let grupoSuperior = document.createElement("div");
        grupoSuperior.className = "grupo-superior";

        let grupoSuperiorEsquerdo = document.createElement("div");
        grupoSuperiorEsquerdo.className = "grupo-superior-esquerdo";

        let logoLink = document.createElement("a");
        logoLink.href = "/index.html";
        logoLink.className = "logo-link";

        let logo = document.createElement("img");
        logo.className = "logo";
        logo.src = "/src/imgs/logo/buyge_logo_v3_branco.png";
        logo.alt = "Logo do projeto branco";

        logoLink.appendChild(logo);

        let grupoSuperiorMeio = document.createElement("div");
        grupoSuperiorMeio.className = "grupo-superior-meio";

        let barraPesquisa = document.createElement("div");

        let barraPesquisaInput = document.createElement("input");
        barraPesquisaInput.type = "text";
        barraPesquisaInput.id = "barra-pesquisa-input";
        barraPesquisaInput.placeholder = "Digite aqui o que procura...";

        let barraPesquisaIcone = document.createElement("img");
        barraPesquisaIcone.src = "/src/icons/search-caramelo.svg";
        barraPesquisaIcone.alt = "Ícone de pesquisa";
        barraPesquisaIcone.id = "barra-pesquisa-icone";
        

        let grupoSuperiorDireito = document.createElement("div");
        grupoSuperiorDireito.className = "grupo-superior-direito";

        grupoSuperior.appendChild(grupoSuperiorEsquerdo);
        grupoSuperior.appendChild(grupoSuperiorMeio);
        grupoSuperior.appendChild(grupoSuperiorDireito);

        let grupoInferior = document.createElement("div");
        grupoInferior.className = "grupo-inferior";

        let grupoInferiorEsquerdo = document.createElement("div");
        grupoSuperiorInferior.className = "grupo-inferior-esquerdo";

        let grupoInferiorrMeio = document.createElement("div");
        grupoInferiorMeio.className = "grupo-inferior-meio";

        grupoInferior.appendChild(grupoInferiorEsquerdo);
        grupoInferior.appendChild(grupoInferiorMeio);

        barraNavegacao.appendChild(grupoSuperior);
        barraNavegacao.appendChild(grupoInferior);
    }
}

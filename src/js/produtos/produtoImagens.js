const fetchUrl = "https://localhost:7240/api";

const carregarImagens = async (idProduto, idImagem) => {
    const response = await fetch(
        `${fetchUrl}/produtos/produto-imagem/${idProduto}`,
        {
            method: "GET",
            mode: "cors",
        }
    );
    const imagens = await response.json();

    inserirImagensContainer(imagens);

    if (idImagem != 0) {
        imagens.forEach((imagem) => {
            if (imagem.cdProdutoImagem == idImagem) {
                inserirInformacoesEditar(imagem);
            }
        });
    }
};

const inserirImagem = async (imagem) => {
    const requisicao = await fetch(`${fetchUrl}/produtos/produto-imagem/`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imagem),
    });
    const resposta = await requisicao.json();
};

const atualizarImagem = async (imagem) => {
    await fetch(
        `${fetchUrl}/produtos/produto-imagem/${imagem.cdProdutoImagem}`,
        {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(imagem),
        }
    );
};

const removerImagem = async (idImagem) => {
    await fetch(`${fetchUrl}/produtos/produto-imagem/${idImagem}`, {
        method: "DELETE",
        mode: "cors",
    });
};

const inserirInformacoesEditar = (imagem) => {
    limparFormularioEditar();

    const codigoImagem = document.querySelector("#codigoImagem");
    const imagemUrl = document.querySelector("#novaImagemUrl");
    const descricaoImagem = document.querySelector("#novaDescricaoImagem");

    const codigoImagemItem = document.createElement("option");
    codigoImagemItem.value = imagem.cdProdutoImagem;
    codigoImagemItem.innerHTML = imagem.cdProdutoImagem;

    codigoImagem.append(codigoImagemItem);

    imagemUrl.value = imagem.imgProduto;
    descricaoImagem.value = imagem.dsImagemProduto;
};

const limparFormularioEditar = () => {
    const codigoImagem = document.querySelector("#codigoImagem");
    const imagemUrl = document.querySelector("#novaImagemUrl");
    const descricaoImagem = document.querySelector("#novaDescricaoImagem");

    codigoImagem.innerHTML = "";

    imagemUrl.value = "";
    descricaoImagem.value = "";
};

const inserirImagensContainer = (imagens) => {
    const containerImagens = document.querySelector(".container-imagens");
    containerImagens.innerHTML = "";

    imagens.forEach((imagem) => {
        const imagemGrupo = document.createElement("div");
        imagemGrupo.classList.add("imagem-grupo");

        const img = document.createElement("img");
        img.src = imagem.imgProduto;
        img.classList.add("imagem");

        const containerIcones = document.createElement("div");
        containerIcones.classList.add("container-icones");

        const editarLink = document.createElement("a");
        editarLink.classList.add("editar-link");

        const editarIcone = document.createElement("img");
        editarIcone.src = "/src/icons/edit-roxo.svg";
        editarIcone.classList.add("icone");
        editarIcone.setAttribute(
            "onclick",
            `enviarEditarImagem(${imagem.cdProdutoImagem})`
        );

        editarLink.appendChild(editarIcone);

        const removerLink = document.createElement("a");
        removerLink.classList.add("remover-link");

        const removerIcone = document.createElement("img");
        removerIcone.src = "/src/icons/trash-2-roxo.svg";
        removerIcone.classList.add("icone");
        removerIcone.setAttribute(
            "onclick",
            `montarConfirmacao(${imagem.cdProdutoImagem})`
        );

        removerLink.appendChild(removerIcone);

        containerIcones.appendChild(editarLink);
        containerIcones.appendChild(removerLink);

        imagemGrupo.appendChild(containerIcones);
        imagemGrupo.appendChild(img);

        containerImagens.appendChild(imagemGrupo);
    });
};

const montarConfirmacao = (idImagem) => {
    const container = document.querySelector(".container");

    const confirmar = document.createElement("div");
    confirmar.classList.add("confirmar");

    const mensagem = document.createElement("p");
    mensagem.innerText =
        "Deseja excluir essa imagem? Essa ação é irreversível!";

    const botoes = document.createElement("div");
    botoes.classList.add("confirmacao");

    const aceitar = document.createElement("button");
    aceitar.innerText = "Aceitar";
    aceitar.id = "aceitar";
    aceitar.setAttribute("onclick", `enviarRemoverImagem(${idImagem})`);

    const recusar = document.createElement("button");
    recusar.innerText = "Recusar";
    recusar.id = "recusar";
    recusar.setAttribute("onclick", "defazerConfirmacao()");

    botoes.appendChild(aceitar);
    botoes.appendChild(recusar);

    confirmar.appendChild(mensagem);
    confirmar.appendChild(botoes);

    container.append(confirmar);
};

const defazerConfirmacao = () => {
    const container = document.querySelector(".container");
    const confirmar = document.querySelector(".confirmar");

    container.removeChild(confirmar);
};

const enviarRemoverImagem = function (idImagem) {
    removerImagem(idImagem);

    defazerConfirmacao();
    window.location.reload();
};

const enviarEditarImagem = function (idImagem) {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    carregarImagens(idProduto, idImagem);
};

document.querySelector("#inserirImagem").addEventListener("click", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    let imagem = {
        cdProdutoImagem: 0,
        imgProduto: document.querySelector("#imagemUrl").value,
        dsImagemProduto: document.querySelector("#descricaoImagem").value,
        fkCdProduto: idProduto,
    };

    inserirImagem(imagem);
    // Recarrega a página atual sem usar o cache
    document.location.reload(true);
});

document.querySelector("#atualizarImagem").addEventListener("click", (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    let imagem = {
        cdProdutoImagem: document.querySelector("#codigoImagem").value,
        imgProduto: document.querySelector("#novaImagemUrl").value,
        dsImagemProduto: document.querySelector("#novaDescricaoImagem").value,
        fkCdProduto: idProduto,
    };

    atualizarImagem(imagem);
    // Recarrega a página atual sem usar o cache
    document.location.reload(true);
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    const idProduto = urlParams.get("idProduto");

    carregarImagens(idProduto, 0);
});

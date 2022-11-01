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
            console.log(imagem);
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
    console.log(imagem);

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

const inserirImagensContainer = (imagens) => {
    const containerImagens = document.querySelector(".container-imagens");
    containerImagens.innerHTML = "";

    imagens.forEach((imagem) => {
        let imagemGrupo = document.createElement("div");
        imagemGrupo.classList.add("imagem-grupo");

        let img = document.createElement("img");
        img.src = imagem.imgProduto;
        img.classList.add("imagem");

        let editarLink = document.createElement("a");
        editarLink.classList.add("editar-link");

        let editarIcone = document.createElement("img");
        editarIcone.src = "/src/icons/edit-roxo.svg";
        editarIcone.classList.add("icone");
        editarIcone.setAttribute(
            "onclick",
            `passaValor(${(imagem.cdProdutoImagem)})`
        );

        editarLink.appendChild(editarIcone);

        let removerLink = document.createElement("a");
        removerLink.classList.add("remover-link");

        let removerIcone = document.createElement("img");
        removerIcone.src = "/src/icons/trash-2-roxo.svg";
        removerIcone.classList.add("icone");
        removerIcone.setAttribute(
            "onclick",
            `enviarRemoverImagem(${(imagem.cdProdutoImagem)})`
        );

        removerLink.appendChild(removerIcone);

        imagemGrupo.appendChild(img);
        imagemGrupo.appendChild(editarLink);
        imagemGrupo.appendChild(removerLink);

        containerImagens.appendChild(imagemGrupo);
    });
};

const enviarRemoverImagem = (idImagem) => {
    removerImagem(idImagem);

    window.location.reload(true);
};

const passaValor = function (idImagem) {
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

const fetchUrl = "https://localhost:7240/api";

export async function carregarProdutos() {
    const response = await fetch(`${fetchUrl}/produtos`, { mode: "cors" });
    const produtos = await response.json();

    return produtos;
}

export async function carregarImagems() {
    const response = await fetch(`${fetchUrl}/produtos/produto-imagem`, {
        mode: "cors",
    });
    const produtoImagens = await response.json();

    return produtoImagens;
}

export async function carregarCategorias() {
    const response = await fetch(`${fetchUrl}/categorias`, { mode: "cors" });
    const categorias = await response.json();

    return categorias;
}

export async function carregarMercantes() {
    const response = await fetch(`${fetchUrl}/mercantes`, { mode: "cors" });
    const mercantes = await response.json();

    return mercantes;
}

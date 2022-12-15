async function configurarUrl() {
    const location = window.location.hostname;

    switch (location) {
        case "www.buyge.com.br":
            var url = "129.148.45.5:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
        case "127.0.0.1":
            var url = "https://localhost:30001/api";
            sessionStorage.setItem("fetchUrl", url);
            break;
    }
}

function retornarUrl() {
    return sessionStorage.getItem("fetchUrl");
}

async function cadastrar(cliente) {
    const fetchUrl = retornarUrl();

    const requisicao = await fetch(`${fetchUrl}/cliente/cadastrar`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
    });

    const status = requisicao.status;

    return status;
}

function removeInvalidos(listaCampos) {
    if (listaCampos != null) {
        listaCampos.forEach((campo) => {
            campo.remove();
        });
    }
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(
        data.getUTCFullYear() + 18,
        data.getUTCMonth(),
        data.getUTCDate()
    );

    return dataMais18 <= dataAtual;
}

function validaEmail(email) {
    var re = /\S+@\S+\.\S+/;

    return re.test(email);
}

function validaSenha(senha) {
    let resposta = {
        tamanho: "invalido",
        minuscula: false,
        maiuscula: false,
        especial: false,
        numeros: false,
        valido: false,
    };

    let maiusculas = /[A-Z]/;
    let minusculas = /[a-z]/;
    let numeros = /[0-9]/;
    let especiais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if (senha.length < 6) {
        resposta.tamanho = "menor";
    } else if (senha.length >= 6 && senha.length <= 16) {
        resposta.tamanho = "valido";
    } else if (senha.length > 16) {
        resposta.tamanho = "maior";
    } else {
        return resposta;
    }

    if (maiusculas.test(senha)) {
        resposta.maiuscula = true;
    } else {
        return resposta;
    }

    if (minusculas.test(senha)) {
        resposta.minuscula = true;
    } else {
        return resposta;
    }

    if (numeros.test(senha)) {
        resposta.numeros = true;
    } else {
        return resposta;
    }

    if (especiais.test(senha)) {
        resposta.especial = true;
    } else {
        return resposta;
    }

    resposta.valido = true;

    return resposta;
}

function testaCondicoesSenha(condicoes) {
    var menor = document.querySelector("#menor");
    var maior = document.querySelector("#maior");
    var maiuscula = document.querySelector("#maiuscula");
    var minuscula = document.querySelector("#minuscula");
    var especial = document.querySelector("#especial");
    var numeros = document.querySelector("#numeros");

    if (condicoes.tamanho == "menor") {
        menor.className = "";
    } else {
        menor.className = "esconder";
    }

    if (condicoes.tamanho == "maior") {
        maior.className = "";
    } else {
        maior.className = "esconder";
    }

    if (condicoes.maiuscula == false) {
        maiuscula.className = "";
    } else {
        maiuscula.className = "esconder";
    }

    if (condicoes.minuscula == false) {
        minuscula.className = "";
    } else {
        minuscula.className = "esconder";
    }

    if (condicoes.especial == false) {
        especial.className = "";
    } else {
        especial.className = "esconder";
    }

    if (condicoes.numeros == false) {
        numeros.className = "";
    } else {
        numeros.className = "esconder";
    }
}

function conectar() {
    window.location = "/src/pages/login.html";
}

function adicionarMensagemErro(conteudo) {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");
    const mensagem = document.querySelector(".mensagem");

    const botoes = document.querySelector("#botoes");

    const confirmar = document.createElement("button");
    confirmar.className = "popup-button";
    confirmar.innerText = "Confirmar";
    confirmar.setAttribute("onclick", "removerMensagemErro()");

    botoes.appendChild(confirmar);

    mensagem.innerText = conteudo;

    fundoMensagem.className = "mostrar-popup";
}

function removerMensagemErro() {
    const popupButtons = document.querySelectorAll(".popup-button");

    if (popupButtons.length > 0) {
        popupButtons.forEach((botao) => {
            botao.remove();
        });
    }

    const fundoMensagem = document.querySelector("#fundoMensagem");

    fundoMensagem.className = "esconder-popup";
}

document.querySelector("#nome").addEventListener("keydown", function (e) {
    if (e.key > "0" && e.key < "9") {
        e.preventDefault();
    }
});

document.querySelector("#dataNasc").addEventListener("change", function (e) {
    e.preventDefault();

    const dataNasc = document.querySelector("#dataNasc");

    const camposInvalidosDataNasc = document.querySelectorAll(
        ".campoInvalidoDataNasc"
    );

    let data = new Date(dataNasc.value);

    let valido = maiorQue18(data);

    removeInvalidos(camposInvalidosDataNasc);

    if (!valido) {
        var formulario = document.querySelector(".cadastro");
        var grupoDataNascimento = document.querySelector(
            "#grupoDataNascimento"
        );

        var campoInvalidoDataNasc = document.createElement("div");
        campoInvalidoDataNasc.className =
            "campoInvalidoDataNasc campo-invalido";
        campoInvalidoDataNasc.innerText =
            "Precisa ser maior de 18 anos para se cadastrar";

        formulario.insertBefore(campoInvalidoDataNasc, grupoDataNascimento);
    }
});

document.querySelector("#email").addEventListener("keyup", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email");
    const confirmaEmail = document.querySelector("#confirmaEmail");

    const camposInvalidosEmail = document.querySelectorAll(
        ".campoInvalidoEmail"
    );

    removeInvalidos(camposInvalidosEmail);

    let valido = validaEmail(email.value);

    if (valido) {
        confirmaEmail.disabled = false;
    } else {
        var grupoEmail = document.querySelector(".grupo-email");
        var form = document.querySelector(".cadastro");

        var campoInvalidoEmail = document.createElement("div");
        campoInvalidoEmail.className = "campoInvalidoEmail campo-invalido";
        campoInvalidoEmail.innerText = "E-mail informado é inválido!";

        form.insertBefore(campoInvalidoEmail, grupoEmail);
    }
});

document
    .querySelector("#confirmaEmail")
    .addEventListener("keyup", function (e) {
        e.preventDefault();

        const email = document.querySelector("#email");
        const confirmaEmail = document.querySelector("#confirmaEmail");

        const camposInvalidosEmail = document.querySelectorAll(
            ".campoInvalidoEmail"
        );

        removeInvalidos(camposInvalidosEmail);

        let valido = validaEmail(confirmaEmail.value);

        if (!valido) {
            var grupoEmail = document.querySelector(".grupo-email");
            var form = document.querySelector(".cadastro");

            var campoInvalidoEmail = document.createElement("div");
            campoInvalidoEmail.className = "campoInvalidoEmail campo-invalido";
            campoInvalidoEmail.innerText = "E-mail informado é inválido!";

            form.insertBefore(campoInvalidoEmail, grupoEmail);
        } else if (email.value != confirmaEmail.value) {
            var grupoEmail = document.querySelector(".grupo-email");
            var form = document.querySelector(".cadastro");

            var campoInvalidoEmail = document.createElement("div");
            campoInvalidoEmail.className = "campoInvalidoEmail campo-invalido";
            campoInvalidoEmail.innerText = "Os e-mails precisam ser iguais!";

            form.insertBefore(campoInvalidoEmail, grupoEmail);
        }
    });

document.querySelector("#senha").addEventListener("keyup", function (e) {
    e.preventDefault();

    const senha = document.querySelector("#senha");
    const confirmarSenha = document.querySelector("#confirmarSenha");

    let testeCondicoes = validaSenha(senha.value);

    if (testeCondicoes.valido) {
        let condicoes = document.querySelector("#condicoes");

        if (condicoes != null) condicoes.remove();

        confirmarSenha.disabled = false;
    } else {
        testaCondicoesSenha(testeCondicoes);
    }
});

document
    .querySelector("#confirmarSenha")
    .addEventListener("keyup", function (e) {
        e.preventDefault();

        const senha = document.querySelector("#senha");
        const confirmarSenha = document.querySelector("#confirmarSenha");

        const camposInvalidosSenha = document.querySelectorAll(
            ".campoInvalidoSenha"
        );

        removeInvalidos(camposInvalidosSenha);

        if (senha.value != confirmarSenha.value) {
            confirmarSenha.focus();

            var grupoSenha = document.querySelector(".grupo-senha");
            var formulario = document.querySelector(".cadastro");

            var campoInvalidoSenha = document.createElement("div");
            campoInvalidoSenha.className = "campoInvalidoSenha campo-invalido";
            campoInvalidoSenha.innerText = "As senhas precisam ser iguais!";

            formulario.insertBefore(campoInvalidoSenha, grupoSenha);
        }
    });

document.querySelector("#cadastrar").addEventListener("click", async (e) => {
    e.preventDefault();

    const camposInvalidos = document.querySelectorAll(".campo-invalido");
    const camposInvalidosSenha = document.querySelectorAll(
        ".campoInvalidoSenha"
    );

    if (camposInvalidos > 0 || camposInvalidosSenha > 0) {
        console.log("erro");

        console.log(camposInvalidos);

        return;
    }

    const cliente = {
        nmCliente: document.querySelector("#nome").value,
        nmSobrenome: document.querySelector("#sobrenome").value,
        dtNascimento: document.querySelector("#dataNasc").value,
        nmEmail: document.querySelector("#email").value,
        nmSenha: document.querySelector("#senha").value,
        nmTipoConta: "Padrão",
    };

    const status = await cadastrar(cliente);

    switch (status) {
        case 201:
            window.location = "/src/pages/login.html";
            break;
        default:
            const mensagem = "Ocorreu um erro na criação da conta!";

            adicionarMensagemErro(mensagem);
            break;
    }
});

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();

    await configurarUrl();
});

document.addEventListener("DOMContentLoaded", resetaCarrosel());

window.onresize = function () {
    resetaCarrosel();
};

window.onchange = function () {
    resetaCarrosel();
};

window.onload = function () {
    resetaCarrosel();
}

function resetaCarrosel() {
    var carroselPrincipal = new Flickity('.carrosel');
    var carroselProdutos = new Flickity('.carrosel-produtos');

    carroselPrincipal.reloadCells();
    carroselProdutos.reloadCells();
}

function resetaCarrosel() {
    var carroselPrincipal = new Flickity("#carrosel-principal");
    var carroselProdutos = new Flickity(".carrosel-produtos");

    carroselPrincipal.reloadCells();
    carroselProdutos.reloadCells();
}

window.onresize = function () {
    resetaCarrosel();
};

window.onchange = function () {
    resetaCarrosel();
};

window.onload = function () {
    resetaCarrosel();
};

document.addEventListener("DOMContentLoaded", resetaCarrosel());

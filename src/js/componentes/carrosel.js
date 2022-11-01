function resetaCarrosel() {
    var carroselPrincipal = new Flickity(".carrosel");
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

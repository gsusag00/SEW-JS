class OcultarElementos {

    constructor() {
    }

    mostrar(element) {
        $(element).show();
    }

    ocultar(element) {
        $(element).hide();
    }

}

var oc = new OcultarElementos();
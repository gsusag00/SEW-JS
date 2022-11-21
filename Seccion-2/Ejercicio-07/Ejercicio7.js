class OcultarElementos {

    constructor() {
    }

    mostrar(element) {
        $(element).show();
    }

    ocultar(element) {
        $(element).hide();
    }

    modify() {
        $('img').attr('src',"bombilla.jpg");
        $('img').attr('alt',"Una bombilla");
    }

    restore() {
        $('img').attr('src',"vela.jpg");
        $('img').attr('alt',"Una vela");
    }

    deleteRow() {
        var length = $('table tr').length;
        if(length > 0) {
            var row = $('table tr').get(length-1)
            row.remove();
        }
    }

    addRow() {

    }

}

var oc = new OcultarElementos();
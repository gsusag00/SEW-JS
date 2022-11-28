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
        $('table').append('<tr><td> ' + Math.floor(Math.random() * 10) + 
                            '</td><td>' + Math.floor(Math.random() * 10) + 
                            '</td><td>' +  Math.floor(Math.random() * 10) + 
                            '</td><td>' +  Math.floor(Math.random() * 10) + 
                            '</td><td>' +  Math.floor(Math.random() * 10)  + 
                            '</td></tr>')
    }

    sumaTabla() {
        var count = 0;
        $('table tr td').each(function() {
            var celda = $.trim($(this).text());
            if(!isNaN(celda)) {
                count += Number(celda);
            }
        })
        var prevText = $('h3').text();
        var text = prevText.split(':')

        $('h3').text(text[0] + ': ' + count.toString());console.log(count);
    }

    recorrerDOM() {
        $('*',document.body).each(function() {
            var padre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode("Etiqueta padre : < " + padre + " > elemento : < " + $(this).get(0).tagName + " > valor: "))
        })
    }

}

var oc = new OcultarElementos();
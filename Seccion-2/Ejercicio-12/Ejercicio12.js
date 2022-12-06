class LeeArchivo {


    constructor() {
    }

    loadFile(files) {
        this.clearAside();
        $('body').append('<aside><h2>Datos del archivo</h2><p>Cargando</p><ul></ul></aside>')
        var archivo = files[0];
        var nombre = 'Nombre del archivo: ' + archivo.name;
        var tamaño = 'Tamaño del archivo: ' + archivo.size + ' bytes';
        var tipo = 'Tipo de archivo: ' + archivo.type;
        var ultimo = 'Última modificación: ' + archivo.lastModification;
        $('aside p').remove();
        if(archivo.type.match(/(text|application).(plain|json|xml)/)) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var data = '<li>' + nombre + '</li>'
                data += '<li>' + tamaño + '</li>'
                data += '<li>' + tipo + '</li>'
                data += '<li>' + ultimo + '</li>'
                $('ul').append(data)
                $('aside').append('<h2>Contenido del archivo</h2><label for="file">Contenido</label><textarea></textarea>')
                $('textarea').attr('id','file');
                $('textarea').text(reader.result);
            }
            reader.readAsText(archivo);
        } else {
            $('aside h2, ul').remove()
            $('aside').append('<h2>Formato de archivo no soportado</h2>')
        }
    }

    clearAside() {
        $('aside').remove();
    }
}

var file = new LeeArchivo();
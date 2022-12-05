class Geolocalization {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPos.bind(this),this.verErrores.bind(this));
    }

    getPos(pos) {
        this.mensaje = "La petición de geolocalización se realizo de manera correcta"
        this.long = pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.precision = pos.coords.accuracy;
        this.alt = pos.coords.altitude;
        this.prec_alt = pos.coords.altitudeAccuracy;
        this.head = pos.coords.heading;
        this.vel = posicion.coods.speed;
    }

    verPos() {

        var str = '<h2>Tus datos</h2>'
        str += '<p>' + this.mensaje + '</p>'
        str += '<ul><li>Longitud: ' + this.long + '</li>'
        str += '<li>Latitud: ' + this.lat + '</li>'
        str += '<li>Altitud: ' + this.alt + '</li>'
        str += '<li>Precisión: ' + this.precision + '</li>'
        str += '<li>Precisión altitud: ' + this.prec_alt + '</li>'
        str += '<li>Dirección: ' + this.head + '</li>'
        str += '<li>Velocidad: ' + this.vel + '</li>'
        str += '</ul>'

        document.querySelector('section').innerHTML = str;
    }

    verErrores(error) {
        switch(error.code) {
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "La posición no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La peticion ha caducado"
                break;
            case error.PERMISSION_DENIED:
                this.mensaje = "No se han dado permisos de localización"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }


}

var geo = new Geolocalization();
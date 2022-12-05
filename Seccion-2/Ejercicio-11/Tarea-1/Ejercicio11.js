class Geolocalization {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPos.bind(this));
    }

    getPos(pos) {
        this.long = pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.precision = pos.coords.accuracy;
        this.alt = pos.coords.altitude;
        this.prec_alt = pos.coords.altitudeAccuracy;
        this.head = pos.coords.heading;
        this.vel = posicion.coods.speed;
    }

    verErrores() {

    }

    verPos() {
        var str = '<h2>Tus datos</h2>'
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


}

var geo = new Geolocalization();
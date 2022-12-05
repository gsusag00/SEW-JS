class MapaDinamico {
    error;
    constructor() {
        this.long = -5.8502461;
        this.lat = 43.3672702;
        navigator.geolocation.getCurrentPosition(this.getPos.bind(this))
    }

    initMap() {
        var oviedo = {lat: this.lat, lng: this.long};
        var mapaOviedo = new google.maps.Map(document.querySelector('main'),{zoom: 8,center:oviedo});
        var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }

    getPos(pos) {
        this.mensaje = "La petición de geolocalización se realizo de manera correcta"
        this.long = pos.coords.longitude;
        this.lat = pos.coords.latitude;
    }

    verErrores(error) {
        this.error = true;
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

    crearMapa(){
        if(this.error) {
            document.querySelector('main').innerHTML = '<h2>Uppss...</h2><p>' + this.mensaje + '</p>';
            console.log('error')
        } else {
            $('main').after('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVeIi4acZF89Yr39A0fl4qhmk9MJHAbuc&callback=geo.initMap"></script>');
        }
    }
}
var geo = new MapaDinamico();
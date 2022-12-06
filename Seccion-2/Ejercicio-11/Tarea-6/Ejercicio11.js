class MapaDinamico {

    MAX_LAT = 90;
    MAX_LONG = 180
    error;
    constructor() {
        this.long = -5.8502461;
        this.lat = 43.3672702;
    }

    initMap() {
        var oviedo = {lat: this.lat, lng: this.long};
        var mapaOviedo = new google.maps.Map(document.querySelector('main'),{zoom: 5,center:oviedo});
        var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }

    buscar() {
        $('body script').remove();
        var lat = Math.random() * (this.MAX_LAT*2)
        var long = Math.random() * (this.MAX_LONG*2)
        lat -= this.MAX_LAT;
        long -= this.MAX_LONG;
        this.lat = lat;
        this.long = long;
        this.crearMapa();
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
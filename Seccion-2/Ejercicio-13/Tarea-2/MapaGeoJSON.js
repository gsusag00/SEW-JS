class Reader {
    lat;
    long;
    constructor() {
        this.long = -5.844540267411897;
        this.lat = 43.36347538113813;
    }

    readFile(files) {
        var archivo = files[0];
        var reader = new FileReader();
        reader.onloadend = e => this.parseJSON(reader.result)
        reader.readAsText(archivo);
    }

    parseJSON(res) {
        var arr = [];
        var json = JSON.parse(res);
        json.features.forEach( element => {
            arr.push("" + element.geometry.coordinates[0] + ',' + element.geometry.coordinates[1])
        })
        console.log(arr);
        this.initMap(arr);
    }

    initMap(arr) {
        if(arr) {
            var oviedo = {lat: this.lat, lng: this.long};
            var mapaOviedo = new google.maps.Map(document.querySelector('main'),{zoom: 8,center:oviedo});
            var info = new google.maps.InfoWindow();
    
            arr.forEach(function(coords) {
                var pos = coords.split(',');
                pos = {lat: Number(pos[1]),lng: Number(pos[0])}
                var marker = new google.maps.Marker({
                    map: mapaOviedo,
                    position: pos
                })
            });
        }
            
    }
}



var reader = new Reader();
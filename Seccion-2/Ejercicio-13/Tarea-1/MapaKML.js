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
        reader.onloadend = e => this.parseXML(reader.result)
        reader.readAsText(archivo);
    }

    parseXML(res) {
        var arr = [];
        var parser = new DOMParser();
        var xml = parser.parseFromString(res,"text/xml");
        var coord = xml.getElementsByTagName('coordinates');
        for(var i = 0; i<coord.length; i++) {
            var element = coord[i];
            arr.push(element.innerHTML.trim())
        }
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
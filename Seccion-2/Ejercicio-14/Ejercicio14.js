class CarGame {

    constructor() {
        this.width = 5;
        this.color = '#000000'
        navigator.geolocation.getCurrentPosition(this.getPos.bind(this),this.verErrores.bind(this));
    }

    getPos(pos) {
        this.long = pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.precision = pos.coords.accuracy;
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

    updateBrush() {
        document.querySelector('input[type="number"]').value = this.width;
        document.querySelector('input[type="color"]').value = this.color;
        this.context.strokeStyle = this.color;
    }

    init() {
        this.isDrawing = false;
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.updateBrush();
        this.canvas.addEventListener('mousedown', (e) => {
            this.startDrawing(e);
        });
        this.canvas.addEventListener('mouseup', (e) => {
            this.stopDrawing();
        });
        this.canvas.addEventListener('mousemove',(e) => {
            this.drawing(e);
        })
        this.offsetx = this.canvas.offsetLeft;
        this.offsety = this.canvas.offsetTop;
        this.canvas.width = window.innerWidth - this.offsetx;
        this.canvas.height = window.innerHeight - this.offsety;
    }

    changeColor(el){ 
        console.log(el.value.toString())
        this.context.strokeStyle = el.value;
    }

    changeWidth(el) {
        this.width = el.value;
        console.log(this.width);
    }

    clear() {
        this.init();
    }

    startDrawing(event) {
        console.log('Start drawing');
        this.isDrawing = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
    }

    stopDrawing() {
        console.log('Stop drawing');
        this.isDrawing = false;
        this.context.stroke();
        this.context.beginPath();
    }

    drawing(event) {
        if(this.isDrawing) {
            this.context.lineWidth = this.width;
            this.context.lineCap = 'round';
            this.context.lineTo(event.clientX - this.offsetx, event.clientY);
            this.context.stroke();
        }
    }

    useMap() {
        $('section p').remove();
        if(this.lat && this.long) {
            var url = this.crearMapa();
            var img = new Image();
            img.src = url;
            this.context.drawImage(img,this.offsetx,this.offsety);
        } else {
            $('section').append('<p>' + this.mensaje + '</p>')
        }
    }

    crearMapa() {
        var apiKey = '&key=AIzaSyBVeIi4acZF89Yr39A0fl4qhmk9MJHAbuc';
        var center = 'center=' + this.lat + ',' + this.long;
        var zoom = '&zoom=15';
        var size = '&size=' + this.canvas.width + 'x' + this.canvas.height;
        var sensor = "&sensor=false"; 

        var url = "https://maps.googleapis.com/maps/api/staticmap?"
            + center
            + zoom
            + size
            + sensor
            + apiKey;

        return url;
    }

    loadConf(files) {
        var file = files[0];
        var reader = new FileReader();
        reader.onloadend = e => this.parseJSON(reader.result);
        reader.readAsText(file);
    }    

    parseJSON(res) {
        $('section p').remove();
        var json = JSON.parse(res);
        this.width = json.width;
        this.color = json.color;
        this.lat = json.coord.lat;
        this.long = json.coord.long;
        var fail = false;

        if(!(Math.abs(this.lat) <= 90 && Math.abs(this.long) <= 180)) {
            $('section').append('<p>El valor de la latitud o longitud supera el maximo permitido</p>')
            fail = true;
        }
        if(!/^#[0-9a-fA-F]{6}$/.test(this.color)) {
            $('section').append('<p>El valor para el color no es valido</p>')
            fail = true;
        }
        if(this.width <= 0) {
            $('section').append('<p>El valor para el grosor no es valido</p>')
            fail = true;
        }
        if(!fail) {
            this.updateBrush();
        }
    }
}

var draw = new CarGame();

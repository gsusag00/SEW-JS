class Meteo {

    cities = ['Oviedo', 'Gijon', 'Pamplona', 'Tarragona', 'Sevilla'];

    constructor() {
        this.apikey = '1684cb54506dd5e217a816e3f5f01ac7';
        this.unidades = '&units=metric';
        this.idioma = '&lang=es';
        this.codigoPais = "ES";
    }

    getData(city) {
        $.ajax({
            dataType: "json",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + this.codigoPais + + this.unidades + this.idioma + '&APPID=' + this.apikey,
            method: 'GET',
            success: function (datos) {
                $('pre').text(JSON.stringify(datos, null, 2));

                var str = '<li>Ciudad: ' + datos.name + '</li>'
                str += "<li>País: " + datos.sys.country + "</li>";
                str += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                str += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                str += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                str += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                str += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                str += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                str += "<li>Humedad: " + datos.main.humidity + " %</li>";
                str += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                str += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                str += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                str += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                str += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                str += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                str += "<li>Descripción: " + datos.weather[0].description + "</li>";
                str += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                str += "<li>Nubosidad: " + datos.clouds.all + " %</li>";
                $('ul').html(str);
            },
            error: function () {
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        })
    }

}

var meteo = new Meteo();
class Meteo {

    constructor() {
        this.apikey = '1684cb54506dd5e217a816e3f5f01ac7';
        this.unidades = '&units=metric';
        this.idioma = '&lang=es';
        this.codigoPais = "ES";
    }

    getData(city) {
        $.ajax({
            dataType: "json",
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + this.codigoPais + + this.unidades + this.idioma + '&APPID=' + this.apikey,
            method: 'GET',
            success: function (datos) {
                
                $('textarea').text(JSON.stringify(datos, null, 2));
                var str = '<h3> Datos meteorológicos de: ' + datos.name + '</h3>'
                str += "<h4> Ciudad: " + datos.name + "</h4>"
                str += "<ul> <li>Latitud: " + datos.coord.lat+ "</li>"
                str += "<li> Longitud: " + datos.coord.lon + "</li>"
                str += "<li> Pais: " + datos.sys.country + "</li>"
                str += "<li> Zona horaria: " + datos.timezone + "</li>"
                str += "<li> Amanecer: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>"
                str += "<li> Atardecer: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>"
                str += "</ul>"
                str += "<h4>Temperatura y sensación</h4>"
                str += "<ul> <li> Temperatura: " + datos.main.temp + "ºC</li>"
                str += "<li> Temperatura minima: " + datos.main.temp_min + "ºC</li>"
                str += "<li> Temperatura máxima: " + datos.main.temp_max + "ºC</li>"
                str += "<li> Sensación térmica: " + datos.main.feels_like + "ºC</li>"
                str += "</ul>"
                str += "<h4>Humedad</h4>"
                str += "<p> Humedad: " + datos.main.humidity + "%</p>"
                str += "<h4>Presión</h4>"
                str += "<p> Presión: " + datos.main.pressure + "hPa</p>"
                str += "<h4>Viento</h4>"
                str += "<ul> <li> Velocidad: " + datos.wind.speed + "m/s</li>"
                console.log(datos.wind.gust)
                if(datos.wind.gust) {
                    str += "<li> Rafaga: " + datos.wind.gust + "</li>"
                }
                str += "<li> Dirección: " + datos.wind.deg + "º</li>"
                str += "</ul>"
                str += "<h4>Nubes</h4>"
                str += "<p>Porcentage: " + datos.clouds.all + "%</p>"
                str += "</ul>"
                str += "<h4>Resumen</h4>"
                str += "<p> Hoy " + datos.weather[0].description + " visto a las " +  new Date(datos.dt *1000).toLocaleTimeString() + "</p>"

                $('article').html(str);
                var url = 'https://openweathermap.org/img/w/' + datos.weather[0].icon + '.png'
                var alt =datos.weather[0].icon;
                $('picture').html('<img src="' + url + '" alt="' + alt + '">');
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
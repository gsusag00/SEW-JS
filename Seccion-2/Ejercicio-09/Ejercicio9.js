class Meteo {

    constructor() {
        this.apikey = '1684cb54506dd5e217a816e3f5f01ac7';
        this.unidades = '&units=metric';
        this.idioma = '&lang=es';
        this.codigoPais = "ES";
    }

    getData(city) {
        $.ajax({
            dataType: "xml",
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&mode=xml' + this.unidades + this.idioma + '&APPID=' + this.apikey,
            method: 'GET',
            success: function (datos) {
                console.log(datos);
                $('textarea').text((new XMLSerializer()).serializeToString(datos));
                var nombre = $('city',datos).attr("name");
                var str = '<h3> Datos meteorológicos de: ' + nombre + '</h3>'
                var long = $('coord',datos).attr("lon");
                var lat = $('coord',datos).attr("lat");
                var country = $('country',datos).text();
                var timezone = $('timezone',datos).text();
                var sunrise = $('sun',datos).attr('rise');
                sunrise = sunrise.split('T');
                var sunset = $('sun',datos).attr('set');
                sunset = sunset.split('T');
                str += "<h4> Ciudad: " + nombre + "</h4>"
                str += "<ul> <li>Latitud: " + lat+ "</li>"
                str += "<li> Longitud: " + long + "</li>"
                str += "<li> Pais: " + country + "</li>"
                str += "<li> Zona horaria: " + timezone + "</li>"
                str += "<li> Amanecer: " + sunrise[1] + "</li>"
                str += "<li> Atardecer: " + sunset[1] + "</li>"
                str += "</ul>"
                var temp = $('temperature',datos).attr('value');
                var mintemp = $('temperature',datos).attr('min');
                var maxtemp = $('temperature',datos).attr('max');
                var unit = $('temperature',datos).attr('unit');
                var sensacion = $('feels_like',datos).attr('value');
                var sensacion_unit = $('feels_like',datos).attr('unit');
                str += "<h4>Temperatura y sensación</h4>"
                str += "<ul> <li> Temperatura: " + temp + "º " + unit + "</li>"
                str += "<li> Temperatura minima: " + mintemp + "º " + unit + "</li>"
                str += "<li> Temperatura máxima: " + maxtemp + "º " + unit + "</li>"
                str += "<li> Sensación térmica: " + sensacion + "º " + sensacion_unit + "</li>"
                str += "</ul>"
                var humidity = $('humidity',datos).attr('value');
                var humidity_unit = $('humidity',datos).attr('unit');
                str += "<h4>Humedad</h4>"
                str += "<p> Humedad: " + humidity + humidity_unit + "</p>"
                var pressure = $('pressure',datos).attr('value');
                var pressure_unit = $('pressure',datos).attr('unit');
                str += "<h4>Presión</h4>"
                str += "<p> Presión: " + pressure + " " + pressure_unit + "</p>"
                var wind_speed = $('speed',datos).attr('value');
                var wind_speed_unit = $('speed',datos).attr('unit');
                var wind_speed_name = $('speed',datos).attr('name');
                var gusts = $('gusts',datos).attr('value');
                var direction = $('direction',datos).attr('value');
                var direction_code = $('direction',datos).attr('code');
                var direction_name = $('direction',datos).attr('name');
                str += "<h4>Viento</h4>"
                str += "<ul> <li> Velocidad: " + wind_speed + wind_speed_unit + ", " + wind_speed_name + "</li>"
                str += "<li> Rafaga: " + gusts + wind_speed_unit + "</li>"
                str += "<li> Dirección: " + direction + direction_code + ", " + direction_name + "</li>"
                str += "</ul>"
                var clouds = $('clouds',datos).attr('value');
                var clouds_name = $('clouds',datos).attr('name');
                var visibility = $('visibility',datos).attr('value');
                str += "<h4>Nubes</h4>"
                str += "<ul> <li> Porcentage: " + clouds + ", " + clouds_name + "</li>"
                str += "<li> Visibilidad: " + visibility + " metros</li>"
                str += "</ul>"
                var precipitation = $('precipitation',datos).attr('value');
                var precipitation_mode = $('precipitation',datos).attr('mode');
                var precipitation_unit = $('precipitation',datos).attr('unit');
                if(precipitation) {
                    str += "<h4>Lluvia</h4>"
                    str += "<p> Presión: " + precipitation + " de " + precipitation_mode + " en la última" +  precipitation_unit +  "</p>"
                }
                var weather_value = $('weather',datos).attr('value');
                var weather_icon = $('weather',datos).attr('icon');
                var last_update = $('lastupdate',datos).attr('value');
                last_update = last_update.split("T")
                str += "<h4>Resumen</h4>"
                str += "<p> Hoy " + weather_value + " visto a las " + last_update[1] + "</p>"

                $('article').html(str);
                var url = 'https://openweathermap.org/img/w/' + weather_icon + '.png'
                var alt =weather_icon;
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
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
                $('pre').text((new XMLSerializer()).serializeToString(datos));
                var nombre = $('city',datos).attr("name");
                $('h3').text("Datos meteorologicos de " + nombre);
                var long = $('coord',datos).attr("lon");
                var lat = $('coord',datos).attr("lat");
                var country = $('country',datos).text();
                var timezone = $('timezone',datos).text();
                var sunrise = $('sun',datos).attr('rise');
                var sunset = $('sun',datos).attr('set');
                var temp = $('temperature',datos).attr('value');
                var mintemp = $('temperature',datos).attr('min');
                var maxtemp = $('temperature',datos).attr('max');
                var unit = $('temperature',datos).attr('unit');
                var sensacion = $('feels_like',datos).attr('value');
                var sensacion_unit = $('feels_like',datos).attr('unit');
                var humidity = $('humidity',datos).attr('value');
                var humidity_unit = $('humidity',datos).attr('unit');
                var pressure = $('pressure',datos).attr('value');
                var pressure_unit = $('pressure',datos).attr('unit');
                var wind_speed = $('speed',datos).attr('value');
                var wind_speed_unit = $('speed',datos).attr('unit');
                var wind_speed_name = $('speed',datos).attr('name');
                var gusts = $('gusts',datos).attr('value');
                var direction = $('direction',datos).attr('value');
                var direction_code = $('direction',datos).attr('code');
                var direction_name = $('direction',datos).attr('name');
                var clouds = $('clouds',datos).attr('value');
                var clouds_name = $('clouds',datos).attr('name');
                var visibility = $('visibility',datos).attr('value');
                var precipitation = $('precipitation',datos).attr('value');
                var precipitation_mode = $('precipitation',datos).attr('mode');
                var precipitation_unit = $('precipitation',datos).attr('unit');
                var weather = $('weather',datos).attr('number');
                var weather_value = $('weather',datos).attr('value');
                var weather_icon = $('weather',datos).attr('icon');
                var last_update = $('lastupdate',datos).attr('value');
                var str = '<li>Ciudad: ' + nombre + '</li>'
                str += "<li>País: " + country + "</li>";
                str += "<li>Latitud: " + long + " grados</li>";
                str += "<li>Longitud: " + lat + " grados</li>";
                str += "<li>Temperatura: " + temp + " grados Celsius</li>";
                str += "<li>Temperatura máxima: " + maxtemp + " grados Celsius</li>";
                str += "<li>Temperatura mínima: " + mintemp + " grados Celsius</li>";
                str += "<li>Presión: " + pressure + " milibares</li>";
                str += "<li>Humedad: " + humidity + " %</li>";
                str += "<li>Amanece a las: " + sunrise + "</li>";
                str += "<li>Oscurece a las: " + sunset + "</li>";
                str += "<li>Dirección del viento: " + direction + " grados</li>";
                str += "<li>Velocidad del viento: " + wind_speed + " metros/segundo</li>";
                str += "<li>Hora de la medida: " + lastupdate + "</li>";
                str += "<li>Fecha de la medida: " + lastupdate + "</li>";
                str += "<li>Descripción: " + weather_value + "</li>";
                str += "<li>Visibilidad: " + visibility + " metros</li>";
                str += "<li>Nubosidad: " + clouds + " %</li>";
                $('ul').html(str);
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
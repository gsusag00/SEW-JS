class Gold {
    constructor() {
    }

    checkPrice() {
        var curr = document.querySelector('select').value
        var simb;
        if(curr === 'USD') {
            simb = '$'
        } else if(curr === 'EUR') {
            simb = '€'
        } else {
            simb = '£'
        }
        var date = document.querySelector('input[type="date"]').value
        if(!date) {
            date = 'latest'
        }
        console.log(simb)
        console.log(date)
        var url = 'https://api.metalpriceapi.com/v1/' + date + 
        '?api_key=5800c1c8d8170d65bcd28f18223a72e0' + 
        '&base='+ curr +
        '&currencies=XAU'
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function (datos) {
                $('h2').html('El precio del oro en ' + curr)
                $('p').html('El precio del oro es :' + datos.rates.XAU + simb + '/onza')
            },
            error: function () {
                $("h2").html("¡Tenemos problemas! No puedo obtener JSON de <a href='https://metalpriceapi.com/'>MetalPriceAPI</a>");
            }
        })
    }

}

var gold = new Gold();
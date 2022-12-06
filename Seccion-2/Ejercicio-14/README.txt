Esta es una aplicación que te permite dibujar formas, puedes cargar la configuración del pincel. El formato correcto de este archivo es como el mostrado en el archivo conf.json. Utiliza la API de geolocalizacion, API File y API Canvas.

    El valor de width puede ser como minimo 1 y como máxmimo infinito (aunque no se recomienda por razones obvias)
    El valor de color tiene que ser un valor hexadecimal con 6 valores predecido por #, por ejemplo #AAAAAA, un valor no valido seria #zz1312 o 123432, o 1234.
    Los valores de las coordenadas tienen que estar:
        - entre -90 y 90 para la latitud
        - entre -180 y 180 para la latitud.
    Cualquier valor que este por encima o por debajo de los limites dados sera considerado como invalido.

Funcionamiento de la APP.

Lo primero que tenemos que hacer darle al boton de "Ajustar a pantalla" para que el canvas tome las dimensiones de las partes no utilizadas de la pantalla.

A partir de ahi podremos pintar. Un detalle a tener en cuenta es que si mientras estamos dibujando el raton se sale del canvas y se suelta el dibujo continuara cuando el raton vuelva al canvas, ya que no se registro el evento mouseup, para esto con hacer click otra vez sobre el canvas (la parte en blanco) para dejar de pintar.

Tambien podemos utilizar una imagen del mapa de nuestra localización, para esto tendremos que darle permiso a la app para que pueda ver nuestra localización, despues de esto tendremos que darle 2 veces al boton "Usar mapa" (no se por que dos veces pero asi funciona), y podremos pintar sobre ese mapa.

Si por lo que fuese la ventana cambiase de tamaño podriamos darle otra vez al boton "Ajustar a pantalla".

Si quisiesemos limpiar la pantalla tendremos que darle al boton "Limpiar" o con recargar la página bastaria

Para cargar un archivo de configuración tendremos que darle al boton "Carga configuración", esto guardara todos los datos disponibles en el json para que podamos pintar de una determinada manera.

Puede que la página no funcione del todo en dispositivos moviles debido a que no fui capaz a conseguir que funcionen los eventos touch. Por lo demas deberia de funcionar en ordenadores y portatiles, mientras que no se utilize una pantalla tactíl
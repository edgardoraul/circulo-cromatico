window.addEventListener("DOMContentLoaded", circuloCromatico);
function circuloCromatico()
{
    /* DOCUMENTACION
    
    Compuesto por varias secciones
    - Constructor del círculo. Función que lo dibuja.
    - Velocímetro del círculo. Control de Velocidad.
    - Selector que agrega o resta porciones al círculo.
    - Selectores de color de cada porción. 
    
    */


    /* ================================================
        Velocímetro del círculo. Control de Velocidad.
    */
    const acelerador = document.getElementById("rpm");
    acelerador.addEventListener('change', acelerar);

    // Acelera con css las revoluciones por minuto y las muestra
    function acelerar() {
        let resultado = acelerador.value * 360 * 10;
        console.log(acelerador.value);

        document.getElementById("rpmNumero").innerText = acelerador.value * 10;

        document.getElementById("movimiento").innerHTML = `
    @-moz-keyframes girador {
        0% {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(${resultado}deg);
          -moz-transform: rotate(${resultado}deg);
          -o-transform: rotate(${resultado}deg);
          -ms-transform: rotate(${resultado}deg);
          transform: rotate(${resultado}deg);
        }
      }
      @-webkit-keyframes girador {
        0% {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(${resultado}deg);
          -moz-transform: rotate(${resultado}deg);
          -o-transform: rotate(${resultado}deg);
          -ms-transform: rotate(${resultado}deg);
          transform: rotate(${resultado}deg);
        }
      }
      @-o-keyframes girador {
        0% {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(${resultado}deg);
          -moz-transform: rotate(${resultado}deg);
          -o-transform: rotate(${resultado}deg);
          -ms-transform: rotate(${resultado}deg);
          transform: rotate(${resultado}deg);
        }
      }
      @keyframes girador {
        0% {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(${resultado}deg);
          -moz-transform: rotate(${resultado}deg);
          -o-transform: rotate(${resultado}deg);
          -ms-transform: rotate(${resultado}deg);
          transform: rotate(${resultado}deg);
        }
      }
    `;
    }
    // --------------------------------------------------------- 


    /* ============================================================
        Selector que agrega o resta porciones al círculo.
    */
    const cantidad = document.getElementById('cantidadPorciones');
    let porciones = cantidad.value;

    // Agrega o resta porciones de acuerdo a la cantidad elegida por el usuario
    cantidad.addEventListener('change', function () {
        porciones = cantidad.value;
        document.getElementById('cantPorciones').innerText = porciones;
        porcionador(porciones);

        // Insertarndo los selectores del color de la respectiva porción.
        insertador(porciones);
    });
    // ----------------------------------------------------------------


    /* ============================================================
       Constructor del círculo. Función que lo dibuja.
    */
    const canv = document.getElementById('circulin');
    let canvitas = canv.getContext('2d');

    // El centro del círculo (x,y), cuyo sector vamos a dibujar.
    let X = canv.width / 2;
    let Y = canv.height / 2;
    let R = canv.width / 2;

    // Suponemos que los colores son los primarios
    /* let colorArreglo = [
        'rgb(255, 0, 0)',
        'rgb(255, 127, 0)',
        'rgb(255, 255, 0)',
        'rgb(0, 189, 63)',
        'rgb(0, 104, 255)',
        'rgb(122, 0, 231)',
        'rgb(211, 0, 201)',
        'rgb(0, 128, 255)',
        'rgb(0, 255, 128)',
        'rgb(255, 128, 128)',
    ]; */
    let colorArreglo = [
        "rgb(255, 0, 0)",
        "rgb(255, 255, 0)",
        "rgb(0, 0, 255)",
    ];

    // Clase que representa una porción del círculo
    class PorcionCircular {
        constructor(anguloPartida, anguloLlegada, colorRelleno, radio) {
            this.anguloPartida = anguloPartida;
            this.anguloLlegada = anguloLlegada;
            this.colorRelleno = colorRelleno;
            this.radio = radio;
        }
    }


    // Función que dibuja
    function dibujador(AnguloPartida, AnguloLlegada, ColorRelleno, Radio) {
        // el ángulo de partida AP y el ángulo final AF
        let AngPart = (Math.PI / 180) * AnguloPartida;
        let AngFin = (Math.PI / 180) * AnguloLlegada;
    
        // Las coordenadas del punto de partida en la circunferencia
        let Xap = X + Radio * Math.sin(AngPart);
        let Yap = Y + Radio * Math.cos(AngFin);
    
        // Comenzando el dibujo
        canvitas.beginPath();
        canvitas.fillStyle = ColorRelleno;
        canvitas.moveTo(X, Y);
        canvitas.arc(X, Y, Radio, AngPart, AngFin, true);
        canvitas.fill();
        canvitas.closePath();
    }


    // Creación de las porciones por bucle
    function porcionador(p) {
        // Matriz que irá conteniendo cada una de las porciones
        const porcionesArreglo = [];

        for (let i = 0; i < p; i++) {
            // Angulo máximo disponible para cada porción
            let angPosibles = 360 / p;
        
            // Creación de las instancias de los objetos de las porciones
            porcionesArreglo.push(
                new PorcionCircular(
                
                    // Angulo de partida
                    -i * angPosibles,
                
                    // Angulo de llegada
                    -(i + 1) * angPosibles,
                
                    // Color elegido
                    colorArreglo[i],
    
                    // Radio
                    R
                )
            );
    
            // Dibujando las porciones
            dibujador(porcionesArreglo[i].anguloPartida, porcionesArreglo[i].anguloLlegada, porcionesArreglo[i].colorRelleno, porcionesArreglo[i].radio);
        }
    }
    porcionador(porciones);
    // -------------------------------------------------------


    /* COLORPIQUER. MUESTRA EL CAMBIO DE COLOR =================== */
    // A desarrollar...

    // ------------------------------------------------------------


    /* BOTONES DE AGREGAR Y RESTAR PORCIONES =================== */
    
        // Listado dinámico de los botones de selector de colores
        const listadoColorPiquers = document.getElementById("colorizadores");
    
        // Suma de a uno por vez
        const botonSumar = document.getElementById("botonSumar");
        botonSumar.addEventListener("click", actualizarValorMas);
        function actualizarValorMas() {
            ++porciones;
            cantidad.value = porciones;
        
            let cantPorciones = document.getElementById("cantPorciones");
            cantPorciones.innerText = porciones;
            porcionador(porciones);
        
            // Agrega un botón de color piquer
            let itemContenido = `<label for="colorpiquer_${porciones}">Porción
        <span id="colorpiquerleyenda_${porciones}">${porciones}</span>
        <input class="paletitas" type="color" name="colorpiquer_${porciones}" id="colorpiquer_${porciones}" value="rgb(0, 0, 255)" /><span style="background: rgb(0, 0, 255);" class="controles__muestrario" id="colorpiquer_${porciones}__muestrario">
        </span>
        </label>`;
            let itemElemento = document.createElement("span");
            itemElemento.innerHTML = itemContenido;
            listadoColorPiquers.appendChild(itemElemento);
            console.log(listadoColorPiquers.children);
        }
    
    
        // Resta de a uno por vez hasta llegar al valor 2
        const botonRestar = document.getElementById("botonRestar");
        botonRestar.addEventListener("click", actualizarValorMenos);
        function actualizarValorMenos() {
            if (porciones > 2) {
                --porciones;
                cantidad.value = porciones;
    
                let cantPorciones = document.getElementById("cantPorciones");
                cantPorciones.innerText = porciones;
                porcionador(porciones);

                // Resta un botón de color piquer
                listadoColorPiquers.lastChild.remove();
                console.log(listadoColorPiquers.children);
            }
        }
}
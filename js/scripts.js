/* DOCUMENTACION

Compuesto por varias secciones
- Constructor del círculo. Función que lo dibuja.
- Velocímetro del círculo. Control de Velocidad.
- Selector que agrega o resta porciones al círculo.
- Selectores de color de cada porción. 

*/

// Reinicializando unas variables
let porciones = 0;


/* ================================================
    Velocímetro del círculo. Control de Velocidad.
*/
const acelerador = document.getElementById("rpm"),
    sumaRPM = document.getElementById("botonSumarSlider"),
    restaRPM = document.getElementById("botonRestarSlider");

acelerador.addEventListener('change', acelerar);

sumaRPM.addEventListener("click", () => {
    acelerar(10);
});
restaRPM.addEventListener("click", () => {
    acelerar(-10);
});

// Acelera con css las revoluciones por minuto y las muestra
function acelerar(ev)
{
    if (ev = null)
    {
        ev = 0;
    }
    
    let resultado = acelerador.value * 360 * 10 + ev;
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
const cantidad = document.getElementById("cantidadPorciones");
porciones = cantidad.value;

// Usuario Agrega o resta porciones
cantidad.addEventListener("change", agregaRestaPorciones);
function agregaRestaPorciones(porciones)
{
    document.getElementById("cantPorciones").innerText = porciones;
    porcionador(porciones);

    // Insertarndo los selectores del color de la respectiva porción.
    insertador(porciones);
}
// ----------------------------------------------------------------


/* ============================================================
    CONSTRUCTOR DEL CIRCULO. FUNCION QUE LO DIBUJA.
*/

// El canvas donde se dibujará
const canv = document.getElementById('circulin');
let canvitas = canv.getContext('2d');

// El centro del círculo (x,y), cuyo sector vamos a dibujar.
let X = canv.width / 2;
let Y = canv.height / 2;
let R = canv.width / 2;

// Listado temporal de colores
/*     let colorArreglo = [
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
let listadoPaletitas = document.querySelectorAll(".paletitas");
const colorArreglo = [];
for (let i = 0; listadoPaletitas.length > i; i++)
{
    colorArreglo.push(listadoPaletitas[i].value);
}

// Clase que representa una porción del círculo
class PorcionCircular
{
    constructor(anguloPartida, anguloLlegada, colorRelleno, radio)
    {
        this.anguloPartida = anguloPartida;
        this.anguloLlegada = anguloLlegada;
        this.colorRelleno = colorRelleno;
        this.radio = radio;
    }
}


// Función que dibuja
function dibujador(AnguloPartida, AnguloLlegada, ColorRelleno, Radio)
{
    // El ángulo de partida AP y el ángulo final AF
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
function porcionador(p)
{
    // Matriz que irá conteniendo cada una de las porciones
    const porcionesArreglo = [];

    for (let i = 0; i < p; i++)
    {
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


/* BOTONES DE AGREGAR Y RESTAR PORCIONES =================== */
// Listado dinámico de los botones de selector de colores
const listadoColorPiquers = document.getElementById("colorizadores");

// Suma de a uno por vez
const botonSumar = document.getElementById("botonSumar");
botonSumar.addEventListener("click", actualizarValorMas);
function actualizarValorMas()
{
    if (porciones >= 2)
    {        
        ++porciones;
        cantidad.value = porciones;
    
        let cantPorciones = document.getElementById("cantPorciones");
        cantPorciones.innerText = porciones;
        porcionador(porciones);
    
        // Agrega un botón de color piquer
        let itemContenido = `<label for="colorpiquer_${porciones}">
            <span id="colorpiquerleyenda_${porciones}">${porciones}</span>
            <input class="paletitas" type="color" name="colorpiquer_${porciones}" id="colorpiquer_${porciones}" value="#ffff00" /><span style="background: #ffff00;" class="controles__muestrario" id="colorpiquer_${porciones}__muestrario">
            </span>
            </label>`;
        let itemElemento = document.createElement("span");
        itemElemento.innerHTML = itemContenido;
        listadoColorPiquers.appendChild(itemElemento);
        // console.log(listadoColorPiquers.children);
        cambiadorColor();
    }
}


// Resta de a uno por vez hasta llegar al valor 2
const botonRestar = document.getElementById("botonRestar");
botonRestar.addEventListener("click", actualizarValorMenos);
function actualizarValorMenos()
{
    if (porciones > 2)
    {
        --porciones;
        cantidad.value = porciones;

        let cantPorciones = document.getElementById("cantPorciones");
        cantPorciones.innerText = porciones;
        porcionador(porciones);

        // Resta un botón de color piquer
        listadoColorPiquers.lastChild.remove();
        // console.log(listadoColorPiquers.children);
    }
}

/* COLORPIQUER. MUESTRA EL CAMBIO DE COLOR =================== */
// Desarrollando
function cambiadorColor()
{
    let inputsColor = document.querySelectorAll(".paletitas");
    let muestrarioPaletas = document.querySelectorAll(".controles__muestrario");
    for (let i = 0; inputsColor.length > i; i++)
    {
        inputsColor[i].addEventListener("change", () => {
            colorArreglo[i] = inputsColor[i].value;
            if (colorArreglo.length > 2)
            {
                colorArreglo.push(inputsColor[i].value);
            }
            muestrarioPaletas[i].style.backgroundColor = inputsColor[i].value;
            porcionador(porciones);
        });
    }
}
porcionador(porciones);

/* AGREGA O RESTA 10 PUNTOS A LAS RPM */

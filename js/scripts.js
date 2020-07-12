// Constantes
const acelerador = document.getElementById("rpm");

// Escuchar los cambios en el rango
acelerador.addEventListener('change', acelerar);

// Acelera con css las revoluciones por minuto y las muestra
function acelerar()
{
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

/*
const $seleccionArchivos = document.querySelector("#seleccionArchivos");
const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

// Escuchar cuando cambie
seleccionArchivos.addEventListener("change", () => {
    
    // Los archivos seleccionados, pueden ser muchos o uno
    const archivos = seleccionArchivos.files;
    
    // Si no hay archivos salimos de la función y quitamos la imagen
    if (!archivos || !archivos.length)
    {
        imagenPrevisualizacion.src = "";
        return;
    }
    
    // Ahora tomamos el primer archivo, el cual vamos a previsualizar
    const primerArchivo = archivos[0];
    
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);
    
    // Y a la fuente de la imagen le ponemos el objectURL
    imagenPrevisualizacion.src = objectURL;
});


Dibujaremos con Canvas el círculo cromático.

El algoritmo consiste en:
1. Crear un círculo divido en porciones.
2. Las porciones son dinámicas.
3. Los bordes también son dinámicos.
4. El relleno es dinámico.
5. El ángulo de cada porción es automático o dinámico; dependiendo de cómo lo diga el usuario.
6. Hay un botón de agregar o remover porciones. Por defecto 3.
7. Tiene un selector para colocar el color.
8. Y otro selector para colocar el ángulo. Muestra los ángulos restantes que quedan por asignar.
9. Hay una función que dibuja y toma varios parámetros.
10. Hay una clase que crea instancias. Cada instancia es una porción que se dibuja.
11. Hay otra función que toma datos del usuario y se los pasa a la función que dibuja.
12. También hay otra función que guarda los datos en localstorage y los recupera.
13. Existe una estructura de control que chequea: si hay información guardada en localstorage, la extrea y construye el círculo.
14. Hay otra función que resetea y borra todo.
*/

// Tomando el canvas y brindando contexto
const canv = document.getElementById('circulin');
let canvitas = canv.getContext('2d');

// El centro del círculo (x,y), cuyo sector vamos a dibujar.
let X = canv.width / 2;
let Y = canv.height / 2;
let R = canv.width / 2;


// Suponemos que los colores son los primarios
let colorArreglo = [
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
];

// Toma todos los input tipo color piquer
const piquers = document.querySelectorAll('.paletitas');
console.log(piquers);

// Función que agrega los inputs color
function insertador(ev)
{
    const inputador = document.createElement('label');
    inputador.setAttribute('for', `colorpiquer_${ev}`);
    inputador.innerHTML = `Porción: <span id="colorpiqueryelenda_${ev}">${ev}</span>
    <input class="paletitas" type="color" name="colorpiquer_${ev}" id="colorpiquer_${ev}" value="rgb(200, 200, 200)" />`;
    return;
}

// Cantidad de porciones elegidas
const cantidad = document.getElementById('cantidadPorciones');
let porciones = cantidad.value;

cantidad.addEventListener('change', function()
{
    porciones = cantidad.value;
    document.getElementById('cantPorciones').innerText = porciones;
    porcionador(porciones);
});


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
    // el ángulo de partida AP y el ángulo final AF
    let AngPart = (Math.PI / 180) * AnguloPartida;
    let AngFin = (Math.PI / 180) * AnguloLlegada;
    
    // Las coordenadas del punto de partida en la circunferencia
    let Xap = X + Radio * Math.sin(AngPart);
    let Yap = Y + Radio * Math.cos(AngFin);
    
    // Comenzando el dibujo
    canvitas.beginPath();
    canvitas.fillStyle = ColorRelleno;
    canvitas.moveTo(X,Y);
    canvitas.arc(X, Y, Radio, AngPart, AngFin, true);
    canvitas.fill();
    canvitas.closePath();
}


// Creación de las porciones por bucle
function porcionador(p)
{
    // Matriz que irá conteniendo cada una de las porciones
    const porcionesArreglo = [];

    for(let i = 0; i < p; i++ )
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
        dibujador(porcionesArreglo[i].anguloPartida, porcionesArreglo[i].anguloLlegada, porcionesArreglo[i].colorRelleno, porcionesArreglo[i].radio );

       /*  if(i > 2)
        {
            // Inserta los inputs tipos color piquers.
            document.getElementById('colorizadores').appendChild(insertador(i+1));
        } */
    }
}
porcionador(porciones);
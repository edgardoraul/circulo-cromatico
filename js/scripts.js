// Constantes
const acelerador = document.getElementById("rpm");

// Escuchar los cambios en el rango
acelerador.addEventListener('change', acelerar);

// Acelera con css las revoluciones por minuto y las muestra
function acelerar(valor)
{
    let resultado = acelerador.value * 360;
    document.getElementById("rpmNumero").innerText = resultado / 10;
    console.log(resultado);
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

/*
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
const canvas = document.getElementById('circulin');
canvas.getContext('2d');

// El centro del círculo (x,y), cuyo sector vamos a dibujar.
let X = canvas.width / 2;
let Y = canvas.height / 2;
let R = canvas.width / 2;
console.log(X, Y, R);

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

    // el ángulo de partida AP y el ángulo final AF
    let AP = (Math.PI / 180) * 0;
    let AF = (Math.PI / 180) * 120;

    // Las coordenadas del punto de partida en la circunferencia
    let Xap = X + R * Math.cos(AP);
    let Yap = Y + R * Math.sin(AP);
}


// Función que dibuja
function dibujador(AnguloPartida, AnguloLlegada, ColorRelleno, Radio, Xinicial, Yinicial)
{
    canvas.beginPath();
    canvas.fillStyle = ColorRelleno;
    canvas.moveTo(Xinicial,Yinicial);
    canvas.arc(Xinicial, Yinicial, Radio, AnguloPartida, AnguloLlegada);
    canvas.closePath();
    canvas.fill();
}

// Función que dibuja por activación del botón
function dibujoPorClick()
{
    
}

if(canvas && canvas.getContext)
{
    let ctx = canvas.getContext('2d');
    if(ctx)
    {
        // El centro del círculo (x,y), cuyo sector vamos a dibujar.
        let X = canvas.width / 2;
        let Y = canvas.height / 2;
        let R = canvas.width / 2;
        console.log(X, Y, R);

        // el ángulo de partida AP y el ángulo final AF
        let AP = (Math.PI / 180) * 0;
        let AF = (Math.PI / 180) * 120;

        // Las coordenadas del punto de partida en la circunferencia
        let Xap = X + R * Math.cos(AP);
        let Yap = Y + R * Math.sin(AP);

        // Estilos
        ctx.fillStyle = "#abcdef";

        // Comenzando a dibujar
        ctx.beginPath();
        ctx.moveTo(X,Y);
        ctx.arc(X,Y,R,AP,AF);
        ctx.closePath();
        ctx.fill();
    }
}
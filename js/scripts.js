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
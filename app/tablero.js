const tamano=8;
const tablero=document.getElementById("tablero");
for (let i=0; i<tamano; i++) {
 
    // creamos la fila
    let fila=document.createElement("div");
    fila.classList.add("fila")
    for (let j=0; j<tamano; j++) {
 
        // creamos cada elemento de la fila
        let div=document.createElement("div");
        div.classList.add("recuadro")
        fila.appendChild(div);
    }
    tablero.appendChild(fila);
}

var nombre1 = prompt("Ingrese el nombre del Jugador 1","Jugador 1");
var nombre2 = prompt("Ingrese el nombre del Jugador 2","Jugador 2");

document.getElementById('jugador1').textContent = nombre1;
document.getElementById('jugador2').textContent = nombre2;
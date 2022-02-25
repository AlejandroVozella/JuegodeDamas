//Archivo JS del juego de Mini Damas personalizado

//********************************************************** */
//  --- DIBUJAR TABLERO / CARGAR PARTIDA 7 UBICAR FICHAS ---

//funcion para cargar una nueva partida
function cargar_nuevaPartida() {
  //verifica si es la primera vez que se cargan fichas segun estado de la variable cargaInicial
  if (cargaInicial == 0) {
    //carga tablero en una partida nueva
    cargar_tableroNuevo();

    window.alert("La partida se ha iniciado");

    //variable para indicar primera vez que se carga el tablero cambia a 1
    cargaInicial = 1;
  } else {
    if (
      window.confirm(
        "Esta operación borrará la partida actual. Desea continuar?"
      )
    ) {
      //carga tablero en una partida nueva
      cargar_tableroNuevo();

      window.alert("La partida se ha iniciado de nuevo");

      juegoFinalizado = 0;
    }
  }
}

//funcion para cargar el tablero en una nueva partida
function cargar_tableroNuevo() {
  nombre1 = prompt("Ingrese el nombre del Jugador 1", "Jugador 1");
  nombre2 = prompt("Ingrese el nombre del Jugador 2", "Jugador 2");

  //Arreglo de posicion inicial de fichas
  ArrayInicial = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ];

  //Parametro puntos Jugador 1
  puntosJugador1 = 12;

  //Parametro puntos Jugador 2
  puntosJugador2 = 12;

  //Parametro proximo turno Jugador
  turnoJugador = 1;

  //dibujo el tablero en funcion del array de juego de partida
  dibujar_fichas(
    ArrayInicial,
    nombre1,
    nombre2,
    puntosJugador1,
    puntosJugador2,
    turnoJugador
  );
}

//funcion para cargar el tablero con parametros iniciales
function cargar_tablero() {
  nombre1 = "Jugador 1";
  nombre2 = "Jugador 2";

  //actualizo el panel de turno
  document.getElementById("turno-jugador").textContent = "";

  //Arreglo de posicion de fichas inicial
  ArrayInicial = [
    [0, 1, 0, 1, 0, 2, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 2, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ];

  //Parametro puntos Jugador 1
  puntosJugador1 = 8;

  //Parametro puntos Jugador 2
  puntosJugador2 = 10;

  //Parametro proximo turno Jugador
  turnoJugador = 2;

  //dibujo el tablero en funcion del array de juego de partida
  dibujar_fichas(
    ArrayInicial,
    nombre1,
    nombre2,
    puntosJugador1,
    puntosJugador2,
    turnoJugador
  );

  juegoFinalizado = 0;
}

function dibujar_tablero() {
  //variable para indicar primera vez que se carga el tablero
  cargaInicial = 0;

  // Crea un elemento <table> y un elemento <tbody>
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crea las celdas
  for (var i = 0; i < 8; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 8; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      //Le asigno un nombre a la celda
      celda.id = i + "-" + j;

      // Crea una variable indice que me va a servir para verificar si la suma de i y j es par, para
      //establecer el color de fondo de la celda
      indice = i + j;

      //si el resto de la division de indice por 2 es cero, indice es par
      if (indice % 2 == 0) {
        celda.className = "casilla-blanca"; //casilla blanca
      } else {
        celda.className = "casilla-negra"; //casilla negra
      }

      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into 'marcoTablero'
  marcoTablero.appendChild(tabla);

  //verifico si en la sesion actual hay una partida iniciada, verificando si existe "partidaActualString" en el sessionStorage
  if (sessionStorage.getItem("PartidaActual")) {
    recargarSesionAxtual();
  }
}

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

function dibujar_fichas(
  ArrayJuega,
  nombreJug1,
  nombreJug2,
  puntosJuega1,
  puntosJuega2,
  turnoJuega
) {
  document.getElementById("nombreJugador1").textContent = nombreJug1;
  document.getElementById("nombreJugador2").textContent = nombreJug2;

  document.getElementById("puntos1").value = puntosJuega1;
  document.getElementById("puntos2").value = puntosJuega2;

  document.getElementById("turno-jugador").textContent =
    "Le toca mover al jugador: " + turnoJuega;

  // bucle para recorrer filas
  for (var i = 0; i < 8; i++) {
    // bucle para recorrer columnas
    for (var j = 0; j < 8; j++) {
      //nombre de la celda
      var nombreCelda = i + "-" + j;

      //me posiciono en la celda especifica en el tablero segun su nombre
      var celda = document.getElementById(nombreCelda);
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

      //blanqueo de fichas
      celda.classList.remove("ficha-blanca");
      celda.classList.remove("ficha-negra");

      //Ubico las fichas segun la posicion de la celda, si esta en alguno de los arreglos de posicion
      if (ArrayJuega[i][j] == 1) {
        celda.classList.add("ficha-blanca");
      } else if (ArrayJuega[i][j] == 2) {
        celda.classList.add("ficha-negra");
      }
    } //fin bucle de columnas
  } //fin bucle de filas

  //llamo a la funcion que almacena los datos de juego de la sesión actual, para que no se pierda
  //el juego al refrescar la pagina
  guardarSesionAxtual();
}

//********************************************************** */
//  ------- VALIDACION DE CASILLA MOVIMIENTO FICHAS --------

//funcion para verificar si se intentar ubicar en una casilla valida segun su posicion
function casillaValida(colorFichas, posicionAnterior, posicionNueva) {
  //salida de control
  console.log("verifica, color fichas: " + colorFichas);
  console.log("verifica, posicion anterior: " + posicionAnterior);
  console.log("verifica, posicion nueva: " + posicionNueva);

  //creo variables de comparacion de posicion fila y columna
  var filaAnterior = parseInt(posicionAnterior.substring(0, 1));
  var columnaAnterior = parseInt(posicionAnterior.substring(2));
  var filaNueva = parseInt(posicionNueva.substring(0, 1));
  var columnaNueva = parseInt(posicionNueva.substring(2));

  //salida de control
  console.log("verifica, fila anterior: " + filaAnterior);
  console.log("verifica, columna anterior: " + columnaAnterior);
  console.log("verifica, fila nueva: " + filaNueva);
  console.log("verifica, columna nueva: " + columnaNueva);

  //verifico segun el color de ficha que toca mover
  if (colorFichas == "blancas") {
    console.log("mueven las blancas");

    //verifico si se esta moviendo en diagonal 1 o 2 lugares
    //para que las blancas puedan avanzar, deben estar en una fila anterior a la 8 en ascendente
    //y la fila nueva ser la proxima a la anterior posicion
    if (
      filaAnterior < 8 &&
      filaNueva == filaAnterior + 1 &&
      Math.abs(columnaAnterior - columnaNueva) == 1
    ) {
      //para que las blancas puedan avanzar, debe haber una casilla libre en diagonal
      //en la proxima fila que la compararé con la posicion "target"
      return true;
    } else if (
      filaAnterior < 7 &&
      filaNueva == filaAnterior + 2 &&
      Math.abs(columnaAnterior - columnaNueva) == 2
    ) {
      //para que las blancas puedan avanzar 2 casillas en diagonal, debe haber una casilla
      //en la proxima segunda fila que la compararé con la posicion "target"
      //y debe haber una ficha negra en la casilla anterior para "comer"

      var posicionPosibleFicha =
        filaAnterior +
        1 +
        "-" +
        (columnaAnterior + (columnaNueva - columnaAnterior) / 2);
      console.log(posicionPosibleFicha);

      //identifico la casilla intermedia
      var casillaVerificar = document.getElementById(posicionPosibleFicha);

      //si en la casilla intermedia hay una ficha negra, se mueve la ficha blanca
      //y "come" la ficha negra
      if (casillaVerificar.classList.contains("ficha-negra")) {
        casillaVerificar.classList.remove("ficha-negra");
        document.getElementById("puntos2").value -= 1;
        return true;
      }
    }
  } else if (colorFichas == "negras") {
    console.log("mueven las negras");

    //para que las negras puedan avanzar, deben estar en una fila anterior a la 0 en descendente
    //y la fila nueva ser la proxima a la anterior posicion
    if (
      filaAnterior > 0 &&
      filaNueva == filaAnterior - 1 &&
      Math.abs(columnaAnterior - columnaNueva) == 1
    ) {
      //para que las negras puedan avanzar, debe haber una casilla libre en diagonal
      //en la proxima fila que la compararé con la posicion "target"

      //la casilla, si esta en la columna 1 o la 8, solo tendra posible una casilla de avance
      if (columnaAnterior > 1) {
        console.log(
          "se mueve desde la columna mayor a 1, hay celda libre avance columna anterior"
        );
      } else if (columnaAnterior < 8) {
        console.log(
          "se mueve desde la columna menor a 8, hay celda libre avance columna siguiente"
        );
      }
      return true;
    } else if (
      filaAnterior > 1 &&
      filaNueva == filaAnterior - 2 &&
      Math.abs(columnaAnterior - columnaNueva) == 2
    ) {
      //para que las negras puedan avanzar 2 casillas en diagonal, debe haber una casilla
      //en la proxima segunda fila que la compararé con la posicion "target"
      //y debe haber una ficha blanca en la casilla anterior para "comer"

      var posicionPosibleFicha =
        filaAnterior -
        1 +
        "-" +
        (columnaAnterior + (columnaNueva - columnaAnterior) / 2);
      console.log(posicionPosibleFicha);

      //identifico la casilla intermedia
      var casillaVerificar = document.getElementById(posicionPosibleFicha);

      //si en la casilla intermedia hay una ficha blanca, se mueve la ficha negra
      //y "come" la ficha blanca
      if (casillaVerificar.classList.contains("ficha-blanca")) {
        casillaVerificar.classList.remove("ficha-blanca");
        document.getElementById("puntos1").value -= 1;
        return true;
      }
    }
  }

  //si la casilla no es valida, no se realiza el movimiento
  return false;
}
//********************************************************** */
//  -------- ENVIO DE DATOS API EN SERVIDOR REMOTO ---------

//funcion para enviar datos a la API del servidor remoto
function enviarDatosServidor(turnoj, posicionMarca) {
  var datosEnviar = {
    turnoj,
    posicionMarca,
  };
  var servidor = "https://jsonplaceholder.typicode.com/posts";

  //script de envio POST tomato del sitio API gratuita https://jsonplaceholder.typicode.com
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(datosEnviar),
  })
    .then((response) => response.json())
    .then((json) =>
      console.log(
        "Datos enviados al servidor: Movió el jugador: " +
          turnoj +
          " a la casilla: " +
          posicionMarca
      )
    )
    .catch((err) => console.log("Error al enviar al servidor: " + err));
}

//********************************************************** */
//  --- FUNCIONES PARA VERIFICAR SI HAY GANADOR O EMPATE ---

//Funcion para verificar si solo quedan fichas de un color y resulta ganador
function verSiHayGanador() {
  var cantidadBlancas = 0;
  var cantidadNegras = 0;

  // bucle para recorrer filas y actualizar array fichas pára guardar
  for (var i = 0; i < 8; i++) {
    // bucle para recorrer columnas
    for (var j = 0; j < 8; j++) {
      //nombre de la celda
      var nombreCelda = i + "-" + j;

      //me posiciono en la celda especifica en el tablero segun su nombre
      var celda = document.getElementById(nombreCelda);

      //si el resto de la division de indice por 2 es cero, indice es par
      if (celda.classList.contains("ficha-blanca")) {
        ArrayInicial[i][j] = 1; //ficha blanca
        cantidadBlancas += 1;
      } else if (celda.classList.contains("ficha-negra")) {
        ArrayInicial[i][j] = 2; //ficha negra
        cantidadNegras += 1;
      } else {
        ArrayInicial[i][j] = 0; //no hay ficha
      }
    } //fin bucle de columnas
  } //fin bucle de filas

  console.log("cantidad de fichas blancas: " + cantidadBlancas);
  console.log("cantidad de fichas negras: " + cantidadNegras);

  if (cantidadBlancas == 0) {
    //hay GANADOR, ganaron las Negras, jugador 2

    mensaje = "FELICITACIONES, HA GANADO JUGADOR 2 CON LAS FICHAS NEGRAS!!!";

    window.alert(mensaje);

    //actualizo el panel de turno
    document.getElementById("turno-jugador").textContent =
      "HA GANADO EL JUGADOR 1!!!";

    guardarPartidaGanada(1);

    juegoFinalizado = 1;
  } else if (cantidadNegras == 0) {
    //hay GANADOR, ganaron las blancas, jugador 1

    mensaje = "FELICITACIONES, HA GANADO JUGADOR 1 CON LAS FICHAS BLANCAS!!!";

    window.alert(mensaje);

    //actualizo el panel de turno
    document.getElementById("turno-jugador").textContent =
      "HA GANADO EL JUGADOR 2!!!";

    guardarPartidaGanada(2);

    juegoFinalizado = 1;
  } else {
    //funciones para ver si hay posibilidad de movimientos
    verSiHayMasMovimientosB(); //verifico si hay posibilidad de movimiento fichas blancas
    verSiHayMasMovimientosN(); //verifico si hay posibilidad de movimiento fichas negras

    //La partida termina en empate cuando las piezas no tienen posibilidad de mas movimientos.
    //La partida termina con un ganador si el que pierde tiene piezas bloqueadas sin mas posibilidad de movimientos
    //Esta situacion se evalua una vez ejecutado un movimiento, evalua las posibilidades de jugar del siguiente jugador, y
    //la variable "turnoJugador" ya tiene el valor 1 o 2, dependiendo de quien toque mover a continuacion

    if (turnoJugador == 1 && hayMovimientosPosiblesB == 0) {
      //si el siguiente en mover son las blancas y no le quedan movimientos
      if (hayMovimientosPosiblesN == 0) {
        //y no quedan posibilidad de mover negras

        mensaje = "EMPATE, EL JUEGO FINALIZA SIN GANADORES!!!";

        window.alert(mensaje);
      } else {
        //sino, ganan las negras, jugador 2

        mensaje =
          "FELICITACIONES, BLANCAS BLOQUEADAS, HA GANADO JUGADOR 2 CON LAS FICHAS NEGRAS!!!";

        window.alert(mensaje);

        guardarPartidaGanada(2);
      }

      juegoFinalizado = 1;
    } else if (turnoJugador == 2 && hayMovimientosPosiblesN == 0) {
      //si el siguiente en mover son las negras
      if (hayMovimientosPosiblesB == 0) {
        //y no quedan posibilidad de mover blancas

        mensaje = "EMPATE, EL JUEGO FINALIZA SIN GANADORES!!!";

        window.alert(mensaje);
      } else {
        //sino, ganan las negras, jugador 2

        mensaje =
          "FELICITACIONES, NEGRAS BLOQUEADAS, HA GANADO JUGADOR 1 CON LAS FICHAS BLANCAS!!!";

        window.alert(mensaje);

        guardarPartidaGanada(1);
      }

      juegoFinalizado = 1;
    }
  }
}

function verSiHayMasMovimientosB() {
  var colorFichasMueven = "blancas";

  //tengo que verificar posibilidad de movimientos de las fichas blancas
  hayMovimientosPosiblesB = 0;

  // bucle para recorrer filas menos la ultima en busca de fichas que tengan posibilidad de movimiento
  for (var i = 0; i < 7; i++) {
    // bucle para recorrer columnas
    for (var j = 0; j < 8; j++) {
      //nombre de la celda
      var nombreCelda = i + "-" + j;

      //me posiciono en la celda especifica en el tablero segun su nombre
      var celda = document.getElementById(nombreCelda);

      //si en la celda evaluada hay una ficha blanca, evaluo si hay movimientos posibles
      if (celda.classList.contains("ficha-blanca")) {
        //recorro todas las celdas de las filas siguientes
        for (var k = i + 1; k < 8; k++) {
          for (var n = 0; n < 8; n++) {
            //nombre de la celda a evaluar
            var celdaEvaluada = k + "-" + n;

            //valido la celda evaluada, si es posible de movimiento, cambio la variable de referencia
            if (
              casillaValidaPosible(
                colorFichasMueven,
                nombreCelda,
                celdaEvaluada
              )
            ) {
              hayMovimientosPosiblesB += 1; //incrementa en 1 las posibilidades de movimientos
            }
          }
        }
      }
    } //fin bucle de columnas
  } //fin bucle de filas

  console.log(
    "cantidad de movimientos posibles fichas blancas: " +
      hayMovimientosPosiblesB
  );
}

function verSiHayMasMovimientosN() {
  console.log("evaluo posibilidad movimiento de las negras");

  var colorFichasMueven = "negras";

  //tengo que verificar posibilidad de movimientos de las fichas blancas
  hayMovimientosPosiblesN = 0;

  // bucle para recorrer filas menos la ultima en busca de fichas que tengan posibilidad de movimiento
  for (var i = 7; i > 0; i--) {
    // bucle para recorrer columnas
    for (var j = 0; j < 8; j++) {
      //nombre de la celda
      var nombreCelda = i + "-" + j;

      //me posiciono en la celda especifica en el tablero segun su nombre
      var celda = document.getElementById(nombreCelda);

      //si en la celda evaluada hay una ficha negra, evaluo si hay movimientos posibles
      if (celda.classList.contains("ficha-negra")) {
        //recorro todas las celdas de las filas siguientes
        for (var k = i - 1; k > 0; k--) {
          for (var n = 0; n < 8; n++) {
            //nombre de la celda a evaluar
            var celdaEvaluada = k + "-" + n;

            //valido la celda evaluada, si es posible de movimiento, cambio la variable de referencia
            if (
              casillaValidaPosible(
                colorFichasMueven,
                nombreCelda,
                celdaEvaluada
              )
            ) {
              hayMovimientosPosiblesN += 1; //incrementa en 1 las posibilidades de movimientos
            }
          }
        }
      }
    } //fin bucle de columnas
  } //fin bucle de filas
}

//***************************************************************** */
// ------ GUARDAR PARTIDA EN LOCALSTORAGE PARA CONTINUAR LUEGO ------

// funcion para guardar los datos de la partida a traves del uso de LocalStorage
// la partida se almacena como array multidimensional
function guardar_partida() {
  // bucle para recorrer filas y actualizar array fichas pára guardar
  for (var i = 0; i < 8; i++) {
    // bucle para recorrer columnas
    for (var j = 0; j < 8; j++) {
      //nombre de la celda
      var nombreCelda = i + "-" + j;

      //me posiciono en la celda especifica en el tablero segun su nombre
      var celda = document.getElementById(nombreCelda);

      //si el resto de la division de indice por 2 es cero, indice es par
      if (celda.classList.contains("ficha-blanca")) {
        ArrayInicial[i][j] = 1; //ficha blanca
      } else if (celda.classList.contains("ficha-negra")) {
        ArrayInicial[i][j] = 2; //ficha negra
      } else {
        ArrayInicial[i][j] = 0; //no hay ficha
      }
    } //fin bucle de columnas
  } //fin bucle de filas

  console.log(ArrayInicial);

  //armo el array con los datos del juego actual
  partidaGuardada = [
    document.getElementById("nombreJugador1").textContent, //Posicion 0: Nombre jugador 1
    document.getElementById("nombreJugador2").textContent, //Posicion 1: Nombre jugador 2
    document.getElementById("puntos1").value, //Posicion 2: Puntos jugador 1
    document.getElementById("puntos2").value, //Posicion 3: Puntos jugador 2
    ArrayInicial, //Posicion 4: Array de posiciones de fichas del juego
    turnoJugador, //Posicion 5: turno del proximo jugador que toca mover
    juegoFinalizado, //Posicion 6: indicador de si el juego ya esta finalizado
    mensaje, //Posicion 7: variable mensaje
  ];

  //CONVERSION PARA ALMACENAR DATOS CONVIRTIENDO ARRAY A STRING
  var partidaGuardadaString = JSON.stringify(partidaGuardada);

  //GUARDO LOS DATOS AL LOCAL STORAGE
  localStorage.setItem("partidaGuardada", partidaGuardadaString);
}
//funcion para recuperar datos de una partida anterior almacenado en LocalStorage y cargarla
function recuperar_partida_guardada() {
  //verifica si es la primera vez que se cargan fichas segun estado de la variable cargaInicial
  if (cargaInicial == 0) {
    //recupero el array con los datos del juego a partir del dato almacenado en el sessionStorage
    partidaGuardada = JSON.parse(localStorage.getItem("partidaGuardada"));

    console.log(partidaGuardada);

    //recupero los 7 parametros almacenados de la partida: nombre y puntos jugador 1 y 2,
    //posiciones de fichas, turno proximo jugador, indicador de juego finalizado y variable mensaje
    var nomJugador1 = partidaGuardada[0]; //Posicion 0: Nombre jugador 1
    var nomJugador2 = partidaGuardada[1]; //Posicion 1: Nombre jugador 2
    var puntosJugador1 = partidaGuardada[2]; //Posicion 2: Puntos jugador 1
    var puntosJugador2 = partidaGuardada[3]; //Posicion 3: Puntos jugador 2
    ArrayInicial = partidaGuardada[4]; //Posicion 4: Array de posiciones de fichas del juego
    turnoJugador = partidaGuardada[5]; //Posicion 5: turno del proximo jugador que toca mover
    juegoFinalizado = partidaGuardada[6]; //Posicion 6: indicador de si el juego ya esta finalizado
    mensaje = partidaGuardada[7]; //Posicion 7: variable mensaje

    //dibujo el tablero en funcion del array de juego de partida
    dibujar_fichas(
      ArrayInicial,
      nomJugador1,
      nomJugador2,
      puntosJugador1,
      puntosJugador2,
      turnoJugador
    );

    window.alert("La partida se ha cargado correctamente");

    //variable para indicar primera vez que se carga el tablero cambia a 1
    cargaInicial = 1;
  } else {
    if (
      window.confirm(
        "Esta operación borrará la partida actual. Desea continuar?"
      )
    ) {
      //recupero el array con los datos del juego a partir del dato almacenado en el sessionStorage
      partidaGuardada = JSON.parse(localStorage.getItem("partidaGuardada"));

      //recupero los 7 parametros almacenados de la partida: nombre y puntos jugador 1 y 2,
      //posiciones de fichas, turno proximo jugador, indicador de juego finalizado y variable mensaje
      var nomJugador1 = partidaGuardada[0]; //Posicion 0: Nombre jugador 1
      var nomJugador2 = partidaGuardada[1]; //Posicion 1: Nombre jugador 2
      var puntosJugador1 = partidaGuardada[2]; //Posicion 2: Puntos jugador 1
      var puntosJugador2 = partidaGuardada[3]; //Posicion 3: Puntos jugador 2
      ArrayInicial = partidaGuardada[4]; //Posicion 4: Array de posiciones de fichas del juego
      turnoJugador = partidaGuardada[5]; //Posicion 5: turno del proximo jugador que toca mover
      juegoFinalizado = partidaGuardada[6]; //Posicion 6: indicador de si el juego ya esta finalizado
      mensaje = partidaGuardada[7]; //Posicion 7: variable mensaje

      //dibujo el tablero en funcion del array de juego de partida
      dibujar_fichas(
        ArrayInicial,
        nomJugador1,
        nomJugador2,
        puntosJugador1,
        puntosJugador2,
        turnoJugador
      );

      window.alert("La partida se ha cargado correctamente");
    }
  }
}

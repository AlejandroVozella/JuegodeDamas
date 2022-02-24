//*************** CONSTANTES ********************/




//*************** VARIABLES ********************/
//variable jugador actual ( 0: nueva partida , 1: blancas , 2: negras )

//declaro variable global para indicar primera vez que se carga el tablero
var cargaInicial;

var posicionMarcada = "ninguna";

var mensaje = "";

//declaro variable global para establecer que el juego ha terminado y no se pueden seguir moviendo fichass
var juegoFinalizado = 0;

//variable para verificar posibilidad de movimientos de las fichas
var hayMovimientosPosiblesB;      //fichas blancas
var hayMovimientosPosiblesN;      //fichas negras


//Arreglo de posicion de fichas
var ArrayInicial = [
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0],
];


//Parametro puntos Jugador 1
var puntosJugador1 = 0;

//Parametro puntos Jugador 2
var puntosJugador2 = 0;

//Parametro proximo turno Jugador
var turnoJugador = 1;

//array que contiene datos de la partida actual
var partidaActual = [];
//array que contiene datos de la partida guardada
var partidaGuardada = [];
//array que contiene datos de las partidas ganadas
var partidaGanada = [];
var arraypartidasGanadas = [];



//*************** LISTENER EN TABLERO ***********************/

// Obtener la referencia del elemento body
var marcoTablero = document.getElementById('tablero-marco');

//agrego un eventListener sobre el click en las caillas
marcoTablero.addEventListener('click', e => { seleccionCelda(e)})

var seleccionCelda = e => {

    console.log(e.target);

    // console.log(e.target.classList.contains('casilla-blanca'));
    // console.log(e.target.classList.contains('casilla-negra'));

    // console.log(e.target.classList.contains('ficha-blanca'));
    // console.log(e.target.classList.contains('ficha-negra'));

    //consola: salida de control si hay status de posicion anterior anterior
    console.log('posicion anterior: ' + posicionMarcada);


    //Antes de dar saleccion a la ficha, verifica si la partida ya termino, si no es asi (0), ejecuta el movimiento
    if (juegoFinalizado == 0){
        
        if (e.target.classList.contains('ficha-blanca')){          //----->>>>> seleccion de ficha blanca
            if (turnoJugador == 1) {
                if(e.target.classList.contains('casilla-seleccionada') !== true){
                    e.target.classList.add("casilla-seleccionada");
                    if (posicionMarcada !== "ninguna") {
                        var casillaDesmarca = document.getElementById(posicionMarcada);
                        casillaDesmarca.classList.remove("casilla-seleccionada");
                    }
                }
                posicionMarcada = e.target.id;                       //Guardo la nueva posicion marcada actual
            } else if (turnoJugador == 2) {                          //----->>>>> si le toca mover a las negras
                mensaje = "Es el turno de mover al jugador 2, fichas negras a una casilla vacía!";
                window.alert(mensaje);
            }

        } else if (e.target.classList.contains('ficha-negra')){     //----->>>>> seleccion de ficha negra
            if (turnoJugador == 2) {
                if(e.target.classList.contains('casilla-seleccionada') !== true){
                    e.target.classList.add("casilla-seleccionada");
                    if (posicionMarcada !== "ninguna") {
                        var casillaDesmarca = document.getElementById(posicionMarcada);
                        casillaDesmarca.classList.remove("casilla-seleccionada");
                    }
                }
                posicionMarcada = e.target.id;                       //Guardo la nueva posicion marcada actual
            } else if (turnoJugador == 1) {                          //----->>>>> si le toca mover a las blancas
                mensaje = "Es el turno de mover al jugador 1, fichas blancas a una casilla vacía!";
                window.alert(mensaje);
            }
        } else {                                            //----->>>>> seleccion de ficha casilla vacia
            
            if (posicionMarcada !== "ninguna") {            //----->>>>> verifica si hay una casilla con ficha marcada
                var casillaDesmarca = document.getElementById(posicionMarcada);
                
                //Ubico las fichas segun la posicion de la celda, si esta en alguno de los arreglos de posicion
                if ( casillaDesmarca.classList.contains('ficha-blanca') 
                        && turnoJugador == 1 
                        && casillaValida('blancas', posicionMarcada, e.target.id)) { 
                    //si verifico que hanía una casilla seleccionada con ficha blanca y es turno de las blancas
                    //muevo la ficha a la nueva casilla
                    e.target.classList.add("ficha-blanca");     
                    
                    //quito la ficha de la casilla anterior
                    casillaDesmarca.classList.remove("ficha-blanca");  
                    //quito la marca de seleccion de casilla
                    casillaDesmarca.classList.remove("casilla-seleccionada"); 

                    posicionMarcada = e.target.id;                       //Guardo la nueva posicion marcada actual

                    enviarDatosServidor(turnoJugador, posicionMarcada);   //envio datos a la API servidor remoto 
                    
                    //asigno turno al otro jugador
                    console.log('le toca proximo turno jugador 2, fichas negras');
                    turnoJugador = 2;         

                    //actualizo el panel de turno
                    document.getElementById('turno-jugador').textContent = 'Le toca mover al jugador: ' + turnoJugador;

                    verSiHayGanador();                                    //verifico si hay ganador tras el movimiento
                }
                else if(casillaDesmarca.classList.contains('ficha-negra') 
                        && turnoJugador == 2 
                        && casillaValida('negras', posicionMarcada, e.target.id) ) {
                    //si verifico que hanía una casilla seleccionada con ficha negraa y es turno de las negras
                    //muevo la ficha a la nueva casilla
                    e.target.classList.add("ficha-negra"); 

                    //quito la ficha de la casilla anterior
                    casillaDesmarca.classList.remove("ficha-negra");  
                    //quito la marca de seleccion de casilla
                    casillaDesmarca.classList.remove("casilla-seleccionada"); 
                    
                    posicionMarcada = e.target.id;                       //Guardo la nueva posicion marcada actual

                    enviarDatosServidor(turnoJugador, posicionMarcada);   //envio datos a la API servidor remoto 
                    
                    //asigno turno al otro jugador
                    console.log('le toca proximo turno jugador 1, fichas blancas');
                    turnoJugador = 1; 

                    //actualizo el panel de turno
                    document.getElementById('turno-jugador').textContent = 'Le toca mover al jugador: ' + turnoJugador;

                    verSiHayGanador();                                    //verifico si hay ganador tras el movimiento
                }
            }
        }
    }
    else {      //la partida esta finalizada, no hay seleccion de fichas. Se muestra mensaje
        
        window.alert('PARTIDA FINALIZADA: ' + mensaje);

    }

    console.log('posicion nueva: ' + posicionMarcada);

    //llamo a la funcion que almacena los datos de juego de la sesión actual, para que no se pierda
    //el juego al refrescar la pagina
    guardarSesionAxtual();

}
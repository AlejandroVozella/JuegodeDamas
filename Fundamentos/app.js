// var primerNombre = 'Alejandro';

// console.log (primerNombre);

//Coversion de Tipos 

// var primerNombre , edad , sexo ;

// primerNombre='Alejandro';
// edad = 34 ;
// sexo = 'M';

// console.log ('El nombre es:'+primerNombre+' y su edad es:'+edad);

// Operadores - Matematicos (+,-,*,/)

var edadGrover , edadPablo , sumaEdades,yearActual;

edadGrover = 34 ;
edadPablo=10;
yearActual=2019;

var difernciaEdad = edadGrover-edadPablo;
sumaEdades = edadGrover+edadPablo;
console.log (difernciaEdad);

var yerGrove = yearActual-edadGrover

var yerPablo = yearActual-yerPablo

//Operados Logicos

//Compara si son iguales 

var mayorGrover = edadGrover == edadPablo;

console.log (mayorGrover);

//Operador typeof , tipo de dato que tiene una variable 

console.log (typeof edadGrover);

console.log (typeof edadPablo);

//Operadores del tipo Unario Aritmeticos 

// ++ Ingremento 
// -- Decremento

var edadCarmen = 18 ;

var edadMaria=14;

edadCarmen++;

console.log(edadCarmen);

//Operados de Asingacion 

//=

var a = 5 ;
var b =18 ;

a = a+b ;

a +=b;
a -=b;
a *=b;
a /=b;

c = a%b; //Devuelve el resto de una Division .
a %= b;


//Calculo IMC//

var pesoLuis = 72 ;
var alturaLuis=1.72;

var pesoCarlos = 89;
var alturaCarlos=1.75;

//IMC Luis 
// var potenciaLuis = Math.pow(alturaLuis,2);

// imcLuis= pesoLuis/potenciaLuis;

// var pontenciCarlos = Math.pow(alturaCarlos,2);

// imcCarlos= pesoCarlos/pontenciCarlos ;

// var comparacion = imcCarlos == imcLuis ;

// console.log (`El IMC de Carlos es Superior al de Luis ?${comparacion}`);

//Sentencias If / Else 

// var nombre = 'Pablo';
// var estadoCilvl = 'Soltero';

// if (estadoCilvl==='casado'){
//     //Si es Verdadera esta Condicion 
//     console.log (nombre + 'esta casado' )
// }else {
//     console.log (nombre +  ' esta  soltero')
// }

// 

// Operador Ternario 

// var nombre = 'Pablo ';

// var edad = 15;

// edad >= 18 ? console.log(nombre + ' es mayor de edad'): console.log (nombre + 'no es mayor de edad');


//Sentencia Switch 

// var mes = 10 ;

// switch (mes){
//     case 1 :
//         console.log ("Enero");
//         break;
//     case 2 :
//         console.log ("Febrero");
//         break;
//     case 3 :
//         console.log ("Marzo");
//         break;
//     case 4:
//         console.log("Abril");
//         break;
//         default:
//         console.log ("Mes no Considerado");
// }

//Sentencia For 
//Recorro uno a uno
// for (var i = 0; i <= 10;i++){
//     console.log(i);
// }


//Recorro dos en dos
// for (var i = 0; i <= 10;i+=2){
//     console.log(i);
// }

//Descendente 

// for (var i = 10; i >= 1 ;i--){
//     console.log(i);
// }

//Valores Falsos

var edad ;

edad=10;

//Validacion de Variables 
// if(edad){
//     console.log("Variable esta definida");
// }else {
//     console.log ("Variable no Definida")
// }

// //Operadores de Igualdad 

// if (edad==10){
//     console.log("Variable con coersion");
// }else {
//     console.log ("Variable Sin Coersion");
// }


var promedioPablo = (14+1+16)/3;

var promedioMaria = (12+18+10)/3;

if (promedioPablo>promedioMaria){
    console.log("Pablo tiene el promedio superior");
}else if (promedioMaria>promedioPablo){
    console.log ("Maria tiene el promedio superior");
}else {
    console.log ("Pablo y Maria tienen promedios Iguales");
}

//Mostrar si estan aprobados 

for (var i=1; i<=2;i++){
    if (i===1){
        if (promedioPablo>13){
            console.log("Pablo esta aprobado");
        }else 
            console.log ("Pablo esta desaprobado");
    }else {
        if (promedioMaria>13){
        console.log ("Maria esta aprobada");
        }else {
            console.log ("Maria esta desaprobada");
        }
    }
}
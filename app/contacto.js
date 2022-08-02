function enviarDatosContacto() {
  //me posiciono en el campo nombre del formulario
  var campoNombre = document.getElementById("nombre");
  //me posiciono en el campo mail del formulario
  var campoMail = document.getElementById("mail");
  //me posiciono en el campo consulta del formulario
  var campoConsulta = document.getElementById("consulta");

  var contactoNombre = campoNombre.value;
  var contactoMail = campoMail.value;
  var contactoConsulta = campoConsulta.value;

  //VALIDACIONES DE LOS DATOS DE LOS CAMPOS
  //verifico que el texto de nombre y apellido ingresado tenga al menos 5 caracteres
  if (contactoNombre.length >= 5) {
    //verifico que la direccion de mail tenga una estructura valida
    if (
      contactoMail.indexOf("@") > 0 &&
      contactoMail.length >= 9 &&
      contactoMail.lastIndexOf(".") - contactoMail.indexOf("@") > 3
    ) {
      //verifico que el campo de la consulta no este vacio
      if (contactoConsulta.length >= 5) {
        //ejecuto el envio de datos por medio del programa/herramienta de envío de emails predeterminada del sistema operativo.
        var urlMail =
          "mailto:" +
          contactoMail +
          "?subject=Contacto de " +
          contactoNombre +
          " a traves de la pagina de Minidamas2_JS&body=" +
          contactoConsulta;
        
        location.href = urlMail;
      } else {
        window.alert("Datos incompletos: Escriba la consulta a realizar");
      }
    } else {
      window.alert(
        "Datos incompletos: La direccion de correo electronico no es correcta"
      );
    }
  } else {
    window.alert(
      "Datos incompletos: Escriba su nombre y apellido, minimo 5 caracteres"
    );
  }
}

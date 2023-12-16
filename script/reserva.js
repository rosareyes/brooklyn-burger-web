/* Valida la reserva y envia un mensaje al usuario */
function validateForm(e) {
  var name = document.forms['reservationForm']['name'].value;
  var time = document.forms['reservationForm']['time'].value;
  var date = document.forms['reservationForm']['date'].value;

  alert(
    'Gracias, ' +
      name +
      '. La reserva se ha guardado exitosamente el día ' +
      date +
      ', a las ' +
      time +
      ', click OK para ir a la pantalla de inicio.'
  );

  window.location.href = '/';

  return false;
}

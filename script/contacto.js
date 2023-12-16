/* Valida el mensaje y envia un mensaje al usuario */
function validateForm(e) {
  var name = document.forms['contactForm']['name'].value;

  alert(
    'Gracias, ' +
      name +
      '. Tu mensaje se ha enviado con éxito. Click OK para ir a la pantalla de inicio.'
  );

  window.location.href = '/';

  return false;
}

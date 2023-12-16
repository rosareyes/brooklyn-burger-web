/* 
  Práctica 2 - Javascript
  UC3M
  Autores: 
        Rosa Reyes - 100434072
        Carlos De Val - 100421888
 */

/* Apenas se carga el documento, verificamos si hay datos */
checkCookie();

/* Valida los datos del usuario según los requerimientos */
function validateForm(e) {
  var dni = document.forms['userForm']['dni'].value;
  var name = document.forms['userForm']['name'].value;
  var phone = document.forms['userForm']['phone'].value;
  var email = document.forms['userForm']['email'].value;

  checkCookie();

  var dniRegex = /^[0-9]{8}[A-Za-z]$/;
  var phoneRegex = /^[0-9]{9}$/;

  if (!dniRegex.test(dni)) {
    alert('Please enter a valid DNI.');
    return false;
  }

  if (name == '') {
    alert('Please enter your name.');
    return false;
  }

  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid phone number.');
    return false;
  }

  setCookie(
    {
      name: name,
      dni,
      phone,
      email,
    },
    'usuario'
  );
  alert(
    'Bienvenido/a, ' +
      name +
      '. Te has registrado exitosamente, click OK para ir a la pantalla de inicio.'
  );

  window.location.href = '/';

  return false;
}

function resetForm() {
  document.forms['userForm'].reset();
  /* we delete the cookie by setting an expiration date */
  document.cookie =
    'usuario' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/* Cookies */

function setCookie(cookie_object, cookie_name) {
  let cookie_value = JSON.stringify(cookie_object);
  document.cookie = cookie_name + '=' + cookie_value + ';' + ';path=/';
}
function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var cookie_value = c.substring(name.length, c.length);
      return JSON.parse(cookie_value);
    }
  }
  return '';
}

function checkCookie() {
  var user = getCookie('usuario');
  if (user) {
    document.forms['userForm']['dni'].value = user.dni;
    document.forms['userForm']['name'].value = user.name;
    document.forms['userForm']['phone'].value = user.phone;
    document.forms['userForm']['email'].value = user.email;

    setFieldsDisabled(true);

    // mostrar botón de editar
    let editBtn = document.getElementById('editButton');
    if (editBtn) {
      editBtn.classList.remove('hidden');
    }
  }
  return false;
}

function setFieldsDisabled(disabled) {
  document.forms['userForm']['dni'].disabled = disabled;
  document.forms['userForm']['name'].disabled = disabled;
  document.forms['userForm']['phone'].disabled = disabled;
  document.forms['userForm']['email'].disabled = disabled;
}

function editForm() {
  setFieldsDisabled(false);
}

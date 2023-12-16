/* 
  Práctica 2 - Javascript
  UC3M
  Autores: 
        Rosa Reyes - 100434072
        Carlos De Val - 100421888
 */

/* detectamos primero el active breadcrumb 
y mostramos la sección correspondiente */

let activeElement = document.querySelector('.active');
document.getElementById('section-' + activeElement.id).style.display = 'block';
document.getElementById('1').onclick = () => {
  setActive('1');
};

let time = 10 * 60; // 10 minutos para el contador del final

/* info de los elementos del menu */
const items = [
  {
    id: 1,
    imgSrc: 'images/bg1.jpg',
    altText: 'Burger Image of a classic burger',
    name: 'Classic Burger',
    description:
      'Nuestra hamburguesa clásica está hecha con 100% carne de res, lechuga, tomate, cebolla, pepinillos y nuestra salsa especial.',
    price: 8.99,
  },
  {
    id: 2,
    imgSrc: 'images/bg2.jpg',
    altText: 'Burger Image of a cheese burger',
    name: 'Cheese Burger',
    description:
      'Una hamburguesa de carne de res con queso derretido, lechuga, tomate, cebolla, pepinillos y nuestra salsa especial.',
    price: 9.99,
  },
  {
    id: 3,
    imgSrc: 'images/bg3.jpg',
    altText: 'Burger Image of a chicken burger',
    name: 'Chicken Burger',
    description:
      'Una jugosa hamburguesa de pollo con lechuga, tomate, mayonesa y nuestra salsa especial.',
    price: 9.49,
  },
  {
    id: 4,
    imgSrc: 'images/bg4.jpg',
    altText: 'Burger Image of a veggie burger',
    name: 'Veggie Burger',
    description:
      'Una deliciosa hamburguesa vegetariana con lechuga, tomate, cebolla y nuestra salsa especial.',
    price: 7.99,
  },
  {
    id: 5,
    imgSrc: 'images/bg5.jpg',
    altText: 'Burger Image of a fish burger',
    name: 'Fish Burger',
    description:
      'Una deliciosa hamburguesa vegetariana con lechuga, tomate, cebolla y nuestra salsa especial.',
    price: 8.99,
  },
  {
    id: 6,
    imgSrc: 'images/bg6.jpg',
    altText: 'Burger Image of a double cheese burger',
    name: 'Double Cheese Burger',
    description:
      'Dos hamburguesas de carne de res con doble queso, lechuga, tomate, cebolla, pepinillos y nuestra salsa especial.',
    price: 10.99,
  },
];

function generateMenuItemHtml(item) {
  return `    
    <div class="pedido__menu-item">    
      <div class="pedido__menu-img-container"><img src="${item.imgSrc}" alt="${item.altText}" class="pedido__menu-img" /></div>  
      <h2>${item.name}</h2>    
      <p>${item.description}</p>    
      <p class="pedido__menu-precio">Precio: €<span>${item.price}</span></p>    
      <div class="pedido__menu-cantidad-wrapper">Cantidad: <input id="quantity-${item.id}" type="number" min="0" max="100" value="0" class="pedido__menu-cantidad " aria-label='cantidad de platos' /> </div>    
    </div>    
  `;
}

/* Generamos el HTML de cada elemento del menu */
const itemsContainer = document.getElementById('items-container');

items.forEach((item) => {
  itemsContainer.innerHTML += generateMenuItemHtml(item);
});

/* selección de items */
let selectedItems = [];
document.getElementById('contador').innerHTML = selectedItems.length;

function setActive(newId) {
  let oldId = document.getElementsByClassName('active')[0].id;
  document.getElementById('section-' + oldId).style.display = 'none';
  document.getElementsByClassName('active')[0].classList.remove('active');
  document.getElementById(newId).classList.add('active');
  document.getElementById('section-' + newId).style.display = 'block';
}

/* Sección 1: Selección */

/* Añadir / Eliminar elementos de la lista de elementos seleccionados con los campos de cantidad */

let quantityInputs = document.querySelectorAll('input[type=number]');

quantityInputs.forEach((input) => {
  input.addEventListener('change', handleQuantityChange);
});

function handleQuantityChange() {
  /* cogemos el Id del item seleccionado */
  let itemId = this.id.replace('quantity-', '');
  let quantity = this.value;

  let selectedItemIndex = selectedItems.findIndex((item) => item.id === itemId);

  if (quantity > 0) {
    /* si es -1 es que no consiguio el elemento */
    if (selectedItemIndex > -1) {
      /* si está, cambiamos la cantidad */
      selectedItems[selectedItemIndex].quantity = quantity;
    } else {
      /* si no, agregamos el item al array */
      selectedItems.push({ id: itemId, quantity: quantity });
    }
  } else {
    /* borramos el articulo */
    if (selectedItemIndex > -1) {
      selectedItems.splice(selectedItemIndex, 1);
    }
  }

  /* recorremos el array y vamos sumando al total la cantidad de los elementos */
  let total = 0;
  for (let i = 0; i < selectedItems.length; i++) {
    total += Number(selectedItems[i].quantity);
  }
  document.getElementById('contador').textContent = total;
  saveOrderToCookie(); // guardamos la cookie cuando cambia la cantidad
}
/* Sección 2: Resumen */

function generateOrderSummary() {
  let total = 0;
  let selectedItemsInfo = [];

  selectedItems.forEach((selectedItem) => {
    let found = items.find((item) => item.id == selectedItem.id);
    if (found) {
      selectedItemsInfo.push({ ...found, quantity: selectedItem.quantity });
      total += found.price * selectedItem.quantity;
    }
  });

  let html = selectedItemsInfo
    .map(
      (item) => `      
      <div class="pedido__item">      
        <img src="${item.imgSrc}" alt="${
        item.altText
      }" class="pedido__item-img">      
        <div class="pedido__item-info">      
          <h3>${item.name}</h3>      
           
        </div>      
        <p class="pedido__item-price">€${item.price} x ${item.quantity} = €${
        item.price * item.quantity
      }</p>      
      </div>      
    `
    )
    .join('');
  html += `<div class="pedido__total"><p>Total: €${total.toFixed(2)}</p></div>`;
  document.getElementById('selected-items-container').innerHTML = html;
  saveOrderToCookie();
}

document.getElementById('carrito-button').onclick = () => {
  setActive('2');
  generateOrderSummary();
};

/* Sección 3: Estado */

function getCurrentTimeInSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

function loadStartTimeFromCookie() {
  let name = 'startTime=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return parseInt(c.substring(name.length, c.length));
    }
  }
  return null;
}

function startTimer() {
  let startTime = loadStartTimeFromCookie();
  if (startTime === null) {
    startTime = getCurrentTimeInSeconds();
    document.cookie = 'startTime=' + startTime + ';path=/';
  }

  let totalTime = 10 * 60;
  let elapsedTime = getCurrentTimeInSeconds() - startTime;
  time = totalTime - elapsedTime;
  let progressBar = document.getElementById('progress-bar');
  let minutesElement = document.getElementById('minutes');
  let secondsElement = document.getElementById('seconds');
  let motoElement = document.getElementById('moto');
  let seccionTitleElement = document.getElementById('pedido-title');
  let seccionSubtitleElement = document.getElementById('pedido-subtitle');

  let interval = setInterval(function () {
    if (time <= 0) {
      clearInterval(interval);
      time = 0;
      seccionTitleElement.innerText = '¡Tu pedido ya llegó!';
      seccionSubtitleElement.innerText =
        'Disfruta de la comida, ¡Buen provecho!';
    }
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    let progressPercentage = ((totalTime - time) / totalTime) * 100;
    progressBar.style.width = progressPercentage + '%';
    motoElement.style.left = progressPercentage + '%';
    time -= 1;
  }, 1000);
}

document.getElementById('pago-button').onclick = () => {
  setActive('3');
  // Actualiza la visualización del tiempo antes de iniciar el temporizador
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML =
    seconds < 10 ? '0' + seconds : seconds;
  startTimer();
};
document.getElementById('revisar-button').onclick = () => {
  setActive('1');
};

/* Cookies */

function saveOrderToCookie() {
  document.cookie = 'order=' + JSON.stringify(selectedItems) + ';path=/';
}

/* cargamos la orden desde la cookie */
function loadOrderFromCookie() {
  let name = 'order=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      selectedItems = JSON.parse(c.substring(name.length, c.length));
    }
  }
}
function setActive(newId) {
  let oldId = document.getElementsByClassName('active')[0].id;
  document.getElementById('section-' + oldId).style.display = 'none';
  document.getElementsByClassName('active')[0].classList.remove('active');
  document.getElementById(newId).classList.add('active');
  document.getElementById('section-' + newId).style.display = 'block';

  // Guardar la sección activa en la cookie cuando se cambia de sección
  saveActiveSectionToCookie(newId);
}

function saveActiveSectionToCookie(sectionId) {
  document.cookie = 'activeSection=' + sectionId + ';path=/';
}

function loadActiveSectionFromCookie() {
  let name = 'activeSection=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/* llamamos loadOrderFromCookie cuando carga la pagina */
window.onload = function () {
  loadOrderFromCookie();

  // Cargar la sección activa desde la cookie cuando se carga la página
  let activeSection = loadActiveSectionFromCookie();
  if (activeSection !== '') {
    setActive(activeSection);
  }

  /* actualizamos la info de acuerdo a la cookie */
  selectedItems.forEach((item) => {
    document.getElementById('quantity-' + item.id).value = item.quantity;
  });

  /* actualizamos el contador sumando los elementos de cada item */
  /* a es el acumulador y b es cada elemento de un array */
  document.getElementById('contador').textContent = selectedItems.reduce(
    (a, b) => a + Number(b.quantity),
    0
  );

  // Si la sección 2 está activa al cargar la página, generamos el resumen del pedido
  if (activeSection === '2') {
    generateOrderSummary();
  }

  if (activeSection === '3') {
    let startTime = loadStartTimeFromCookie();
    if (startTime !== null) {
      let currentTime = getCurrentTimeInSeconds();
      let elapsedTime = currentTime - startTime;
      time = time - elapsedTime;
    }
    // Actualiza la visualización del tiempo antes de iniciar el temporizador
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML =
      seconds < 10 ? '0' + seconds : seconds;
    startTimer();
  }
};

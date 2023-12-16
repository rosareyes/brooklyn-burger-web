/* 
  Práctica 2 - Javascript
  UC3M
  Autores: 
        Rosa Reyes - 100434072
        Carlos De Val - 100421888
 */

/* seleccionamos todos los carruseles de imágenes */
let slideShowContainers = Array.from(document.querySelectorAll('.slider'));

/* Recorremos cada carrusel e implementamos la animación */
slideShowContainers.forEach((slideShowContainer) => {
  let currentIndex = 0;
  const slides = slideShowContainer.querySelectorAll('.slides li');
  const dots = slideShowContainer.querySelectorAll('a');

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function (event) {
      event.preventDefault();
      currentIndex = index;
      showSlides(currentIndex);
    });
  });

  showSlides(currentIndex);

  function showSlides(index) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
      dots[i].className = dots[i].className.replace(' slides-dot-active', '');
    }

    slides[index].style.display = 'block';
    dots[index].className += ' slides-dot-active';
  }

  setInterval(function () {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    showSlides(currentIndex);
  }, 2000); /* cambiamos las imágenes cada 2 segs */
});

function hamburgerMenu() {
  var x = document.getElementById('hamburger-links');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

function moveIcon(x) {
  x.classList.toggle("change");
}

/* cambia el color del background on scroll */
window.addEventListener('scroll', function () {
  let sectionsOdd = document.querySelectorAll('.section:nth-child(odd)');
  let sectionsNotOdd = document.querySelectorAll(
    '.section:not(:nth-child(odd))'
  );

  sectionsOdd.forEach((section) => {
    let rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      section.style.backgroundColor = '#FFFF99';
    }
  });

  sectionsNotOdd.forEach((section) => {
    let rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      section.style.backgroundColor = '#ADD8E6';
    }
  });
});

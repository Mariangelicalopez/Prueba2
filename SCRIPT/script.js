// Activar íconos de Lucide
lucide.createIcons();

// Seleccionar elementos
const toggle = document.querySelector('.mi-nav-menu-toggle');
const navMenu = document.querySelector('.mi-nav-menu');
const icon = toggle.querySelector('i');

// Evento de clic para abrir/cerrar menú
toggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  toggle.classList.toggle('rotate');

  // Cambiar ícono de "menu" a "x"
  const isOpen = navMenu.classList.contains('active');
  icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
  lucide.createIcons(); // actualizar el ícono
});

document.addEventListener("DOMContentLoaded", function () {
  // TURISMO SLIDER // 
  let nextBtn = document.querySelector('.next');
  let prevBtn = document.querySelector('.prev');

  let slider = document.querySelector('.slider');
  let sliderList = slider.querySelector('.slider .list');
  let thumbnail = document.querySelector('.slider .thumbnail');
  let thumbnailItems = thumbnail.querySelectorAll('.item');

  thumbnail.appendChild(thumbnailItems[0]);

  // Function for next button 
  nextBtn.onclick = function() {
      moveSlider('next');
  }

  // Function for prev button 
  prevBtn.onclick = function() {
      moveSlider('prev');
  }

  function moveSlider(direction) {
      let sliderItems = sliderList.querySelectorAll('.item');
      let thumbnailItems = document.querySelectorAll('.thumbnail .item');
      
      if(direction === 'next'){
          sliderList.appendChild(sliderItems[0]);
          thumbnail.appendChild(thumbnailItems[0]);
          slider.classList.add('next');
      } else {
          sliderList.prepend(sliderItems[sliderItems.length - 1]);
          thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
          slider.classList.add('prev');
      }

      slider.addEventListener('animationend', function() {
          if(direction === 'next'){
              slider.classList.remove('next');
          } else {
              slider.classList.remove('prev');
          }
      }, {once: true});
  }

  // ===============================================
  // MODALES PERSONALIZADOS PARA "VER MÁS"
  // ===============================================

  const verMasBtns = document.querySelectorAll('.button .ver-mas, .button button[data-modal]');
  const modals = document.querySelectorAll('.modal-custom');

  function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('show');
  }

  function cerrarModal(modal) {
    modal.classList.remove('show');
  }

  verMasBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.modal;
      if (id) abrirModal(id);
    });
  });

  modals.forEach(m => {
    m.querySelector('.close-modal').addEventListener('click', () => cerrarModal(m));
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) cerrarModal(modal);
    });
  });
});


// TARJETAS QUE HABLAN (SOLO LEE LA PARTE DE ATRÁS)//

let selectedVoice = null;

// Cargar voces cuando estén disponibles
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  // Cambia el nombre por la voz exacta que quieras, por ejemplo "Google US Spanish"
  selectedVoice = voices.find(v => v.name === "Google español");
}

speechSynthesis.onvoiceschanged = loadVoices;

function speak(text) {
  window.speechSynthesis.cancel(); // Evita que se superpongan voces
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES"; 
  if (selectedVoice) u.voice = selectedVoice;
  speechSynthesis.speak(u);
}

const cards = document.querySelectorAll('.card');

cards.forEach(c => {
  c.addEventListener("click", () => {
    speak(c.dataset.text);
  });
});
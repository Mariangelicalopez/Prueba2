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

// modal esencia
const modalEsencia = document.getElementById("modalEsencia");
const titleEsencia = document.getElementById("modalEsenciaTitle");
const textEsencia = document.getElementById("modalEsenciaText");

const btnCerrarEsencia = document.getElementById("cerrarEsenciaBtn");
const xCerrarEsencia = document.getElementById("cerrarEsenciaX");
const btnOpenEsencia = document.getElementById("openEsencia");


// 👉 FUNCIÓN PARA ABRIR EL MODAL
function abrirModalEsencia(titulo, texto) {
  titleEsencia.textContent = titulo;
  textEsencia.textContent = texto;
  modalEsencia.classList.add("show");
}


// 👉 BOTÓN QUE ABRE EL MODAL
btnOpenEsencia.addEventListener("click", () => {
  abrirModalEsencia(
    "Nuestra Historia",
    "San Sebastián de Buenavista nació entre el río, la tradición y la identidad cultural..."
  );
});


// 👉 BOTÓN CERRAR
btnCerrarEsencia.addEventListener("click", () => {
  modalEsencia.classList.remove("show");
});

// 👉 X CERRAR
xCerrarEsencia.addEventListener("click", () => {
  modalEsencia.classList.remove("show");
});

// 👉 CERRAR HACIENDO CLICK AFUERA
modalEsencia.addEventListener("click", (e) => {
  if (e.target === modalEsencia) {
    modalEsencia.classList.remove("show");
  }
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


// TARJETAS QUE HABLAN (CON VOZ GOOGLE Y DATA-TEXT) //

let selectedVoice = null;

// Cargar voces cuando estén disponibles
function loadVoices() {
  const voices = speechSynthesis.getVoices();

  // 🔥 Busca cualquier voz Google en español
  selectedVoice = voices.find(v =>
    v.name.toLowerCase().includes("google") &&
    v.lang.toLowerCase().startsWith("es")
  );
}

speechSynthesis.onvoiceschanged = loadVoices;

document.addEventListener("DOMContentLoaded", () => {

  const tarjetas = document.querySelectorAll(".card");

  let utterance = null;
  let hablando = false;

  tarjetas.forEach(card => {

    const textoData = card.dataset.text; // 🔥 ESTA ES LA LÍNEA IMPORTANTE

    card.addEventListener("click", (e) => {

      e.preventDefault(); // evita doble clic por flip

      // ✔ SI YA ESTÁ HABLANDO → DETENER
      if (hablando) {
        speechSynthesis.cancel();
        hablando = false;
        utterance = null;
        return;
      }

      // ✔ cancelar voces previas
      speechSynthesis.cancel();

      // ✔ utilizar SOLO data-text
      utterance = new SpeechSynthesisUtterance(textoData);

      // ✔ asignar voz Google
      if (selectedVoice) utterance.voice = selectedVoice;

      utterance.lang = "es-ES";

      utterance.onend = () => {
        hablando = false;
        utterance = null;
      };

      hablando = true;

      // ✔ Delay requerido por Chrome
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 60);
    });

  });

});

// Load jQuery from NPM
import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/collapse';
import LazyLoad from 'vanilla-lazyload';
import ScrollMagic from 'scrollmagic';
import 'magnific-popup';
import 'slick-carousel';

window.jQuery = $;
window.$ = $;

/* Lazy Load */
const lazyLoadInstance = new LazyLoad({
  elements_selector: '.lazy',
  // ... more custom settings?
});

/* Form */
$('.field .form-control').on('focus', function add() {
  $(this).parent('.field').addClass('has-focus');
});

$('.field .form-control').on('blur', function remove() {
  const self = $(this);
  if (!self.val().trim()) {
    self.parent('.field').removeClass('has-focus');
  }
});

window.addEventListener('load', () => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = $('.needs-validation');
  // Loop over them and prevent submission
  Array.prototype.filter.call(forms, (form) => {
    form.addEventListener('submit', (event) => {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);

// $('#contact').submit((e) => {
//   e.preventDefault();

//   const $form = $('#contact');
//   $.post($form.attr('action'), $form.serialize())
//     .done(() => {
//       $('#form-success').removeClass('d-none');
//       $('#form-error').addClass('d-none');
//     })
//     .catch((e2) => {
//       console.log(e2);
//       $('#form-success').addClass('d-none');
//       $('#form-error').removeClass('d-none');
//     });
// });

// const encode = (data) => {
//   return Object.keys(data)
//     .map((key) => `${encodeURIComponent(key)} = ${encodeURIComponent(data[key])}`)
//     .join('&');
// };

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const data = [...event.target.elements]
//     .filter((element) => Boolean(element.name))
//     .reduce((json, element) => {
//       json[element.name] = element.value;
//       return json;
//     }, {});
//   fetch(event.target.action, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: encode(data),
//   })
//     .then(() => {
//       $('#form-success').removeClass('d-none');
//       $('#form-error').addClass('d-none');
//     })
//     .catch(() => {
//       $('#form-success').addClass('d-none');
//       $('#form-error').removeClass('d-none');
//     });
// }

$(document).scroll(function scroll() {
  const $nav = $('#navbar');
  $nav.toggleClass('scrolled', $(this).scrollTop() >= $nav.position().top);
});

$(document).ready(() => {
  lazyLoadInstance.update();

  $('.ajax-popup').magnificPopup({
    type: 'ajax',
    closeOnBgClick: false,
    closeBtnInside: false,
    gallery: {
      enabled: true,
    },
    callbacks: {
      ajaxContentAdded: function loaded() {
        // Ajax content is loaded and appended to DOM
        // $('.image-slider').slick();
      },
    },
  });
});

/* Scroll Reveal */
const controller = new ScrollMagic.Controller();
$(document).ready(() => {
  const revealElements = $('#method .step, #gallery .step');
  for (let i = 0; i < revealElements.length; i += 1) { // create a scene for each element
    new ScrollMagic.Scene({
      triggerElement: revealElements[i], // y value not modified, so we can use element as trigger
      triggerHook: 0.9 - (0.05 * i),
      offset: 50, // move trigger to center of element
      reverse: false,
    })
      .setClassToggle(revealElements[i], 'visible') // add class toggle
      .addTo(controller);
  }
});

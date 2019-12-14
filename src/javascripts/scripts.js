// Load jQuery from NPM
import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/collapse';
import LazyLoad from 'vanilla-lazyload';
import 'magnific-popup';

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

$('#contact').submit((e) => {
  e.preventDefault();

  const $form = $('#contact');
  $.post($form.attr('action'), $form.serialize())
    .then(() => {
      alert('Thank you! We will get back to you within 24 hours.');
    })
    .catch(() => {
      alert('Oops... something went wrong. Please try again.');
    });
});

$(document).scroll(function scroll() {
  const $nav = $('#navbar');
  $nav.toggleClass('scrolled', $(this).scrollTop() >= $nav.position().top);
});

$(document).ready(() => {
  lazyLoadInstance.update();

  $('.ajax-popup').magnificPopup({
    type: 'ajax',
    gallery: {
      enabled: true,
    },
  });
});

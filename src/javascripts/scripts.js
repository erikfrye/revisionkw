// Load jQuery from NPM
import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/collapse';
import LazyLoad from 'vanilla-lazyload';
import ScrollMagic from 'scrollmagic';
import 'lightgallery';
import 'lg-thumbnail';
import 'lg-hash';


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

$(document).scroll(function scroll() {
  const $nav = $('#navbar');
  $nav.toggleClass('scrolled', $(this).scrollTop() >= $nav.position().top);
});

$(document).ready(() => {
  lazyLoadInstance.update();
  $('#lightgallery').lightGallery({
    thumbnail: true,
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

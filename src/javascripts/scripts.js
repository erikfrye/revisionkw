// Load jQuery from NPM
import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/scrollspy';
import LazyLoad from 'vanilla-lazyload';

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
});

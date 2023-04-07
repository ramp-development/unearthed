import Splide from '@splidejs/splide';

export const slider = () => {
  const slider = document.querySelector('.splide.is-partnerships');
  new Splide(slider, {
    type: 'loop',
    fixedWidth: '35%',
    gap: '32px',
    focus: 'center',
    arrows: false,
    speed: 350,
    easing: 'cubic-bezier(.165, .84, .44, 1)',
    breakpoints: {
      991: {
        fixedWidth: '50%',
      },
      767: {
        fixedWidth: '100%',
      },
    },
  }).mount();
};

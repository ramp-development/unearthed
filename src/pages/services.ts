import { Splide } from '@splidejs/splide';
export const services = () => {
  const slider = new Splide('.splide.is-projects', {
    gap: '32px',
    perPage: 1,
    fixedWidth: '35vw',
    focus: 'center',
    type: 'loop',
    speed: 350,
    easing: 'cubic-bezier(.165, .84, .44, 1)',
    pagination: false,
    breakpoints: {
      991: {
        fixedWidth: '50vw',
      },
      768: {
        fixedWidth: '100%',
      },
    },
  }).mount();
};

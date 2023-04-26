import { getCurrentBreakpoint } from '@finsweet/ts-utils';
import Splide from '@splidejs/splide';

export const initLogos = (component) => {
  const instance: null | Splide = null;
  const slider = component.querySelector('.splide.is-logos');

  let initialise = true;

  if (getCurrentBreakpoint() === 'main') {
    window.addEventListener('resize', () => {
      if (getCurrentBreakpoint() !== 'main') initSplide(instance, slider);
    });
  } else {
    initSplide(instance, slider);
  }

  function initSplide(instance: null | Splide, slider: HTMLElement) {
    if (instance !== null) return;
    instance = new Splide(slider, {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      arrows: false,
      pagination: false,
      speed: 350,
      easing: 'cubic-bezier(.165, .84, .44, 1)',
      autoplay: true,
      interval: 4000,
      breakpoints: {
        767: {
          perPage: 2,
        },
      },
    }).mount();

    initialise = false;

    instance.on('resize', () => {
      if (getCurrentBreakpoint() === 'main') destroySplide(instance, slider);
    });
  }

  function destroySplide(instance: null | Splide, slider: HTMLElement) {
    instance?.destroy();

    initialise = true;
    instance = null;
  }
};

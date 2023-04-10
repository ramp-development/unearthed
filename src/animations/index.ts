import { gsapAnimations } from './gsap';

export const animations = () => {
  const wrappers = [...document.querySelectorAll('[data-animation-element="wrapper"]')];
  gsapAnimations(wrappers);
};

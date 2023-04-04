import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const scale = () => {
  const component = document.querySelector('.scale_component');
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: component,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
    },
  });

  timeline.from(component, {
    scale: 0.8,
    duration: 1,
  });
};

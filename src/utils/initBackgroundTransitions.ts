import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initBackgroundTransitions = (triggers: HTMLElement | HTMLElement[]) => {
  console.log(triggers);
  // make images an array if it isn't already
  if (!Array.isArray(triggers)) triggers = [triggers];

  triggers.forEach((trigger, index) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'top center',
        scrub: 0.5,
      },
    });

    timeline
      .to(document.body, {
        backgroundColor: index % 2 === 0 ? '#fff' : '#000',
        color: index % 2 === 0 ? '#000' : '#fff',
      })
      .to(
        '.nav_component',
        {
          backgroundColor: index % 2 === 0 ? '#fff' : '#000',
          color: index % 2 === 0 ? '#000' : '#fff',
        },
        '<'
      )
      .to(
        '.nav_menu',
        {
          backgroundColor: index % 2 === 0 ? '#fff' : '#000',
        },
        '<'
      );
  });
};

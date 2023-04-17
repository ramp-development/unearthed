import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initBackgroundTransitions = (triggers: HTMLElement | HTMLElement[]) => {
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

    const theme = index % 2 === 0 ? 'light' : 'dark';

    const backgroundColor = theme === 'dark' ? '#000' : '#fff';
    const color = theme === 'dark' ? '#fff' : '#000';
    const brand = theme === 'dark' ? '#b1ff00' : '#4708f5';

    timeline
      .to(document.body, { backgroundColor, color })
      .to('html', { '--standard-text': color }, '<')
      .to('html', { '--standard-background': backgroundColor }, '<')
      .to('html', { '--brand-text': brand }, '<')
      .to('html', { '--brand-background': brand }, '<');

    document.addEventListener('barba', () => {
      timeline.kill();
    });
  });
};

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const gsapAnimations = (wrappers) => {
  const nav = document.querySelector('.nav_bar');
  const navTl = gsap.timeline({
    scrollTrigger: {
      trigger: nav,
      start: 'top top',
      end: '+=400',
      scrub: 1,
    },
  });

  navTl.to(nav, { paddingTop: 20, paddingBottom: 20 });
  wrappers.forEach((wrapper) => {
    // get the re-used components
    const header = wrapper.querySelector('[data-animation-element="header"]');
    const eyebrow = wrapper.querySelector('[data-animation-element="eyebrow"]');
    const subHeading = wrapper.querySelector('[data-animation-element="sub-heading"]');
    const sub = wrapper.querySelector('[data-animation-element="sub-content"]');
    const content = wrapper.querySelector('[data-animation-element="content"]');
    const splitText = [...wrapper.querySelectorAll('[data-gsap="splitText"]')];

    // hide the elements
    // gsap.set([header, content], { opacity: 0 });

    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.out',
      },
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 80%',
      },
    });

    timeline
      .to(header, { opacity: 1, duration: 0.5 })
      .from(eyebrow, { translateY: '100%', duration: 0.5 }, '<');

    splitText.forEach((item) => {
      const split = new SplitText(item, {
        type: 'words',
      });

      //   split.lines.forEach((line) => (line.style.display = 'inline'));

      timeline.from(split.words, {
        duration: 0.5,
        opacity: 0,
        rotationX: -15,
        force3D: true,
        transformOrigin: 'top center -100',
        // stagger: 0.1,
        // stagger: function (index, target, list) {
        //   // your custom logic here. Return the delay from the start (not between each)
        //   return index * Math.random() * 0.1;
        // },
        stagger: {
          each: 0.1,
          ease: 'power1.in',
        },
      });
    });

    timeline.from(sub, { opacity: 0, translateY: -16 }, '< 0.1');

    timeline.from(content, { opacity: 0, translateY: -32, duration: 2 }, '< 0.5');
  });
};

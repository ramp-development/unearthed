import barba from '@barba/core';
import { restartWebflow, TABS_CSS_CLASSES } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { pages } from 'src/pages';

import { initBackgroundTransitions } from '$utils/initBackgroundTransitions';
import { initLogos } from '$utils/initLogos';
import { initTabs } from '$utils/initTabs';

import { flip } from './transitions/flip';
import { placeItems } from './transitions/placeItems';

export const barbaAnimations = () => {
  barba.hooks.enter((data) => {
    restartWebflow();
    pages();
    const event = new Event('barba');
    document.dispatchEvent(event);
  });
  barba.hooks.afterEnter((data) => {
    window.scrollTo(0, 1);
    window.scrollTo(0, 0);
    console.log('afterEnter');
    const backgroundTransitions = [
      ...data?.next.container.querySelectorAll('[ramp-gsap="background"]'),
    ];
    if (backgroundTransitions) initBackgroundTransitions(backgroundTransitions);

    const tabs = [...data?.next.container.querySelectorAll(`.${TABS_CSS_CLASSES.tabs}`)];
    if (tabs) initTabs(tabs);

    const logos = data?.next.container.querySelector('.logos_component');
    if (logos) initLogos(logos);

    const backgroundColor = '#000';
    const color = '#fff';
    const brand = '#b1ff00';

    gsap.to('html', { '--standard-text': color, duration: 0.25 });
    gsap.to('html', { '--standard-background': backgroundColor, duration: 0.25 }, '<');
    gsap.to('html', { '--brand-text': brand, duration: 0.25 }, '<');
    gsap.to('html', { '--brand-background': brand, duration: 0.25 }, '<');
    return gsap.to(data?.current.container, { opacity: 0, duration: 0.25 }, '<');
  });
  barba.hooks.after((data) => {
    data.next.container.style.removeProperty('position');
    data.next.container.style.removeProperty('top');
    data.next.container.style.removeProperty('left');
    if (document.querySelector('[fs-cmsslider-element]')) location.reload();
  });

  barba.init({
    preventRunning: true,
    transitions: [
      {
        sync: true,
        enter(data) {
          data.next.container.style.position = 'fixed';
          data.next.container.style.top = '0';
          data.next.container.style.left = '0';
          gsap.to(data.current.container.querySelector('main'), { opacity: 0, duration: 1 });
          gsap.from(data.next.container.querySelector('main'), { opacity: 0, duration: 1 });
          return;
        },
        after(data) {
          data.next.container.style.position = 'relative';
        },
      },
      {
        sync: true,
        from: {
          custom: ({ trigger }) => {
            return trigger.href && trigger.href.includes('/work/');
          },
        },
        to: {
          namespace: ['work-template'],
        },
        enter(data) {
          // set the next container to fixed position
          data.next.container.style.position = 'fixed';
          data.next.container.style.top = '0';
          data.next.container.style.left = '0';

          // place the transition items and save them in a variable
          const transitionItems = placeItems(data);

          // hide the 'main' element of the current container
          gsap.to(data.current.container.querySelector('main'), {
            opacity: 0,
            delay: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          });

          // flip between two states for each item
          flip(transitionItems, data);

          // show the new elements
          const transitionToItems = [...data.next.container.querySelectorAll('[data-flip-id]')];
          transitionToItems.forEach((item) => item.classList.remove('hide'));

          // fade in the rest of the content
          return gsap.from(data.next.container.querySelector('main'), {
            opacity: 0,
            delay: 0.5,
            duration: 1,
            ease: 'power1.inOut',
          });
        },
      },
    ],
  });
};

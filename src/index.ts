import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { initBackgroundTransitions } from '$utils/initBackgroundTransitions';

import { animations } from './animations';
import { about } from './pages/about';
import { home } from './pages/home';
import { services } from './pages/services';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(Flip, ScrollTrigger, MorphSVGPlugin, SplitText);

  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      home();
      break;
    case '/about-us':
      about();
      break;
    case '/what-we-do':
      services();
      break;
  }

  animations();

  const backgroundTransitions = [...document.querySelectorAll('[ramp-gsap="background"]')];
  if (backgroundTransitions) initBackgroundTransitions(backgroundTransitions);
});

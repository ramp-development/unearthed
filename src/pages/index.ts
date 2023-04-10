import { animations } from 'src/animations';

import { initBackgroundTransitions } from '$utils/initBackgroundTransitions';

import { about } from './about';
import { home } from './home';
import { services } from './services';

export const pages = () => {
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
};

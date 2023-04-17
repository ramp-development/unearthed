import { animations } from 'src/animations';

import { about } from './about';
import { home } from './home';
import { services } from './services';

export const pages = () => {
  switch (window.location.pathname) {
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
};

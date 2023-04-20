import { animations } from 'src/animations';

import { about } from './about';
import { home } from './home';
import { industryTemplate } from './industryTemplate';
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
    case '/our-services':
      services();
      break;
    default:
      if (pathname.includes('/industries/')) {
        industryTemplate();
      }
  }

  animations();
};

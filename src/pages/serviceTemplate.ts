import { restartWebflow } from '@finsweet/ts-utils';

import { initSprints } from '$utils/initSprints';

export const serviceTemplate = () => {
  const cmsListItems = [...document.querySelectorAll('.cms-list_rich-text li')];
  cmsListItems.forEach((item) => {
    item.classList.add('slide-up');
  });
  restartWebflow();

  setTimeout(initSprints, 500);
};

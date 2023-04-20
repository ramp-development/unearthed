import { restartWebflow } from '@finsweet/ts-utils';

export const industryTemplate = () => {
  const cmsListItems = [...document.querySelectorAll('.cms-list_rich-text li')];
  cmsListItems.forEach((item) => {
    item.classList.add('slide-up');
  });
  restartWebflow();
};

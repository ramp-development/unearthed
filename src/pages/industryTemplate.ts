import { restartWebflow } from '@finsweet/ts-utils';

export const industryTemplate = () => {
  const cmsListItems = [...document.querySelectorAll('.cms-list_rich-text li')];
  cmsListItems.forEach((item) => {
    item.classList.add('slide-up');
  });
  restartWebflow();

  const sprintArrows = [...document.querySelectorAll('.sprints_arrow')];
  const sprintNavDots = [...document.querySelectorAll('.sprints_component .w-slider-dot')];
  const disableArrows = () => {
    const active = sprintNavDots.find((dot) => {
      return dot.classList.contains('w-active');
    });

    const activeIndex = sprintNavDots.indexOf(active);

    if (activeIndex === 0) {
      sprintArrows[0].classList.add('is-disabled');
      sprintArrows[1].classList.remove('is-disabled');
    } else if (activeIndex === sprintNavDots.length - 1) {
      sprintArrows[0].classList.remove('is-disabled');
      sprintArrows[1].classList.add('is-disabled');
    } else {
      sprintArrows[0].classList.remove('is-disabled');
      sprintArrows[1].classList.remove('is-disabled');
    }
  };

  disableArrows();
  sprintArrows.forEach((arrow) => {
    arrow.onclick = () => {
      setTimeout(() => {
        disableArrows();
      }, 10);
    };
  });
};

import { Flip } from 'gsap/Flip';

/**
 * Function to place the transition items in the transition wrapper
 * @param {object} data - the default Flip data object
 */

export const placeItems = (data) => {
  const transitionItems = [...data.trigger.querySelectorAll('[data-flip-id]')];
  //   const transitionItems = allTransitionItems.filter((item) => {
  //     if (item.dataset.transition !== 'image') return true;
  //     const link = item.closest('a');
  //     return link?.pathname === data.next.url.path;
  //   });

  // create a wrapper for the transition items and append it to the current container
  const transitionWrapper = document.createElement('div');
  transitionWrapper.classList.add('transition_wrapper');
  data.current.container.appendChild(transitionWrapper);

  // place the transition items in the transition wrapper
  transitionItems.forEach((item) => {
    const state = Flip.getState(item);
    transitionWrapper.appendChild(item);
    Flip.to(state, { absolute: true, duration: 0 });
  });

  return transitionItems;
};

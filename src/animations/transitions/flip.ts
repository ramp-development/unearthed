import { Flip } from 'gsap/Flip';

export const flip = (transitionItems, data) => {
  transitionItems.forEach((item) => {
    // find the corresponding item in the next container
    const { flipId } = item.dataset;
    const incoming = data.next.container.querySelector(`[data-flip-id="${flipId}"]`);

    // hide the item and get the incoming state to animate to
    item.classList.add('hide');
    const state = Flip.getState(incoming);

    // show the current item and hide the item we're animating to
    item.classList.remove('hide');
    incoming.classList.add('hide');

    // animate to the incoming state
    Flip.to(state, { targets: [item], duration: 0.5, ease: 'power1.inOut' });
  });
};

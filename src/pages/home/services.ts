import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getDistanceOfElementFromParentElement } from '$utils/getDistanceOfElementFromParentElement';

/**
 * Adjust the home services section layout.
 */
export const homeServices = (): void => {
  console.log('services');

  // Get the home services section and its child elements
  const section = document.querySelector('.home-services_component') as HTMLElement;
  if (!section) return;
  const list = section.querySelector('.home-services_list') as HTMLElement;

  // Set the top property for each list item
  const listChildren = [...list.children];
  listChildren.forEach((child: Element, index) => {
    // set the top for the item
    const top = (window.innerHeight - child.offsetHeight) / 2;
    (child as HTMLElement).style.top = `${top}px`;

    // return if this is the first item
    if (index === 0) return;

    // create a timeline that affect the previous item
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: child,
        start: `top ${top + 128}`,
        end: `top ${top}`,
        scrub: 1,
      },
    });

    timeline.to(listChildren[index - 1], { opacity: 0, scale: 0.9 });
  });

  // // Adjust the header's marginBottom and the list's marginTop based on the height of the first list item
  // if (!heightOfListItem) return;
  // const headerStyles = getComputedStyle(header);
  // header.style.marginBottom = `${parseFloat(headerStyles.marginBottom) + heightOfListItem}px`;
  // list.style.marginTop = `${-heightOfListItem}px`;

  // // Get the distance between the list and its parent (section)
  // const listItemTop = getDistanceOfElementFromParentElement(list, section);

  // // Set the top property for each list item based on the calculated distance
  // if (!listItemTop) return;
  // [...list.children].forEach((child: Element) => {
  //   (child as HTMLElement).style.top = `${listItemTop.y}px`;
  // });
};

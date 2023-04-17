import { getCurrentBreakpoint } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

/**
 * Adjust the home services section layout.
 */
export const homeServices = (): void => {
  const replaceWrappers = [...document.querySelectorAll('[data-replace-image="wrapper"]')];
  replaceWrappers.forEach((wrapper) => {
    const image = wrapper.querySelector('[data-replace-image="image"]') as HTMLElement;
    const text = wrapper.querySelector('[data-replace-image="text"]') as HTMLElement;

    const parser = new DOMParser();
    const svg = parser.parseFromString(text.textContent, 'image/svg+xml');

    image.replaceWith(svg.documentElement);
    text.remove();
  });
  if (getCurrentBreakpoint() !== 'main') return;

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

    const numbers = child.querySelectorAll('.home-services_number');
    const numberTl = gsap.timeline({
      scrollTrigger: {
        trigger: child,
        start: `top ${top + 128}`,
        end: `top ${top}`,
        scrub: 1,
      },
    });

    numberTl
      .from(numbers[0], {
        translateY: '50%',
        opacity: 0,
      })
      .from(
        numbers[1],
        {
          translateY: '50%',
          opacity: 0,
        },
        '<0.1'
      );

    // return if this is the first item
    if (index === 0) return;

    // create a timeline that affect the previous item
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: child,
        start: `top ${window.innerHeight - top}`,
        end: `top ${top}`,
        scrub: 1,
      },
    });

    timeline.to(listChildren[index - 1], { opacity: 0, scale: 0.9 });
  });
};

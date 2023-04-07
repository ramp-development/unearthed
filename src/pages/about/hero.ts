import { getCurrentBreakpoint } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Animate the about hero section with GSAP and ScrollTrigger.
 */
export const aboutHero = (): void => {
  // Get the required elements
  const component = document.querySelector('.about-hero_component') as HTMLElement;
  if (!component) return;

  const stickyWrapper = component.querySelector('.about-hero_sticky-wrapper') as HTMLElement;
  const groups = stickyWrapper.querySelector('.about-hero_groups') as HTMLElement;
  const content = groups.querySelector('.about-hero_content') as HTMLElement;
  const textWrapper = content.querySelector('.about-hero_text-wrapper') as HTMLElement;
  const listWrapper = textWrapper.querySelector('.about-hero_list-wrapper') as HTMLElement;
  const list = listWrapper.querySelector('.about-hero_list') as HTMLElement;
  const progressIndicator = groups.querySelector('.about-hero_progress-indicator') as HTMLElement;

  // Set sticky height to the height of groups + height of list - height of list wrapper
  const multiplier = getCurrentBreakpoint() === 'main' ? 1 : 2;
  stickyWrapper.style.height = `${
    (groups.offsetHeight + list.offsetHeight - textWrapper.offsetHeight) * multiplier
  }px`;

  console.log('updated');

  // Get the content top and bottom positions
  const componentStyles = getComputedStyle(component);
  const contentTop = parseFloat(componentStyles.paddingTop);
  const contentBottom = contentTop + content.offsetHeight;

  // Create the GSAP timeline with ScrollTrigger
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: stickyWrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    },
  });

  // Animate the listWrapper and progressIndicator
  timeline
    .to(listWrapper, {
      translateY: `${-listWrapper.offsetHeight + textWrapper.offsetHeight}px`,
    })
    .to(
      progressIndicator,
      {
        height: `${progressIndicator.parentElement?.offsetHeight}px`,
      },
      '<'
    );
};

import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { SplitText } from 'gsap/SplitText';

import { runAfterImagesLoaded } from '$utils/runAfterImagesLoaded';

export const homeHero = () => {
  // Define reused elements
  const nav = document.querySelector('.nav_component');
  const component = document.querySelector('.home-hero_component');
  if (!component) return;

  const toClip = component.querySelector('.home-hero_clip');
  if (!toClip) return;

  const imageList = toClip.querySelector('.home-hero_images');
  if (!imageList) return;

  const images = [...imageList.querySelectorAll('img')];

  const content = component.querySelector('.home-hero_content');
  const overlay = component.querySelector('.home-hero_overlay');
  if (!images || !content || !overlay) return;

  runAfterImagesLoaded(images, heroAnimation);

  const evenSections = [...imageList.querySelectorAll('.home-hero_image-row:nth-child(even)')];
  const evenGroups = [
    ...imageList.querySelectorAll('.home-hero_image-row:nth-child(even) .home-hero_image-group'),
  ];
  const oddSections = [...imageList.querySelectorAll('.home-hero_image-row:nth-child(odd)')];
  const oddGroups = [
    ...imageList.querySelectorAll('.home-hero_image-row:nth-child(odd) .home-hero_image-group'),
  ];

  function heroAnimation() {
    // Define path and mouse settings
    const clipWrapper = document.querySelector('#clip-wrapper');
    const clipStart = document.querySelector('#clip-start');
    if (!clipStart) return;

    clipStart.setAttribute('width', `${window.innerWidth}`);
    clipStart.setAttribute('height', `${window.innerHeight}`);
    MorphSVGPlugin.convertToPath('#clip-start');

    // define size and first move position for the logo
    const flipTo = document.querySelector('.home-hero_flip');
    const pathWidth = flipTo.offsetWidth;
    const scale = pathWidth / 286;
    const pathHeight = 278 * scale;
    const pathPosition = {
      x: getPositionRelativeToParent(flipTo, component).left,
      y: getPositionRelativeToParent(flipTo, component).top,
      // x: window.innerWidth / 2 + 64,
      // y: window.innerHeight / 2 - pathHeight / 2,
    };

    // define the heading animation
    const heading = content.querySelector('h1');
    const sub = content.querySelector('p');
    const heroSplit = new SplitText([heading, sub], {
      type: 'lines',
    });

    // Create hero timeline with default settings
    const heroTl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'power2.inOut',
      },
    });

    // Define hero animation + marquee
    heroTl
      .to(overlay, { opacity: 0, display: 'none' })
      .from('html', { '--col-gap': '20em' }, '<')
      .from(imageList, { opacity: 0 }, '<')
      .from(oddSections, { translateY: '100vh' }, '<')
      .from(evenSections, { translateY: '-100vh' }, '<')
      .from(images, { scale: 1.5 }, '<1')
      .to(imageList, { rotate: '-6' }, '<')
      .fromTo(evenGroups, { x: 0 }, { x: '-100%', duration: 20, ease: 'none', repeat: -1 }, '<')
      .fromTo(oddGroups, { x: 0 }, { x: '100%', duration: 20, ease: 'none', repeat: -1 }, '<')
      .to(clipWrapper, { scale, translateX: pathPosition.x, translateY: pathPosition.y }, '< 2')
      .to(nav, { opacity: 1, translateY: 0 }, '<')
      .to('#clip-start', { morphSVG: '#clip-end', onComplete: heroMouse }, '<')
      .from(
        heroSplit.lines,
        {
          duration: 1,
          opacity: 0,
          rotationX: -15,
          force3D: true,
          transformOrigin: 'top center -100',
          stagger: 0.1,
        },
        '< 1'
      );

    function heroMouse() {
      // Add mousemove event listener to update path position
      window.addEventListener('mousemove', moveLogo);
    }

    function moveLogo(e) {
      if (!toClip) return;
      const rect = toClip.getBoundingClientRect();

      pathPosition.x = e.clientX - rect.left - pathWidth / 2;
      pathPosition.y = e.clientY - rect.top - pathHeight / 2;

      // Clamp mouse position within window boundaries
      pathPosition.x = Math.max(0, Math.min(window.innerWidth - pathWidth, pathPosition.x));
      pathPosition.y = Math.max(0, Math.min(window.innerHeight - pathHeight, pathPosition.y));

      // Update path position
      gsap.to(clipWrapper, {
        translateX: pathPosition.x,
        translateY: pathPosition.y,
        duration: 1,
      });
    }

    type Position = {
      top: number;
      left: number;
    };

    function getPositionRelativeToParent(element: HTMLElement, parent: HTMLElement): Position {
      const position: Position = { top: 0, left: 0 };
      let currentElement: HTMLElement | null = element;

      while (currentElement && currentElement !== parent) {
        position.top += currentElement.offsetTop;
        position.left += currentElement.offsetLeft;
        currentElement = currentElement.offsetParent as HTMLElement;
      }

      if (currentElement === null) {
        throw new Error('The given parent is not an ancestor of the element.');
      }

      return position;
    }
  }
};

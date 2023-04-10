import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { barbaAnimations } from './animations/barba';
import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(Flip, ScrollTrigger, MorphSVGPlugin, SplitText);
  pages();
  barbaAnimations();
});

// export const initSplitText = (element, options = {}) => {
//   const splitText = new SplitText(element, {
//     options.type: 'lines, words'
//   });

//   const { highlightClass, highlightText } = heading.dataset;
//   const highlightArray = highlightText.split(', ');

//   splitText.words.forEach((word) => {
//     if (!highlightArray.includes(word.textContent)) return;
//     word.classList.add(highlightClass);
//   });

//   const splitTextTimeline = gsap.timeline();
//   splitTextTimeline.from(splitText.lines, {
//     duration: 0.5,
//     opacity: 0,
//     rotationX: -15,
//     force3D: true,
//     transformOrigin: 'top center -100',
//     stagger: 0.1,
//   });
// };

export const initSprints = () => {
  const slider = document.querySelector('.sprints_slider');
  const mask = slider?.querySelector('.sprints_mask');
  const slides = [...mask?.querySelectorAll('.sprint_slide')];

  const height = mask.offsetHeight;
  slides.forEach((slide) => {
    slide.style.height = `${height}px`;
  });
};

export const values = () => {
  const component = document.querySelector('.w-tabs');
  const links = component?.querySelectorAll('.w-tab-link');
  [...links].forEach((link) => {
    link.addEventListener('mouseover', () => {
      link.click();
    });
  });
};

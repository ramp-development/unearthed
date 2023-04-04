/**
 * Calculate the distance of an element from its parent.
 * @param element - The HTML element for which the distance to its parent will be calculated.
 * @returns An object containing the x and y distances, or null if the element has no parent.
 */
export const getDistanceOfElementFromParentElement = (
  element: HTMLElement,
  parentElement: HTMLElement | null
): { x: number; y: number } | null => {
  // If the element does not have a parent, return null
  parentElement = parentElement ? parentElement : element.parentElement;
  if (!parentElement) return null;

  // If the parent element exists, calculate the distance
  const elementRect = element.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();

  const xDistance = elementRect.left - parentRect.left;
  const yDistance = elementRect.top - parentRect.top;

  return { x: xDistance, y: yDistance };
};

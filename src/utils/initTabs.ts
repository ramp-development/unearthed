import { TABS_CSS_CLASSES, type TabsElement } from '@finsweet/ts-utils';

export const initTabs = (tabs: TabsElement[]) => {
  tabs.forEach((tab) => {
    const tabPanes = [...tab.querySelectorAll(`.${TABS_CSS_CLASSES.tabPane}`)];
    let minHeight = 0;
    tabPanes.forEach((tabPane) => {
      tabPane.style.display = 'block';
      const height = tabPane.clientHeight;
      if (height > minHeight) minHeight = height;
      tabPane.style.removeProperty('display');
    });

    tab.style.minHeight = `${minHeight}px`;
  });
};



// Simple tab logic: default to first tab (L) selected
document.addEventListener('DOMContentLoaded', function() {
  const tabList = document.querySelector('.tab-list');
  if (!tabList) return;
  const tabs = tabList.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  const images = document.querySelectorAll('picture');

  // Set first tab (L) as selected by default
  tabs.forEach((tab, i) => {
    if (i === 0) {
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
    } else {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    }
  });
  panels.forEach((panel, i) => {
    if (i === 0) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });
  images.forEach((img, i) => {
    if (i === 0) {
      img.removeAttribute('hidden');
    } else {
      img.setAttribute('hidden', '');
    }
  });

  // Keyboard navigation for tabs
  let tabFocus = 0;
  tabList.addEventListener('keydown', changeTabFocus);
  tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
  });

  function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
      tabs[tabFocus].setAttribute('tabindex', -1);
    }
    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) tabFocus = 0;
    }
    if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) tabFocus = tabs.length - 1;
    }
    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }

  function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image');
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false);
    targetTab.setAttribute('aria-selected', true);
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
  }

  function hideContent(parent, content) {
    parent.querySelectorAll(content).forEach((item) => item.setAttribute('hidden', true));
  }

  function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
  }
});
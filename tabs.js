
// Fade out E tab when a non-E tab is selected, and only hide after transition
document.addEventListener('DOMContentLoaded', function() {
  const tabList = document.querySelector('.tab-list');
  if (!tabList) return;
  const eTab = tabList.querySelector('.e-tab');
  let eTabState = 'visible'; // 'visible', 'fading', 'collapsed', 'gone'

  // Tab click handler (fade/collapse E tab)
  tabList.addEventListener('click', function(e) {
    const clicked = e.target.closest('button[role="tab"]');
    if (!clicked) return;
    if (!clicked.classList.contains('e-tab')) {
      if (eTabState === 'visible') {
        eTab.classList.add('e-fading');
        eTabState = 'fading';
      }
    } else {
      // Reset E tab if clicked
      eTab.classList.remove('e-fading', 'e-collapsed', 'e-gone');
      tabList.classList.remove('e-collapse-gap');
      eTabState = 'visible';
    }
  });

  // Animate E tab fade/collapse, then remove from layout
  if (eTab) {
    eTab.addEventListener('transitionend', function(ev) {
      if (eTabState === 'fading' && ev.propertyName === 'opacity') {
        eTab.classList.remove('e-fading');
        eTab.classList.add('e-collapsed');
        tabList.classList.add('e-collapse-gap');
        eTabState = 'collapsed';
      } else if (eTabState === 'collapsed' && (ev.propertyName === 'width' || ev.propertyName === 'min-width' || ev.propertyName === 'max-width')) {
      // Remove E tab from layout after all transitions for perfect spacing
      setTimeout(function() {
        eTab.classList.add('e-gone');
        eTabState = 'gone';
      }, 900); // after both width and gap transitions (400ms + 500ms)
      }
    });
  }

  // Keyboard navigation for tabs
  const tabs = tabList.querySelectorAll('[role="tab"]');
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
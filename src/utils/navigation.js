export const scrollToSection = (sectionId, options = {}) => {
  const {
    behavior = 'smooth',
    headerHeight = 88,
    offset = -40,
    timeout = 100
  } = options;

  const scrollToElement = () => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === 'work') {
        const savedPosition = sessionStorage.getItem('workScrollPosition');
        if (savedPosition) {
          const savedScrollPosition = parseInt(savedPosition, 10);
          const workElement = document.getElementById('work');
          if (
            workElement &&
            savedScrollPosition >= workElement.offsetTop - headerHeight
          ) {
            window.scrollTo({
              top: savedScrollPosition,
              behavior
            });
            sessionStorage.removeItem('workScrollPosition');
            return true;
          }
        }
      }

      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior
      });
      return true;
    }
    return false;
  };

  if (scrollToElement()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      if (scrollToElement()) {
        resolve();
      } else {
        window.location.href = `/#${sectionId}`;
        resolve();
      }
    }, timeout);

    const checkElement = () => {
      if (document.getElementById(sectionId)) {
        clearTimeout(timeoutId);
        scrollToElement();
        resolve();
      }
    };

    const observer = new MutationObserver(checkElement);
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      clearTimeout(timeoutId);
      resolve();
    }, 2000);
  });
};

export const navigateToSection = (sectionId, options = {}) => {
  const { updateHistory = true } = options;

  if (updateHistory) {
    window.history.pushState(null, '', `/#${sectionId}`);
  }

  return scrollToSection(sectionId, options);
};

export const navigateBackToSection = (
  sectionId,
  fallbackUrl = '/',
  projectId = null
) => {
  if (sectionId) {
    const currentScrollPosition = window.scrollY;
    sessionStorage.setItem(
      'workScrollPosition',
      currentScrollPosition.toString()
    );

    if (projectId) {
      sessionStorage.setItem('workProjectId', projectId);
    }

    window.location.href = `/#${sectionId}`;
  } else {
    window.location.href = fallbackUrl;
  }
};

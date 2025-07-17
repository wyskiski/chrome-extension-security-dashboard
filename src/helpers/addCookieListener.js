function addCookieListeners(handleCookieChange) {
  if (chrome && chrome.cookies && chrome.cookies.onChanged) {
    chrome.cookies.onChanged.addListener(handleCookieChange);
  }

  return () => {
    if (chrome && chrome.cookies && chrome.cookies.onChanged) {
      chrome.cookies.onChanged.removeListener(handleCookieChange);
    }
  };
}

export { addCookieListeners };

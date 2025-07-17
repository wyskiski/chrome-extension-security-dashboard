function addTabListeners(handleTabUpdate) {
  if (chrome && chrome.tabs && chrome.tabs.onActivated) {
    chrome.tabs.onActivated.addListener(handleTabUpdate);
    chrome.tabs.onUpdated.addListener(handleTabUpdate);
  }
  return () => {
    if (chrome && chrome.tabs) {
      chrome.tabs.onActivated.removeListener(handleTabUpdate);
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    }
  };
}

export { addTabListeners };

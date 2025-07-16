function getActiveTab() {
  return chrome.tabs.query({ currentWindow: true, active: true });
}

export { getActiveTab };

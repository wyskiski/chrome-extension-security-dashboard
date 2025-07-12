function getActiveTab() {
  return browser.tabs.query({ currentWindow: true, active: true });
}

export { getActiveTab };

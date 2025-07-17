function getCookies(tabs) {
  let tab = tabs.pop();
  const tabUrl = new URL(tab.url);

  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ url: tabUrl.origin }, (cookies) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(cookies);
      }
    });
  });
}

export { getCookies };

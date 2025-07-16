function getMaliciousCookies(tabs) {
  let tab = tabs.pop();

  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ secure: false }, (cookies) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(cookies);
      }
    });
  });
}

export { getMaliciousCookies };

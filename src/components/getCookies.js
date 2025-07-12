function getCookies(tabs) {
  let tab = tabs.pop();

  let cookies = browser.cookies.getAll({ url: tab.url });
  cookies.then((cookies) => {
    return cookies;
  });
}

export { getCookies };

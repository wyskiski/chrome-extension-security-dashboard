function getAllExtensions() {
  let extensions = [];

  chrome.management.getAll((items) => {
    items.forEach((extension) => {
      if (extension.type === "extension") {
        extensions.push(extension);
      }
    });
  });

  return extensions;
}

export { getAllExtensions };

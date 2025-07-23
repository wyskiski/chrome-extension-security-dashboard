import JSZip from "jszip";

function getExtensionTitle(crxFile) {
  return JSZip.loadAsync(crxFile).then((zip) => {
    return zip
      .file("manifest.json")
      .async("string")
      .then((text) => {
        const manifest = JSON.parse(text);
        return manifest.action.default_title;
      });
  });
}

export { getExtensionTitle };

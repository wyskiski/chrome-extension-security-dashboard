import JSZip from "jszip";

function getManifestDetails(crxFile) {
  return JSZip.loadAsync(crxFile).then((zip) => {
    return zip
      .file("manifest.json")
      .async("string")
      .then((text) => {
        const manifest = JSON.parse(text);

        return {
          title: manifest.action.default_title,
          permissions: manifest.permissions,
          url: manifest.homepageUrl,
        };
      });
  });
}

export { getManifestDetails };

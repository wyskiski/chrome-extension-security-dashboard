import JSZip from "jszip";

function getManifestDetails(crxFile) {
  return JSZip.loadAsync(crxFile).then((zip) => {
    return zip
      .file("manifest.json")
      .async("string")
      .then((text) => {
        const manifest = JSON.parse(text);
        console.log("here nanifest");
        console.log(manifest);
        let iconUrl = "";
        console.log(manifest.icons[0]);
        if (manifest.icons) {
          // iconUrl = manifest.icons[manifest.icons.length - 1].url;
        }

        return {
          title: manifest.action.default_title,
          icon: iconUrl,
          permissions: manifest.permissions,
          url: manifest.homepageUrl,
        };
      });
  });
}

export { getManifestDetails };

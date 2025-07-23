import JSZip from "jszip";

function readManifestFile(blob) {
  return JSZip.loadAsync(blob).then((zip) => {
    return zip
      .file("manifest.json")
      .async("string")
      .then((text) => {
        const manifest = JSON.parse(text);
        if (manifest.permissions && manifest.permissions.includes("cookies")) {
          return true;
        } else {
          return false;
        }
      });
  });
}

export { readManifestFile };

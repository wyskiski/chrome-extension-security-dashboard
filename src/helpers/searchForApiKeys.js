import JSZip from "jszip";

function searchForApiKeys(blob) {
  return JSZip.loadAsync(blob).then((zip) => {
    for (let file in zip.files) {
      return zip.files[file].async("string").then((text) => {
        return /api_key|secret|token|key|/i.test(text);
      });
    }
    return false;
  });
}

export { searchForApiKeys };

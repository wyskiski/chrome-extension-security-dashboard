import JSZip from "jszip";

function searchForApiKeys(blob) {
  return JSZip.loadAsync(blob).then((zip) => {
    for (let file in zip.files) {
      return zip.files[file].async("string").then((text) => {
        if (/API_KEY|secret|token/i.test(text)) {
          return true;
        }
        return false;
      });
    }
    return false;
  });
}

export { searchForApiKeys };

import JSZip from "jszip";

function searchForApiKeys(blob) {
  return JSZip.loadAsync(blob).then((zip) => {
    console.log(zip);
    // .file("manifest.json")
    // .async("string")
    // .then(function (text) {
    //   console.log("Parsed manifest:", JSON.parse(text));

    //   const manifest = JSON.parse(text);

    //   if (manifest.permissions && manifest.permissions.includes("cookies")) {
    //     console.log("this changes da cookiessss");
    //     return true;
    //   }
    // });
  });
}

export { searchForApiKeys };

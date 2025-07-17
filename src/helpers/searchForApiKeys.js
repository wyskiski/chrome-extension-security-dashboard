import JSZip from "jszip";

function searchForApiKeys(blob) {
  return JSZip.loadAsync(blob).then((zip) => {
    console.log(zip.files);

    for (file in zip.files) {
      console.log("filename: " + file);
    }

    // for (file in zip.files) {
    //   zip
    //     .file(file.filename)
    //     .async("string")
    //     .then((text) => {
    //       if (/API_KEY|secret|token/i.test(content)) {
    //         console.log(`Potential secret found`);
    //         console.log(content);
    //       } else {
    //         console.log("file safe");
    //       }
    //     });
    // }

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

import JSZip from "jszip";

async function searchCookieManipulation(blob) {
  try {
    const zip = await JSZip.loadAsync(blob);
    let cookieMatches = [];

    try {
      for (let file in zip.files) {
        const text = await zip.files[file].async("string");

        const matches = text.match("chrome.cookies");

        if (matches !== null) {
          cookieMatches.push(matches);
        }
      }
    } catch (error) {
      console.log(error);
    }

    return cookieMatches;
  } catch (error) {
    console.log(error);
  }
  // return JSZip.loadAsync(blob).then((zip) => {
  //   for (let file in zip.files) {
  //     zip.files[file].async("string").then((text) => {
  //       console.log(text);
  //       const matches = text.match("chrome.cookies");
  //       console.log("cookie matches: " + matches);
  //       cookieMatches.push(matches);
  //     });
  //   }
  //   return cookieMatches;
  // });
}

export { searchCookieManipulation };

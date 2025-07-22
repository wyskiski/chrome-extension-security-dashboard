import JSZip from "jszip";

async function searchCookieManipulation(blob) {
  try {
    const zip = await JSZip.loadAsync(blob);
    let cookieMatches = new Set();

    try {
      for (let file in zip.files) {
        const text = await zip.files[file].async("string");

        // const matches = text.match(/chrome\.cookies\.\w+/g);
        const matches = text.match(/chrome\.\w+\.\w+/g);

        if (matches !== null) {
          const matchesSplit = matches.flat();
          matchesSplit.forEach((match) => {
            cookieMatches.add(match);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return Array.from(cookieMatches);
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

import JSZip from "jszip";

async function searchCookieManipulation(blob) {
  try {
    const zip = await JSZip.loadAsync(blob);
    let cookieMatches = new Set();

    try {
      for (let file in zip.files) {
        const text = await zip.files[file].async("string");
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
}

export { searchCookieManipulation };

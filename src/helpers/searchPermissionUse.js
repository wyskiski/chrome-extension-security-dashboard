import JSZip from "jszip";

async function searchPermissionUse(blob) {
  try {
    const zip = await JSZip.loadAsync(blob);
    let permissionMatches = new Set();

    try {
      for (let file in zip.files) {
        const text = await zip.files[file].async("string");
        const matches = text.match(/chrome\.\w+\.\w+/g);

        if (matches !== null) {
          const matchesSplit = matches.flat();
          matchesSplit.forEach((match) => {
            permissionMatches.add(match);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return Array.from(permissionMatches);
  } catch (error) {
    console.log(error);
  }
}

export { searchPermissionUse };

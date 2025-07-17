function getCrxFile(extensionId) {
  console.log("extsion idsss: " + extensionId);
  const url = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=120.0&acceptformat=crx3&x=id%3D${extensionId}%26uc`;

  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      return new Blob([arrayBuffer], {
        type: "application/x-chrome-extension",
      });
    });
}

export { getCrxFile };

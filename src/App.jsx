import { useEffect, useState } from "react";
import "./App.css";
import { getCookies } from "./components/getCookies";
import { getActiveTab } from "./components/getActiveTab";
import { addTabListeners } from "./components/addTabListeners";
import { getMaliciousCookies } from "./components/getMaliciousCookies";
import { addCookieListeners } from "./components/addCookieListener";

function App() {
  const [url, setUrl] = useState("");
  const [extensionId, setExtensionId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const extensionId = getExtensionId();

    const crxFile = getCrx();
    console.log(crxFile);
  };

  const getExtensionId = () => {
    const splits = url.split("/");

    setExtensionId(splits[splits.length - 1]);
    return splits[splits.length - 1];
  };

  useEffect(async () => {
    const response = await fetch(
      `https://chrome-extension-parser.vercel.app/api/download-crx?id=${extensionId}`
    );

    const crxFile = await response.blob();

    console.log(crxFile);

    const arrayBuffer = await crxFile.arrayBuffer();

    const view = new DataView(arrayBuffer);

    const magic = String.fromCharCode(
      view.getUint8(0),
      view.getUint8(1),
      view.getUint8(2),
      view.getUint8(3)
    );

    console.log("magic: " + magic);
  }, [extensionId]);

  async function getCrx() {
    // const crxUrl = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx3&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;
    // console.log("crx url: " + crxUrl);
    // const response = await fetch(crxUrl);
    // const crxFile = await response.blob();
    // return crxFile;
  }

  return (
    <>
      <nav className="border-b-1 border-gray-200 p-3 mb-10">
        <p>comp6841 project</p>
      </nav>

      <div className="flex justify-center items-center w-full mb-10">
        <form
          onSubmit={handleSubmit}
          className="flex w-full justify-center items-center gap-4 rounded">
          <input
            type="text"
            placeholder="enter chrome extension url"
            onChange={(e) => setUrl(e.target.value)}
            className="border-1 border-gray-200 p-2 w-4/5"
          />
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer p-2 border-1 border-black px-8
            rounded-lg hover:bg-blue-500 hover:text-white"
          />
        </form>
      </div>

      <p>extension name:</p>
      <p>exposed api keys: n/a</p>
      <p>manipulates cookies: yes/no</p>
      <p>safe? yes/no</p>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { getCookies } from "./helpers/getCookies";
import { getActiveTab } from "./helpers/getActiveTab";
import { addTabListeners } from "./helpers/addTabListeners";
import { getMaliciousCookies } from "./helpers/getMaliciousCookies";
import { addCookieListeners } from "./helpers/addCookieListener";
import { getCrxFile } from "./helpers/getCrxFile";
import { readManifestFile } from "./helpers/readManifestFile";
import { getExtensionTitle } from "./helpers/getExtensionTitle";
import { searchForApiKeys } from "./helpers/searchForApiKeys";
import { getAllExtensions } from "./helpers/getAllExtensions";

function App() {
  const [url, setUrl] = useState("");
  const [extensionId, setExtensionId] = useState("");
  const [manipulatesCookies, setManipulatesCookies] = useState(false)
  const [extensionName, setExtensionName] = useState("")
  

  const handleSubmit = (e: any) => {
    e.preventDefault();

    getExtensionId();
  };

  const getExtensionId = () => {
    const splits = url.split("/");

    setExtensionId(splits[splits.length - 1]);
    return splits[splits.length - 1];
  };

  useEffect(() => {
    if (!extensionId) return;

    async function getFile () {
      const crxFile = await getCrxFile(extensionId);

      const cookieManipulation = await readManifestFile(crxFile);
      setManipulatesCookies(cookieManipulation);

      const name = await getExtensionTitle(crxFile)
      setExtensionName(name);

      searchForApiKeys(crxFile);
    }

    getFile();
  }, [extensionId]);

  useEffect(() => {
    const extensions = getAllExtensions();
    console.log(extensions)
  }, [])

  return (
    <div className="App">
      <div id="header">
        <p>Chrome Extension Checker</p>
        <img id="reloadIcon" src="/public/assets/reload.png" alt="reload" />
      </div>
      <div id="cookieInformation">
        <form
          onSubmit={handleSubmit}
          className="flex w-full justify-center items-center gap-10 rounded">
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
      <div id="extension-info">
        <p>extension name: {extensionName}</p>
        <p>exposed api keys: n/a</p>
        {manipulatesCookies ? <p>manipulates cookies: yes </p> : <p>manipulates cookies: no</p>}
        
        {manipulatesCookies ? <p>safe? no</p> : <p>safe? yes</p>}
      </div>

      <div id="footer">
        <p>Built by Winona Wrigley. 2025.</p>
      </div>
    </div>
  );
}

export default App;

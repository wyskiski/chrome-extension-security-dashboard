import { useEffect, useState } from "react";
import "./App.css";

import { getCrxFile } from "./helpers/getCrxFile";
import { readManifestFile } from "./helpers/readManifestFile";
import { getExtensionTitle } from "./helpers/getExtensionTitle";
import { searchForApiKeys } from "./helpers/searchForApiKeys";
import { getAllExtensions } from "./helpers/getAllExtensions";

import ExtensionCard from "./components/ExtensionCard";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [url, setUrl] = useState("");
  const [extensionId, setExtensionId] = useState("");
  const [manipulatesCookies, setManipulatesCookies] = useState(false);
  const [extensionName, setExtensionName] = useState("");
  const [showManualUpload, setShowManualUpload] = useState(false);

  const [browserExtensions, setBrowserExtensions] = useState([]);

  const handleSubmit = (e) => {
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

    async function getFile() {
      const crxFile = await getCrxFile(extensionId);

      const cookieManipulation = await readManifestFile(crxFile);
      setManipulatesCookies(cookieManipulation);

      const name = await getExtensionTitle(crxFile);
      setExtensionName(name);

      searchForApiKeys(crxFile);
    }

    getFile();
  }, [extensionId]);

  useEffect(() => {
    const extensions = getAllExtensions();
    setBrowserExtensions(extensions);
    console.log(extensions);
  }, []);

  const switchPage = () => {
    setShowManualUpload(!showManualUpload);
  };

  return (
    <div className="flex flex-col">
      <Header handler={switchPage} />

      {showManualUpload ? (
        <div className="flex flex-col gap-10 px-15">
          <h1 className="text-2xl font-bold">Upload Extension Link</h1>
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
            {manipulatesCookies ? (
              <p>manipulates cookies: yes </p>
            ) : (
              <p>manipulates cookies: no</p>
            )}

            {manipulatesCookies ? <p>safe? no</p> : <p>safe? yes</p>}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 px-10">
          <h1 className="text-2xl font-bold ml-5">Browser Extensions</h1>
          <div className="flex flex-col gap-10 px-5 max-h-100 overflow-y-auto">
            <div id="browser-extensions" className="flex flex-col gap-3 ">
              {browserExtensions.map((extension) => {
                let iconUrl = "";

                if (extension.icons) {
                  iconUrl = extension.icons[0].url;
                }

                return (
                  <ExtensionCard
                    key={extension.id}
                    extension={extension}
                    name={extension.name}
                    image={iconUrl}
                    url={extension.homepageUrl}
                    enabled={extension.enabled}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { searchForApiKeys } from "../helpers/searchForApiKeys";
import { getCrxFile } from "../helpers/getCrxFile";
import { searchCookieManipulation } from "../helpers/searchCookieManipulation";

function ExtensionCard({
  name = "",
  image = "",
  url = "",
  enabled = false,
  extension,
}) {
  const [hasCookieAccess, setHasCookieAccess] = useState(false);
  const [hasDownloadAccess, setHasDownloadAccess] = useState(false);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookieAccess, setCookieAccess] = useState([]);

  const openHomepage = () => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
      console.log(extension.name);

      const crxFile = getCrxFile(extension.id);
      console.log(crxFile);

      console.log("---");

      if (extension.permissions) {
        const permissions = extension.permissions;

        setHasCookieAccess(permissions.includes("cookies"));
        setHasDownloadAccess(permissions.includes("downloads"));
      }

      async function checkApiKeys() {
        if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
          // const api = await searchForApiKeys(crxFile);
          // console.log("api keys: " + api)
          // setHasApiKeys(api);
        }
      }

      async function checkCookieManipulation() {
        if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
          const matches = await searchCookieManipulation(crxFile);

          if (matches !== undefined && matches !== null && matches.length > 0) {
            const matchesArray = matches.flat();
            setCookieAccess(matchesArray);
          }
        }
      }

      checkApiKeys();
      checkCookieManipulation();
    }
  }, [extension]);

  const detailsButton = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white text-black rounded border-1 border-gray-100 drop-shadow-l">
      <div
        id="extension-details"
        className="flex flex-row justify-between px-5 py-2">
        <div className="flex flex-row gap-3" onClick={openHomepage}>
          <img
            src={image}
            alt={`${name} logo`}
            className="size-4 cursor-pointer"
          />
          <p className="cursor-pointer">{name}</p>
        </div>
        <div id="extension-buttons">
          {enabled ? <button>Disable</button> : <button>Enable</button>}
        </div>
      </div>
      {showDetails ? (
        <div
          id="body"
          className="flex flex-row p-10 justify-center items-center gap-10">
          <div className="flex flex-col">
            {cookieAccess.map((match, index) => {
              return <p key={index}>{match}</p>;
            })}
          </div>
          <button
            className="border-1 border-black p-2 rounded cursor-pointer"
            onClick={detailsButton}>
            Hide Details
          </button>
        </div>
      ) : (
        <div
          id="body"
          className="flex flex-col justify-center items-center gap-5 p-5">
          <div
            id="extension-score"
            className="flex flex-col p-5 justify-center items-center">
            <p className="text-3xl font-bold">Risk: Low</p>
            {enabled ? (
              <p>
                Status: <span className="text-green-500">enabled</span>
              </p>
            ) : (
              <p>
                Status: <span className="text-red-500">disabled</span>
              </p>
            )}
            {/* <button
              className="mt-7 border-1 border-black p-2 rounded cursor-pointer"
              onClick={detailsButton}>
              View Details
            </button> */}
            <p
              className="mt-7 underline cursor-pointer text-gray-500"
              onClick={detailsButton}>
              View Details
            </p>
          </div>

          <div
            id="extension-access"
            className="flex flex-col justify-center items-center">
            <h1 className="text-xl mb-2">
              <b>Summary</b>
            </h1>
            {hasDownloadAccess ? (
              <p>Download Access: true</p>
            ) : (
              <p>Download Access: false</p>
            )}
            {hasCookieAccess ? (
              <p>Cookie Access: true</p>
            ) : (
              <p>Cookie Access: false</p>
            )}
            {hasApiKeys ? (
              <p>Expose API keys: true</p>
            ) : (
              <p>Expose API keys: false</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExtensionCard;

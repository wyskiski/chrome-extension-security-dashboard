import React, { use, useEffect, useState } from "react";
import { searchForApiKeys } from "../helpers/searchForApiKeys";
import { getCrxFile } from "../helpers/getCrxFile";
import { searchCookieManipulation } from "../helpers/searchCookieManipulation";
import riskData from "../data/risk.json";

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
  const [dangerLevel, setDangerLevel] = useState("Low");
  const [extensionEnabled, setExtensionEnabled] = useState(extension.enabled);

  const openHomepage = () => {
    window.open(url, "_blank");
  };

  console.log(extension);

  useEffect(() => {
    if (hasApiKeys) {
      setDangerLevel("High");
    } else if (hasCookieAccess && hasDownloadAccess) {
      setDangerLevel("Medium");
    }
  }, [hasApiKeys, hasCookieAccess, hasDownloadAccess]);

  useEffect(() => {
    if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
      const crxFile = getCrxFile(extension.id);

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

  const disableExtension = () => {
    chrome.management.setEnabled(extension.id, !extensionEnabled);
    setExtensionEnabled(!extensionEnabled);
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
          {extensionEnabled ? (
            <button className="cursor-pointer" onClick={disableExtension}>
              Disable
            </button>
          ) : (
            <button className="cursor-pointer" onClick={disableExtension}>
              Enable
            </button>
          )}
        </div>
      </div>
      {showDetails ? (
        <div
          id="body"
          className="flex flex-col p-10 justify-center items-center gap-10">
          <p
            className="cursor-pointer hover:underline text-gray-500"
            onClick={detailsButton}>
            &lt;- back
          </p>

          <table className="w-full table-auto border-collapse">
            <tr>
              <th className="border-1 border-[#dddddd] text-left p-2">
                Method
              </th>
              <th className="border-1 border-[#dddddd] text-left p-2">Risk</th>
              <th className="border-1 border-[#dddddd] text-left p-2">Docs</th>
            </tr>
            {cookieAccess.map((match, index) => {
              //make link
              const split = match.split(".");

              // Function to find risk level for an API method
              const getRiskLevel = (method) => {
                if (riskData.HIGH[method]) {
                  return { level: "HIGH", description: riskData.HIGH[method] };
                }
                if (riskData.MEDIUM[method]) {
                  return {
                    level: "MEDIUM",
                    description: riskData.MEDIUM[method],
                  };
                }
                if (riskData.LOW[method]) {
                  return { level: "LOW", description: riskData.LOW[method] };
                }
                return {
                  level: "UNKNOWN",
                  description: "Risk level not determined",
                };
              };

              const riskInfo = getRiskLevel(match);

              return (
                <tr>
                  <td
                    key={index}
                    className="border-1 border-[#dddddd] text-left p-2"
                    title={riskInfo.description}>
                    {split[1]}.{split[2]}
                  </td>
                  <td className="border-1 border-[#dddddd] p-2 text-left">
                    {riskInfo.level}
                  </td>
                  <td className="border-1 border-[#dddddd] p-2">
                    <a
                      href={`https://developer.chrome.com/docs/extensions/reference/api/${split[1]}#method-${split[2]}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img
                        src="/assets/link.png"
                        alt="documentation link"
                        className="w-4 h-4 cursor-pointer hover:opacity-60"
                      />
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <div
          id="body"
          className="flex flex-col justify-center items-center gap-5 p-5">
          <div
            id="extension-score"
            className="flex flex-col p-5 justify-center items-center">
            <p className="text-3xl font-bold">Risk: {dangerLevel}</p>
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
              <b>Risk Summary</b>
            </h1>
            {/* {hasDownloadAccess ? (
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
            )} */}
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>Low</p>
                <div className="w-10 h-10 bg-green-300 flex justify-center items-center rounded">
                  5
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>Medium</p>
                <div className="w-10 h-10 bg-yellow-300 flex justify-center items-center rounded">
                  5
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>High</p>
                <div className="w-10 h-10 bg-red-300 flex justify-center items-center rounded">
                  5
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExtensionCard;

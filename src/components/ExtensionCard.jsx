import React, { use, useEffect, useState } from "react";
import { searchForApiKeys } from "../helpers/searchForApiKeys";
import { getCrxFile } from "../helpers/getCrxFile";
import { searchPermissionUse } from "../helpers/searchPermissionUse";
import riskData from "../data/risk.json";

function ExtensionCard({
  name = "",
  image = "",
  url = "",
  enabled = false,
  manual = false,
  extension,
}) {
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [chromeAccess, setChromeAccess] = useState([]);
  const [dangerLevel, setDangerLevel] = useState("Low");
  const [extensionEnabled, setExtensionEnabled] = useState(extension.enabled);
  const [lowRisk, setLowRisk] = useState(0);
  const [mediumRisk, setMediumRisk] = useState(0);
  const [highRisk, setHighRisk] = useState(0);
  const [permissions, setPermissions] = useState([]);

  const openHomepage = () => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    let low = 0;
    let medium = 0;
    let high = 0;

    for (let match of chromeAccess) {
      if (riskData.HIGH[match]) {
        high = high + 1;
      } else if (riskData.MEDIUM[match]) {
        medium = medium + 1;
      } else if (riskData.LOW[match]) {
        low = low + 1;
      }
    }

    if (high > 0) {
      setDangerLevel("High");
    } else if (medium > 0) {
      setDangerLevel("Medium");
    }

    const unusedPermissions = permissions.filter((permission) => {
      let isUsed = chromeAccess.some((match) => {
        const split = match.split(".");
        return split[1] === permission;
      });
      return !isUsed;
    });

    if (unusedPermissions.length > 0) {
      if (dangerLevel === "Low") {
        setDangerLevel("Medium");
      } else if (dangerLevel === "Medium") {
        setDangerLevel("High");
      }
    }

    if (hasApiKeys) {
      setDangerLevel("High");
    }

    setLowRisk(low);
    setMediumRisk(medium);
    setHighRisk(high);
  }, [chromeAccess, hasApiKeys, permissions]);

  useEffect(() => {
    if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
      const crxFile = getCrxFile(extension.id);

      if (extension.permissions) {
        const permissions = extension.permissions;

        setPermissions(permissions);
      }

      async function checkApiKeys() {
        if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
          const api = await searchForApiKeys(crxFile);
          setHasApiKeys(api);
        }
      }

      async function checkPermissionUse() {
        if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak") {
          const matches = await searchPermissionUse(crxFile);

          if (matches !== undefined && matches !== null && matches.length > 0) {
            const matchesArray = matches.flat();
            setChromeAccess(matchesArray);
          }
        }
      }

      checkApiKeys();
      checkPermissionUse();
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
      {!manual && (
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
      )}
      {showDetails ? (
        <div
          id="body"
          className="flex flex-col p-10 justify-center items-center gap-10">
          <p
            className="cursor-pointer hover:underline text-gray-500"
            onClick={detailsButton}>
            &lt;- back
          </p>

          <p>
            Unused permissions:
            {permissions
              .filter((permission) => {
                let isUsed = chromeAccess.some((match) => {
                  const split = match.split(".");
                  return split[1] === permission;
                });
                return !isUsed;
              })
              .map((permission, index) => {
                return <p>{permission}</p>;
              })}
          </p>

          <p>
            Exposed API keys? {hasApiKeys ? <span>Yes</span> : <span>No</span>}
          </p>

          <table className="w-full table-auto border-collapse">
            <tr>
              <th className="border-1 border-[#dddddd] text-left p-2">
                Method
              </th>
              <th className="border-1 border-[#dddddd] text-left p-2">Risk</th>
              <th className="border-1 border-[#dddddd] text-left p-2">Docs</th>
            </tr>
            {chromeAccess.map((match, index) => {
              const split = match.split(".");

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

              if (riskInfo.level !== "UNKNOWN") {
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
              }
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
            {dangerLevel === "High" && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-3xl">⚠️</p>
                <p className="text-3xl font-bold">
                  Risk: <span className="text-red-500">{dangerLevel}</span>
                </p>
              </div>
            )}
            {dangerLevel === "Medium" && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-3xl">⚡</p>
                <p className="text-3xl font-bold">
                  Risk: <span className="text-yellow-500">{dangerLevel}</span>
                </p>
              </div>
            )}
            {dangerLevel === "Low" && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-3xl">✅</p>
                <p className="text-3xl font-bold">
                  Risk: <span className="text-green-500">{dangerLevel}</span>
                </p>
              </div>
            )}
            {!manual && (
              <>
                {enabled ? (
                  <p>
                    Status: <span className="text-green-500">enabled</span>
                  </p>
                ) : (
                  <p>
                    Status: <span className="text-red-500">disabled</span>
                  </p>
                )}
              </>
            )}

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
            <div className="flex flex-row gap-5">
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>Low</p>
                <div className="w-10 h-10 bg-green-300 flex justify-center items-center rounded">
                  {lowRisk}
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>Medium</p>
                <div className="w-10 h-10 bg-yellow-300 flex justify-center items-center rounded">
                  {mediumRisk}
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>High</p>
                <div className="w-10 h-10 bg-red-300 flex justify-center items-center rounded">
                  {highRisk}
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

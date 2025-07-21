import React, { useEffect, useState } from 'react';
import { searchForApiKeys } from '../helpers/searchForApiKeys';
import { getCrxFile } from '../helpers/getCrxFile';
import { searchCookieManipulation } from '../helpers/searchCookieManipulation';

function ExtensionCard ({
  name = "",
  image = "",
  url = "",
  enabled = false,
  extension
}) {
  const [hasCookieAccess, setHasCookieAccess] = useState(false);
  const [hasDownloadAccess, setHasDownloadAccess] = useState(false);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [showDetails, setShowDetails] = useState(false)


  const openHomepage = () => {
    window.open(url, '_blank');
  }

  useEffect(() => {
    if (extension.id !== "enkjmnlmfadhmclefjcmfoelhjahnhak")
    {
      console.log(extension.name)

      const crxFile = getCrxFile(extension.id)
      console.log(crxFile)

      console.log("---")
  
      if (extension.permissions) {
        const permissions = extension.permissions
  
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
          console.log("matches: " + matches)
        }
      }
  
      checkApiKeys();
      checkCookieManipulation();
    }
  }, [extension])

  const detailsButton = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="bg-white text-black rounded border-1 border-gray-100 drop-shadow-l"> 
      <div id="extension-details" className="flex flex-row justify-between px-5 py-2">
          <div className="flex flex-row gap-3" onClick={openHomepage}>
            <img src={image}
                alt={`${name} logo`}
                className="size-4 cursor-pointer"
                />
            <p className="cursor-pointer">{name}</p>
          </div>
          <div id="extension-buttons">
          
          {enabled ? <button>Disable</button> : <button>Enable</button>}
        </div>
      </div>
      {
        showDetails ?  <div id="body" className="flex flex-row p-10 justify-center items-center gap-10">
       <button className="border-1 border-black p-2 rounded cursor-pointer" onClick={detailsButton}>Hide Details</button>
      </div>
      :
        <div id="body" className="flex flex-row p-10 justify-center items-center gap-10">
        <div id="extension-score" className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">Risk: Low</p>
          {enabled ? <p>Status: <span className="text-green-500">enabled</span></p> : <p>Status: <span className="text-red-500">disabled</span></p>}
        </div>

        <div id="extension-access">
          <p>Download Access: {hasDownloadAccess ? <p>true</p> : <p>false</p>}</p>
          <p>Cookie Access: {hasCookieAccess ? <p>true</p> : <p>false</p>}</p>
          <p>Expose API keys: {hasApiKeys ? <p>true</p> : <p>false</p>}</p>
          <button className="border-1 border-black p-2 rounded cursor-pointer" onClick={detailsButton}>View Details</button>
        </div>
      </div> 
      
      }
      
    </div>
  );
};

export default ExtensionCard;
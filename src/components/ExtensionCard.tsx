import React, { useEffect, useState } from 'react';

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


  const openHomepage = () => {
    window.open(url, '_blank');
  }

  useEffect(() => {
    if (extension.permissions) {
      const permissions = extension.permissions

       setHasCookieAccess(permissions.includes("cookies"));
      setHasDownloadAccess(permissions.includes("downloads"));
      

    }
  }, [extension])


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
      <div id="body" className="flex flex-row p-10 justify-center items-center gap-10">
        <div id="extension-score" className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">Risk: Low</p>
          {enabled ? <p>Status: <span className="text-green-500">enabled</span></p> : <p>Status: <span className="text-red-500">disabled</span></p>}
        </div>

        <div id="extension-access">
          <p>Download Access: {hasDownloadAccess ? <p>true</p> : <p>false</p>}</p>
          <p>Cookie Access: {hasCookieAccess ? <p>true</p> : <p>false</p>}</p>
          <p>Expose API keys:</p>
          <button>View Details</button>
        </div>

        
      </div>
    </div>
  );
};

export default ExtensionCard;
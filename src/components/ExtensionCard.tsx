import React from 'react';

function ExtensionCard ({
  name = "",
  image = "",
  url = "",
  enabled = false,
  hasDownloadAccess = false,
  hasCookieAccess = false,
  hasApiKeys = false,
}) {

  const openHomepage = () => {

  }


  return (
    <div className="bg-white text-black rounded"> 
      <div id="extension-details" className="flex flex-row justify-between px-5 py-2">
        {/* TODO: on click go to the extension page */}
          <div className="flex flex-row gap-3">

          <img src={image}
              alt={`${name} logo`}
              className="size-4 cursor-pointer"/>
          <p>{name}</p>
          </div>
          <div id="extension-buttons">
          
          {enabled ? <button>Disable</button> : <button>Enable</button>}
        </div>
      </div>
      <div id="body" className="flex flex-row p-10 justify-center items-center gap-10">
        <div id="extension-score" className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">Risk: Low</p>
          {enabled ? <p>Status: enabled</p> : <p>Status: disabled</p>}
        </div>

        <div id="extension-access">
          <p>Download Access:</p>
          <p>Cookie Access:</p>
          <p>Expose API keys:</p>
          <button>View Details</button>
        </div>

        
      </div>
    </div>
  );
};

export default ExtensionCard;
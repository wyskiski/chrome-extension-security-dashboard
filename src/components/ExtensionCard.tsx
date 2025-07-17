import React from 'react';

function ExtensionCard ({
  name = "",
  enabled = false,
  hasDownloadAccess = false,
  hasCookieAccess = false,
  hasApiKeys = false,
}) {


  return (
    <> 
    <div id="extension-details">

    </div>
    <div id="extension-score">
      <p>Score: Low</p>
      {enabled ? <p>Status: enabled</p> : <p>Status: disabled</p>}
    </div>
    <div id="extension-access">

    </div>
    <div id="extension buttons">
      <button>View Details</button>
      {enabled ? <button>Disable</button> : <button>Enable</button>}
    </div>
    </>
  );
};

export default ExtensionCard;
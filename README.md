# Project Summary

This project is about determining the security and privacy of chrome extensions using React, Tailwind, and Javascript. A chrome extension is archived code in the format of a “crx” file. They are stored within the browser with the ability to observe browser events and modify the web. The extension has a manifest.json file that contains the allowed permissions of the extension, which are allowed when the extension is installed.

The project aimed to determine if the extension were following the adhering to the CIA triad of confidentiality, integrity, and authenticity. Also if it follows the principle of least privilege as well as privacy and data governance. A chrome extension has the ability to potentially read and write data on all browser sites. Some extensions need access to these permissions to be able to function, but others may be using these permissions with a malicious intent.

The outcome of the project is a chrome extension which automatically scans and checks the risk level of extensions installed in your chrome browser. It investigates all of the permissions the extension has access to. The user can click to view additional details on the chrome extension and choose to disable the extension in the browser. Clicking on the extensions name / icon will also take the user to its home page. It also has a manual feature, allowing the user to upload a link to a chrome extension and determine its risk level.

## How To Use

1. Download the github code
2. Open chrome://extensions/
3. Turn "Developer Mode" on in the top right
4. Select "Load Unpacked" in the top left
5. Choose the build folder within the extension files

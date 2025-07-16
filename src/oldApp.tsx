import { useEffect, useState } from 'react';
import './App.css';
import { getCookies } from './components/getCookies';
import { getActiveTab } from './components/getActiveTab';
import { addTabListeners } from './components/addTabListeners';
import { getMaliciousCookies } from './components/getMaliciousCookies';
import { addCookieListeners } from './components/addCookieListener';

function App() {

  
  const [cookies, setCookies] = useState([])
  const [originalMalicious, setOriginalMaliciousCookies] = useState(0);

  const [maliciousCookies, setMaliciousCookies] = useState(0)

  const loadCookies = () => {
    getActiveTab()
      .then(getCookies)
      .then((newCookies: any) => {
        setCookies(newCookies);
      })
  }

  const loadMaliciousCookies = () => {
    getActiveTab()
      .then(getMaliciousCookies)
      .then((newCookies: any) => {
          console.log('here')
          setMaliciousCookies(currentMaliciousCookies => {
            console.log("new cookies length: " + newCookies.length)
            console.log("current mals:" + originalMalicious)
            const newValue = newCookies.length - originalMalicious;
            console.log("new value: " + newValue)
            return newValue;
        });
      })
  }

  const updateOriginalMaliciousCookies = () => {
    getActiveTab()
      .then(getMaliciousCookies)
      .then((newCookies: any) => {
          setOriginalMaliciousCookies(newCookies.length)
      })
  }

  useEffect(() => {
    console.log("setting original m cookies to: " + originalMalicious)
  }, [originalMalicious])

  const handleCookieUpdate = useEffect(() => {
      loadCookies();
      
      if (originalMalicious === 0) {
        console.log("meow")
        updateOriginalMaliciousCookies();
      } else {
        console.log('hey')
        loadMaliciousCookies();
      }
    }, [originalMalicious])

  useEffect(() => {
    loadCookies();
    updateOriginalMaliciousCookies();

    // Get cleanup function
    const cleanupCookies = addCookieListeners(handleCookieUpdate);

    // Return cleanup function
    return () => {
      cleanupCookies();
    };
  }, [])

  return (
    <div className="App">
      <div id="header">
        <p>Cookie Checker</p>
        <img id="reloadIcon" src='/public/assets/reload.png' alt="reload"/>
      </div>
      <div id="cookieInformation">
        <div className="noCookies">
          <p id="malicious">Malicious: {Math.abs(maliciousCookies)} </p>
        </div>
        <div className="noCookies">
          <p>Total Cookies Found: {cookies.length}</p>
        </div>
      </div>
      <div id="buttons">
        <button>view cookies</button>
        <button>clear cookies</button>
      </div>

      <div id="footer">
        <p>Built by Winona Wrigley. 2025.</p>
      </div>
    </div>
  );
}

export default App;

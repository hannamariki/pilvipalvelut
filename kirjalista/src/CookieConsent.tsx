import React, { useState, useEffect } from "react";

function CookieConsent({ onAccept }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
    onAccept();
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#222",
      color: "#fff",
      padding: "1em",
      textAlign: "center",
      zIndex: 1000,
    }}>
      <p>
        Käytämme evästeitä käyttäjäkokemuksen parantamiseksi ja analytiikkaan.
        Jatkamalla sivuston käyttöä hyväksyt evästeiden käytön.
      </p>
      <button
        onClick={acceptCookies}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          padding: "0.5em 1em",
          cursor: "pointer",
          borderRadius: "4px",
          fontSize: "1em",
        }}
      >
        Hyväksyn evästeet
      </button>
    </div>
  );
}

export default CookieConsent;

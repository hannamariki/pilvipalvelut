import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Books from './Books';
import MatomoApi from './MatomoApi';
import React, { useState } from "react";
import CookieConsent from "./CookieConsent";

function App() {

  const [consentGiven, setConsentGiven] = useState(
    localStorage.getItem("cookieConsent") === "true"
  );

  return (
      <>
      {consentGiven && <MatomoApi />}
      <CookieConsent onAccept={() => setConsentGiven(true)} />

    <Router basename="/pilvipalvelut/kirjalista">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
    </>
  );
}

export default App;
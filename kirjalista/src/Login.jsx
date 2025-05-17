import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebaseConfig";
import "./Login.css"; 

function Login() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Kirjautunut: " + userCredential.user.email);

     window._mtm.push({
      event: "login_success",
      email: email,
    });


      navigate("/books");
    } catch (err) {
      console.error("Kirjautumisvirhe:", err.code, err.message);

    window._mtm.push({
    event: "login_failure",
    error: err.message,
    });

      setError("Kirjautuminen epäonnistui: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">📚 Oma kirjahylly</h1>
      <p className="welcome-text">Tervetuloa takaisin! Kirjaudu sisään käyttääksesi kirjahyllyäsi.</p>

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Sähköposti:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Salasana:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Kirjaudu sisään</button>
      </form>
    </div>
  );
}

export default Login;

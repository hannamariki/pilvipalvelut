import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebaseConfig"; 

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
    const user = userCredential.user;
    console.log("Kirjautunut: " + user.email);
     navigate("/books"); 

  } catch (err) {
    console.error("Kirjautumisvirhe:", err.code, err.message);
    setError("Kirjautuminen epäonnistui: " + err.message);
  }
};

  return (
    <div>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Sähköposti:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Salasana:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Kirjaudu sisään</button>
      </form>
    </div>
  );
}

export default Login;

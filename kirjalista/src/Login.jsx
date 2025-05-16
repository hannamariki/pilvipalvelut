import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebaseConfig"; // muuta polku oikein

function Login() {
  const auth = getAuth(app);

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
      // Ohjaa vaikka kirjalistaan: navigate('/books')
    } catch (err) {
      setError("Kirjautuminen epäonnistui. Tarkista sähköposti ja salasana.");
      console.error(err);
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

import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchBooks = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await res.json();
    setResults(data.items || []);
  };

  const addBook = async (book) => {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors?.join(", ") || "Tuntematon";
    await addDoc(collection(db, "books"), {
      title,
      author,
    });
    alert("Kirja lisätty!");
  };

  return (
    <div>
      <h2>Hae kirjoja</h2>
      <form onSubmit={searchBooks}>
        <input
          type="text"
          placeholder="Kirjan nimi"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Hae</button>
      </form>

      <ul>
        {results.map((book) => (
          <li key={book.id}>
            <strong>{book.volumeInfo.title}</strong> — {book.volumeInfo.authors?.join(", ") || "Tuntematon"}
            <button onClick={() => addBook(book)}>Lisää listaan</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;

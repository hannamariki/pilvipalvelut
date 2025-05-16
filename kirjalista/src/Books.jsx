import React, { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "./firebaseConfig"; 

const db = getFirestore(app);

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Hae kirjat Firestoresta
  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const booksArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksArray);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Lisää uusi kirja
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author) return;
    await addDoc(collection(db, "books"), {
      title,
      author,
    });
    setTitle("");
    setAuthor("");
    fetchBooks(); // Päivitä lista
  };

  return (
    <div>
      <h2>Kirjalista</h2>
      
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Kirjan nimi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Kirjailija"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Lisää kirja</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;

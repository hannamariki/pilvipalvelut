import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import app from "./firebaseConfig";
import BookSearch from "./BookSearch"; 

const db = getFirestore(app);

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [activeTab, setActiveTab] = useState("list");

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const booksArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksArray);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author) return;
    await addDoc(collection(db, "books"), {
      title,
      author,
      read: false,
    });
    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  const handleToggleRead = async (bookId, currentStatus) => {
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      read: !currentStatus,
    });
    fetchBooks();
  };

  const handleDelete = async (bookId) => {
    await deleteDoc(doc(db, "books", bookId));
    fetchBooks();
  };

  return (
    <div>
      <h2>📖 Kirjahyllysi</h2>

     
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("list")}>📚 Oma lista</button>
        <button onClick={() => setActiveTab("add")}>➕ Lisää kirja</button>
        <button onClick={() => setActiveTab("search")}>🔍 Hae kirjastoista</button>
      </div>

      {activeTab === "list" && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> — {book.author} {" "}
              <span style={{ color: book.read ? "green" : "gray" }}>
                [{book.read ? "Luettu" : "Lukematta"}]
              </span>
              <button onClick={() => handleToggleRead(book.id, book.read)}>Merkitse {book.read ? "lukematta" : "luetuksi"}</button>
              <button onClick={() => handleDelete(book.id)}>🗑 Poista</button>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "add" && (
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
      )}

      {activeTab === "search" && <BookSearch onBookAdd={fetchBooks} />}
    </div>
  );
}

export default Books;

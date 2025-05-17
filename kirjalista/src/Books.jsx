import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc,updateDoc,} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./firebaseConfig";
import BookSearch from "./BookSearch";
import "./Books.css";

const db = getFirestore(app);

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const auth = getAuth(app);
  const navigate = useNavigate();

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

    window._mtm.push({
    event: "book_added",
    title: title,
    author: author,
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

    window._mtm.push({
    event: "book_read_status_changed",
    bookId: bookId,
    read: !currentStatus,
  });


    fetchBooks();
  };

  const handleDelete = async (bookId) => {
    await deleteDoc(doc(db, "books", bookId));

    window._mtm.push({
    event: "book_deleted",
    bookId: bookId,
  });

    fetchBooks();
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="books-container">
      <h2>📖 Kirjahyllysi</h2>

      <div className="tab-buttons">
        <button onClick={() => setActiveTab("list")}>📚 Oma lista</button>
        <button onClick={() => setActiveTab("add")}>➕ Lisää kirja</button>
        <button onClick={() => setActiveTab("search")}>🔍 Hae kirjastoista</button>
        <button onClick={handleLogout} className="logout-button"> 🚪 Kirjaudu ulos</button>
      </div>

      {activeTab === "list" && (
        <>
          <ul className="book-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <div>
                  <strong>{book.title}</strong> — {book.author}{" "}
                  <span className={`status ${book.read ? "read" : "unread"}`}>
                    [{book.read ? "Luettu" : "Lukematta"}]
                  </span>
                </div>
                <div className="book-actions">
                  <button onClick={() => handleToggleRead(book.id, book.read)}>
                    Merkitse {book.read ? "lukematta" : "luetuksi"}
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="delete-button"
                  >
                    🗑 Poista
                  </button>
                </div>
              </li>
            ))}
          </ul>
    
        </>
      )}

      {activeTab === "add" && (
        <form onSubmit={handleAddBook} className="book-form">
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

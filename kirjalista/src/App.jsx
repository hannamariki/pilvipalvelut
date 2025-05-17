import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Books from './Books';

function App() {
  return (
    <Router basename="/pilvipalvelut/kirjalista">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<Books />} />
      
      </Routes>
    </Router>
  );
}

export default App;
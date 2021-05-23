import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Books.scss";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";

function Books() {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book")
      .then((res) => setAllBooks(res.data))
      .catch((e) => console.log(e.response));
  }, []);
  return (
    <main className="books-container">
      <Sidebar />
      <Elementlist allBooks={allBooks} />
    </main>
  );
}

export default Books;

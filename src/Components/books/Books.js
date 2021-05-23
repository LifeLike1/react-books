import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Books.scss";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";

function Books() {
  const [allBooks, setAllBooks] = useState([]);
  const [nonChangleableBooks, setNonChangeableBooks] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const filtered = nonChangleableBooks.filter((book) =>
      selectedFilters.includes(book.genre)
    );
    selectedFilters.length === 0
      ? setAllBooks(nonChangleableBooks)
      : setAllBooks(filtered);
  }, [selectedFilters]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book")
      .then((res) => {
        setAllBooks(res.data);
        setNonChangeableBooks(res.data);
      })
      .catch((e) => console.log(e.response));
  }, []);

  return (
    <main className="books-container">
      <Sidebar
        allBooks={nonChangleableBooks}
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
      />
      <Elementlist allBooks={allBooks} />
    </main>
  );
}

export default Books;

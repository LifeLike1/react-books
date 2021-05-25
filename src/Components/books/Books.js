import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Books.scss";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";

function Books() {
  const [allBooks, setAllBooks] = useState([]);
  const [nonChangleableBooks, setNonChangeableBooks] = useState([]);
  const [pageDisplay, setPageDisplay] = useState(1);
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
        setAllBooks={setAllBooks}
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        pageDisplay={pageDisplay}
        setPageDisplay={setPageDisplay}
      />
      <Elementlist
        allBooks={allBooks}
        setAllBooks={setAllBooks}
        nonChangleableBooks={nonChangleableBooks}
        filters={selectedFilters}
        pageDisplay={pageDisplay}
        setPageDisplay={setPageDisplay}
      />
    </main>
  );
}

export default Books;

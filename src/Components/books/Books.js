import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./Books.scss";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";

function Books() {
  const booksPerPage = 3;
  const [allBooks, setAllBooks] = useState([]);
  const [nonChangeableBooks, setNonChangeableBooks] = useState([]);
  const [pageDisplay, setPageDisplay] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [indexes, setIndexes] = useState({
    from: 0,
    to: booksPerPage,
  });

  const [sortedValue, setSortedValue] = useState(0);

  useEffect(() => {
    const filtered = nonChangeableBooks.filter((book) =>
      selectedFilters.includes(book.genre)
    );
    selectedFilters.length === 0
      ? setAllBooks(nonChangeableBooks)
      : setAllBooks(filtered);
  }, [selectedFilters, nonChangeableBooks]);

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
        nonChangeableBooks={nonChangeableBooks}
        allBooks={allBooks}
        setAllBooks={setAllBooks}
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        setSortedValue={setSortedValue}
        sortedValue={sortedValue}
      />
      <Elementlist
        allBooks={allBooks}
        setAllBooks={setAllBooks}
        nonChangeableBooks={nonChangeableBooks}
        selectedFilters={selectedFilters}
        pageDisplay={pageDisplay}
        setPageDisplay={setPageDisplay}
        indexes={indexes}
        setIndexes={setIndexes}
        booksPerPage={booksPerPage}
        setSortedValue={setSortedValue}
      />
    </main>
  );
}

export default Books;

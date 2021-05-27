import { useEffect } from "react";
import { useState } from "react";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";
import { getBooksAPI } from "../static/requests";
import "./Books.scss";

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
    const fetchBooks = async () => {
      const response = await getBooksAPI();
      setAllBooks(response);
      setNonChangeableBooks(response);
    };
    fetchBooks();
  }, []);

  return (
    <main className="books-container">
      <Sidebar
        nonChangeableBooks={nonChangeableBooks}
        setNonChangeableBooks={setNonChangeableBooks}
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
        setNonChangeableBooks={setNonChangeableBooks}
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

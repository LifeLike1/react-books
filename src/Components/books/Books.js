import { useContext, useEffect } from "react";
import { useState } from "react";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";
import { getBooksAPI } from "../static/requests";
import "./Books.scss";
import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import { FavouriteBookContext } from "../context/FavouriteBookContextProvider";

function Books() {
  const booksPerPage = 3;
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nonChangeableBooks, setNonChangeableBooks] = useState([]);
  const [favouriteBooks, setFavouriteBooks] = useContext(FavouriteBookContext);
  const [deleteBookList, setDeleteBookList] = useState([]);
  const [pageDisplay, setPageDisplay] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [indexes, setIndexes] = useState({
    from: 0,
    to: booksPerPage,
  });
  const [loadingErrors, setLoadingErrors] = useState(false);
  const [sortedValue, setSortedValue] = useState(0);

  useEffect(() => {
    const filtered = nonChangeableBooks.filter((book) => {
      // if two filters (author and genre) are selected
      if (selectedFilters.length && selectedAuthors.length) {
        return (
          selectedAuthors.includes(book.author) &&
          selectedFilters.includes(book.genre)
        );
      }
      // if only genre filter is selected
      if (!selectedAuthors.length) {
        return selectedFilters.includes(book.genre);
      }
      // if only author filter is selected
      if (!selectedFilters.length) {
        return selectedAuthors.includes(book.author);
      }
    });
    !selectedFilters.length && !selectedAuthors.length
      ? setAllBooks(nonChangeableBooks)
      : setAllBooks(filtered);
  }, [selectedFilters, selectedAuthors, nonChangeableBooks, loadingErrors]);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      const response = await getBooksAPI();
      if (response) {
        setAllBooks(response);
        setNonChangeableBooks(response);
        setLoadingErrors(false);
      } else {
        setLoadingErrors(false);
      }
      setLoading(false);
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
        selectedAuthors={selectedAuthors}
        setSelectedAuthors={setSelectedAuthors}
        setSortedValue={setSortedValue}
        sortedValue={sortedValue}
        loadingErrors={loadingErrors}
        deleteBookList={deleteBookList}
        setDeleteBookList={setDeleteBookList}
        setPageDisplay={setPageDisplay}
      />
      {!loading ? (
        <>
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
            loadingErrors={loadingErrors}
            deleteBookList={deleteBookList}
            setDeleteBookList={setDeleteBookList}
            favouriteBooks={favouriteBooks}
            setFavouriteBooks={setFavouriteBooks}
          />
        </>
      ) : (
        <Alert severity="info" className="books-container__loading">
          Ładowanie informacji o książkach.. <CircularProgress size="1.25em" />
        </Alert>
      )}
    </main>
  );
}

export default Books;

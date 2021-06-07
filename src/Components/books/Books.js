import { useCallback, useContext, useEffect } from "react";
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
  const [booksToShow, setBooksToShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookBase, setBookBase] = useState([]);
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

  const filterGeneral = useCallback(() => {
    const filtered = bookBase.filter((book) => {
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
      return false;
    });
    !selectedFilters.length && !selectedAuthors.length
      ? setBooksToShow(bookBase)
      : setBooksToShow(filtered);
  }, [bookBase, selectedAuthors, selectedFilters]);

  useEffect(() => {
    filterGeneral();
  }, [
    selectedFilters,
    selectedAuthors,
    bookBase,
    loadingErrors,
    filterGeneral,
  ]);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      const response = await getBooksAPI();
      if (response) {
        setBooksToShow(response);
        setBookBase(response);
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
        bookBase={bookBase}
        setBookBase={setBookBase}
        booksToShow={booksToShow}
        setBooksToShow={setBooksToShow}
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
            booksToShow={booksToShow}
            setBooksToShow={setBooksToShow}
            bookBase={bookBase}
            setBookBase={setBookBase}
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
            filterGeneral={filterGeneral}
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

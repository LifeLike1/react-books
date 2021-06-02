import { useContext, useEffect } from "react";
import { useState } from "react";
import Elementlist from "./Elementlist";
import Sidebar from "./Sidebar";
import { getBooksAPI } from "../static/requests";
import "./Books.scss";
import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import { FavouriteBookContext } from "../context/StateContext";

function Books() {
  const booksPerPage = 3;
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nonChangeableBooks, setNonChangeableBooks] = useState([]);
  const [favouriteBooks, setFavouriteBooks] = useContext(FavouriteBookContext);
  const [deleteBookList, setDeleteBookList] = useState([]);
  const [pageDisplay, setPageDisplay] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [indexes, setIndexes] = useState({
    from: 0,
    to: booksPerPage,
  });
  const [loadingErrors, setLoadingErrors] = useState({
    allBooks: false,
  });
  const [sortedValue, setSortedValue] = useState(0);

  useEffect(() => {
    const filtered = nonChangeableBooks.filter((book) =>
      selectedFilters.includes(book.genre)
    );
    selectedFilters.length === 0
      ? setAllBooks(nonChangeableBooks)
      : setAllBooks(filtered);
  }, [selectedFilters, nonChangeableBooks, loadingErrors]);

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      const response = await getBooksAPI();
      if (response) {
        setAllBooks(response);
        setNonChangeableBooks(response);
        setLoadingErrors({
          ...loadingErrors,
          allBooks: false,
          nonChangeableBooks: false,
        });
      } else {
        setLoadingErrors({ ...loadingErrors, allBooks: true });
      }
      setLoading(false);
    };
    setTimeout(() => fetchBooks(), 1000);
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

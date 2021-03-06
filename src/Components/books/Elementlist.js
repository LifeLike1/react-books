import { TextField } from "@material-ui/core";
import { Alert, Autocomplete, Pagination } from "@material-ui/lab";
import { useEffect } from "react";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({
  booksToShow,
  setBooksToShow,
  bookBase,
  pageDisplay,
  setPageDisplay,
  selectedFilters,
  selectedAuthors,
  indexes,
  setIndexes,
  booksPerPage,
  setSortedValue,
  loadingErrors,
  deleteBookList,
  setDeleteBookList,
  favouriteBooks,
  setFavouriteBooks,
  filterGeneral,
}) {
  const handlePaginationChange = (page) => {
    const startIndex = page * booksPerPage - booksPerPage;
    setIndexes({
      from: startIndex,
      to: startIndex + booksPerPage,
    });
    setPageDisplay(page);
  };

  const handleSearchChange = (searchBook) => {
    const books = booksToShow.filter((book) => book.title === searchBook);
    setBooksToShow(books);
    setPageDisplay(1);
  };

  const handleAutosearchChange = (text) => {
    if (!text) {
      filterGeneral();
    }
  };

  useEffect(() => {
    setIndexes({
      from: 0,
      to: booksPerPage,
    });
    setPageDisplay(1);
  }, [
    selectedFilters,
    selectedAuthors,
    booksPerPage,
    setIndexes,
    setPageDisplay,
    setSortedValue,
  ]);

  return (
    <section className="elements">
      <div className="elements__container">
        {!loadingErrors && (
          <>
            <h1 className="elements__title">
              <LibraryBooksIcon /> Lista książek
            </h1>
            <div className="elements__search-main">
              <Autocomplete
                id="elements__auto-complete"
                options={booksToShow.map((book) => book.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Szukaj książki.."
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => handleAutosearchChange(e.target.value)}
                  />
                )}
                onChange={(e, selectedElement) =>
                  handleSearchChange(selectedElement)
                }
                value={null}
              />
            </div>
          </>
        )}
      </div>
      {loadingErrors ? (
        <Alert severity="error">Nie udało się wczytać książek!</Alert>
      ) : (
        booksToShow
          .slice(indexes.from, indexes.to)
          .map((book) => (
            <Element
              elementObj={book}
              key={book.id}
              bookBase={bookBase}
              favouriteBooks={favouriteBooks}
              setFavouriteBooks={setFavouriteBooks}
              deleteBookList={deleteBookList}
              setDeleteBookList={setDeleteBookList}
            />
          ))
      )}

      <Pagination
        count={Math.ceil(booksToShow.length / booksPerPage)}
        color="secondary"
        page={pageDisplay}
        className="elements__pagination"
        onChange={(e, page) => handlePaginationChange(page)}
      />
    </section>
  );
}
export default Elementlist;

import { TextField } from "@material-ui/core";
import { Autocomplete, Pagination } from "@material-ui/lab";
import { useEffect } from "react";

import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({
  allBooks,
  setAllBooks,
  nonChangeableBooks,
  pageDisplay,
  setPageDisplay,
  selectedFilters,
  setIndexFrom,
  indexFrom,
  setIndexTo,
  indexTo,
  booksPerPage,
  setSortedValue,
}) {
  const handlePaginationChange = (page) => {
    const startIndex = page * booksPerPage - booksPerPage;

    setIndexFrom(startIndex);
    setIndexTo(startIndex + booksPerPage);
    setPageDisplay(page);
  };

  const handleSearchChange = (searchBook) => {
    const books = allBooks.filter((book) => book.title === searchBook);
    setAllBooks(books);
    setPageDisplay(1);
  };

  const handleTextInput = (text) => {
    if (!text) {
      if (selectedFilters.length) {
        const filtered = nonChangeableBooks.filter((book) =>
          selectedFilters.includes(book.genre)
        );
        setAllBooks(filtered);
      } else setAllBooks(nonChangeableBooks);
    }
  };

  useEffect(() => {
    setIndexFrom(0);
    setIndexTo(booksPerPage);
    setSortedValue(0);
    setPageDisplay(1);
  }, [
    selectedFilters,
    booksPerPage,
    setIndexFrom,
    setIndexTo,
    setPageDisplay,
    setSortedValue,
  ]);

  return (
    <>
      <section className="elements">
        <div className="elements__container">
          <h1 className="elements__title">Lista książek</h1>
          <div>
            <Autocomplete
              id="elements__auto-complete"
              options={allBooks.map((book) => book.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Szukaj książki.."
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => handleTextInput(e.target.value)}
                />
              )}
              onChange={(e, selectedElement) =>
                handleSearchChange(selectedElement)
              }
              value={null}
            />
          </div>
        </div>

        {allBooks.slice(indexFrom, indexTo).map((book) => (
          <Element elementObj={book} key={book.id} />
        ))}

        <Pagination
          count={Math.ceil(allBooks.length / booksPerPage)}
          color="secondary"
          page={pageDisplay}
          className="elements__pagination"
          onChange={(e, page) => handlePaginationChange(page)}
        />
      </section>
    </>
  );
}
export default Elementlist;

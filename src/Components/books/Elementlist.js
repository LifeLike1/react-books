import { TextField } from "@material-ui/core";
import { Autocomplete, Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";

import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({
  allBooks,
  setAllBooks,
  nonChangeableBooks,
  filters,
  pageDisplay,
  setPageDisplay,
}) {
  const booksPerPage = 3;
  const [indexFrom, setIndexFrom] = useState(0);
  const [indexTo, setIndexTo] = useState(booksPerPage);
  const handlePaginationChange = (page) => {
    const startIndex = page * booksPerPage - booksPerPage;

    setIndexFrom(startIndex);
    setIndexTo(startIndex + booksPerPage);
    setPageDisplay(page);
    setAllBooks(allBooks);
  };

  const handleSearchChange = (searchBook) => {
    const books = allBooks.filter((book) => book.title === searchBook);
    setAllBooks(books);
    setPageDisplay(1);
  };

  const handleTextInput = (text) => {
    if (!text) setAllBooks(nonChangeableBooks);
  };

  useEffect(() => {
    setAllBooks(nonChangeableBooks);
    setPageDisplay(1);
  }, [filters]);

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
                  // onChange={(e) => handleTextInput(e.target.value)}
                />
              )}
              onChange={(e, selectedElement) =>
                handleSearchChange(selectedElement)
              }
              value={null}
            />
          </div>
        </div>

        {allBooks &&
          allBooks
            .slice(indexFrom, indexTo)
            .map((book) => <Element elementObj={book} key={book.id} />)}

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

import { TextField } from "@material-ui/core";
import { Autocomplete, Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";

import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({ allBooks, filters }) {
  const booksPerPage = 3;
  const [pageDisplay, setPageDisplay] = useState(1);
  const [booksToShow, setBooksToShow] = useState([]);
  const [searched, setSearched] = useState(false);

  const handlePaginationChange = (page) => {
    const startIndex = page * booksPerPage - booksPerPage;
    setPageDisplay(page);
    setBooksToShow(allBooks.slice(startIndex, startIndex + booksPerPage));
  };

  const handleSearchChange = (searchBook) => {
    const books = allBooks.filter((book) => book.title === searchBook);
    setBooksToShow(books);
    setPageDisplay(1);
    setSearched(true);
  };

  useEffect(() => {
    setBooksToShow([]);
    setPageDisplay(1);
    setSearched(false);
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
                />
              )}
              onChange={(e, selectedElement) =>
                handleSearchChange(selectedElement)
              }
              value={null}
            />
          </div>
        </div>

        {!booksToShow.length
          ? allBooks
              .slice(0, booksPerPage)
              .map((book) => <Element elementObj={book} key={book.id} />)
          : booksToShow.map((book) => (
              <Element elementObj={book} key={book.id} />
            ))}

        <Pagination
          count={Math.ceil(!searched ? allBooks.length / booksPerPage : 1)}
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

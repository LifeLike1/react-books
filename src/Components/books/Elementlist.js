import { Autocomplete, Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";

import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({ allBooks, filters }) {
  const booksPerPage = 3;
  const [pageDisplay, setPageDisplay] = useState(1);
  const [booksToShow, setBooksToShow] = useState([]);

  const handlePaginationChange = (page) => {
    const startIndex = page * booksPerPage - booksPerPage;
    setPageDisplay(page);
    setBooksToShow(allBooks.slice(startIndex, startIndex + booksPerPage));
  };

  useEffect(() => {
    setBooksToShow([]);
    setPageDisplay(1);
  }, [filters]);

  return (
    <>
      <section className="elements">
        <div className="elements__container">
          <h1 className="elements__title">Lista książek</h1>
        </div>
        {!booksToShow.length
          ? allBooks
              .slice(0, booksPerPage)
              .map((book) => <Element elementObj={book} key={book.id} />)
          : booksToShow.map((book) => (
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

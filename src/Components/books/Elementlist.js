import { Autocomplete, Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";

import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({ allBooks, filters }) {
  const [booksPerPage, setBooksPerPage] = useState(3);
  const [booksToShow, setBooksToShow] = useState([]);

  const handlePaginationChange = (e, page) => {
    const startIndex = page * booksPerPage - booksPerPage;
    setBooksToShow(allBooks.slice(startIndex, startIndex + booksPerPage));
  };

  useEffect(() => {
    setBooksToShow([]);
  }, [filters]);

  return (
    <>
      <div className="elements">
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
          color="primary"
          className="elements__pagination"
          onChange={(e, page) => handlePaginationChange(e, page)}
        />
      </div>
    </>
  );
}
export default Elementlist;

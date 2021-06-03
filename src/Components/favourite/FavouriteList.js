import { useContext, useState } from "react";
import { FavouriteBookContext } from "../context/FavouriteBookContextProvider";
import "./FavouriteList.scss";
import { Alert } from "@material-ui/lab";
import FavouriteAside from "./FavouriteAside";
import FavouriteImages from "./FavouriteImages";

function FavouriteList() {
  const [favouriteBooks] = useContext(FavouriteBookContext);
  const [booksToShow, setBooksToShow] = useState(
    favouriteBooks.sort((a, b) => b.rating - a.rating)
  );
  const favouriteBooksWithCategories = favouriteBooks.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.genre]: acc[curr.genre] ? [...acc[curr.genre], curr] : [curr],
    }),
    {}
  );
  const uniqueCategories = Object.keys(favouriteBooksWithCategories).sort();
  const handleCategorySelect = (value) => {
    setBooksToShow(favouriteBooksWithCategories[value]);
  };
  return (
    <main className="favourite">
      {favouriteBooks.length > 1 ? (
        <section className="fav-container">
          <FavouriteAside
            setBooksToShow={setBooksToShow}
            favouriteBooks={favouriteBooks}
            uniqueCategories={uniqueCategories}
            handleCategorySelect={handleCategorySelect}
          />
          <FavouriteImages booksToShow={booksToShow} />
        </section>
      ) : (
        <Alert severity="warning" className="favourite__alert">
          Wybierz ulubione książki
        </Alert>
      )}
    </main>
  );
}

export default FavouriteList;

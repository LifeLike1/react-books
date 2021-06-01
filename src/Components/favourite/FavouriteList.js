import { useContext, useState } from "react";
import { FavouriteBookContext } from "../context/StateContext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./FavouriteList.scss";
import { Alert } from "@material-ui/lab";

function FavouriteList() {
  const [favouriteBooks] = useContext(FavouriteBookContext);
  const [booksToShow, setBooksToShow] = useState(favouriteBooks);
  const favouriteBooksWithCategories = favouriteBooks.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.genre]: acc[curr.genre] ? [...acc[curr.genre], curr] : [curr],
    };
  }, {});
  const uniqueCategories = Object.keys(favouriteBooksWithCategories);
  const handleCategorySelect = (value) => {
    setBooksToShow(favouriteBooksWithCategories[value]);
    console.log(favouriteBooksWithCategories[value]);
  };
  return (
    <main className="favourite">
      {favouriteBooks.length > 1 ? (
        <section className="fav-container">
          <aside className="fav-aside">
            <h2 className="fav-aside__title">
              <FavoriteIcon />
              Wybierz ulubione
            </h2>
            <div className="fav-aside__categories">
              <div
                className="fav-aside__category"
                onClick={() => setBooksToShow(favouriteBooks)}
              >
                Wszystkie
              </div>
              {uniqueCategories.map((category, index) => (
                <div
                  className="fav-aside__category"
                  key={index}
                  onClick={(e) => handleCategorySelect(e.target.innerText)}
                >
                  {category}
                </div>
              ))}
            </div>
          </aside>
          <div className="fav-image-cont">
            <div className="fav-images">
              {booksToShow &&
                booksToShow.map((book, index) => (
                  <div className="fav-images__image-container" key={index}>
                    <img
                      className="fav-images__image"
                      src={book.image_url}
                    ></img>
                  </div>
                ))}
            </div>
          </div>
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

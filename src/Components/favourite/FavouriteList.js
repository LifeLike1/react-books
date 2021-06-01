import { useContext, useState } from "react";
import { FavouriteBookContext } from "../context/StateContext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./FavouriteList.scss";

function FavouriteList() {
  const [favouriteBooks] = useContext(FavouriteBookContext);
  const [booksToShow, setBooksToShow] = useState([]);
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
      <section className="fav-container">
        <aside className="fav-aside">
          <h2 className="fav-aside__title">
            <FavoriteIcon />
            Ulubione gatunki
          </h2>
          <div className="fav-aside__categories">
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
        <div className="cont">
          <div className="fav-images">
            {booksToShow &&
              booksToShow.map((book, index) => (
                <div key={index}>
                  <div className="fav-images__image-container">
                    <img
                      className="fav-images__image"
                      src={book.image_url}
                    ></img>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FavouriteList;

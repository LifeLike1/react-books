import FavoriteIcon from "@material-ui/icons/Favorite";
import "./FavouriteAside.scss";

const FavouriteAside = ({
  setBooksToShow,
  favouriteBooks,
  uniqueCategories,
  handleCategorySelect,
}) => {
  return (
    <aside className="fav-aside">
      <h2 className="fav-aside__title">
        <FavoriteIcon className="fav-aside__icon" />
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
  );
};

export default FavouriteAside;

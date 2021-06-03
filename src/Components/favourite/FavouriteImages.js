import StarIcon from "@material-ui/icons/Star";
import "./FavouriteImages.scss";

function FavouriteImages({ booksToShow }) {
  return (
    <div className="fav-image-cont">
      <div className="fav-images">
        {booksToShow &&
          booksToShow.map((book, index) => (
            <div className="fav-images__image-container" key={index}>
              <img
                className="fav-images__image"
                alt={book.title}
                src={book.image_url}
              ></img>
              <h1>{book.author}</h1>
              <h2>
                {book.rating ? book.rating.toFixed(2) : 0}{" "}
                <StarIcon className="fav-images__star" />
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavouriteImages;

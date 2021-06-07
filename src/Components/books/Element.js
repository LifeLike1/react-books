import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./Element.scss";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";

function Element({
  elementObj,
  bookBase,
  favouriteBooks,
  setFavouriteBooks,
  deleteBookList,
  setDeleteBookList,
}) {
  const handleFavouriteSelect = (selectObj, selectBool) => {
    selectBool
      ? setFavouriteBooks([...favouriteBooks, selectObj])
      : setFavouriteBooks(
          favouriteBooks.filter((obj) => obj.id !== selectObj.id)
        );
  };
  const handleDeleteSelect = (id, selectBool) => {
    selectBool
      ? setDeleteBookList([...deleteBookList, id])
      : setDeleteBookList(deleteBookList.filter((book) => book !== id));
    console.log(deleteBookList);
  };
  const { id, title, author, release_date, image_url, rating } = elementObj;
  return (
    <div className="element">
      <div className="element__image-container">
        <Link
          to={{
            pathname: `/${id}`,
            state: { bookBase: bookBase },
          }}
          className="element__link"
        >
          <img src={image_url} alt={title} className="element__image" />
        </Link>
      </div>
      <div className="element__description">
        <div className="element__wrap">
          <div className="element__title">
            <Link
              to={{
                pathname: `/${id}`,
                state: { bookBase: bookBase },
              }}
              className="element__link"
            >
              {title}
            </Link>
          </div>
          <div className="element__author">
            <h3>{author}</h3>
            <Rating
              className="element__star"
              name={title}
              value={rating}
              size="large"
              readOnly={true}
              precision={0.25}
            />
          </div>
          <div className="element__date">
            <h4>{release_date.substr(0, 10)}</h4>
          </div>
        </div>
      </div>
      <div className="element__functions">
        <Link
          to={{
            pathname: `/${id}`,
            state: { bookBase: bookBase },
          }}
          className="element__link"
        >
          <Button variant="contained" color="primary">
            Więcej..
          </Button>
        </Link>
        <FormControlLabel
          className="element__check"
          control={
            <Checkbox
              name="Ulubione"
              // check if this book is in favouriteBookList
              checked={favouriteBooks.some((book) => book.id === id)}
              className="element__checkbox"
              onChange={(e) =>
                handleFavouriteSelect(elementObj, e.target.checked)
              }
            />
          }
          label="Ulubione"
        />
        <FormControlLabel
          className="element__check element__check--remove"
          control={
            <Checkbox
              name="Usuń"
              checked={deleteBookList.includes(id)}
              className="element__checkbox element__checkbox--remove"
              onChange={(e) => handleDeleteSelect(id, e.target.checked)}
            />
          }
          label="Usuń"
        />
      </div>
    </div>
  );
}

export default Element;

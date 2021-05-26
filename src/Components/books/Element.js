import "./Element.scss";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import EditBookForm from "./EditBookForm";

function Element({ elementObj, setAllBooks, setNonChangeableBooks }) {
  const { id, title, author, release_date, image_url, rating } = elementObj;
  return (
    <div className="element">
      <div className="element__image-container">
        <Link to={`/book/${id}`} className="element__link">
          <img src={image_url} alt={title} className="element__image" />
        </Link>
      </div>
      <div className="element__description">
        <div className="element__wrap">
          <div className="element__title">
            <Link to={`/book/${id}`} className="element__link">
              {title}
            </Link>
          </div>
          <div className="element__author">
            <h3>{author}</h3>
          </div>
          <div className="element__date">
            <h4>{release_date.substr(0, 10)}</h4>
          </div>
        </div>
      </div>
      <div className="element__functions">
        <Rating
          name={title}
          value={rating}
          size="large"
          readOnly={true}
          precision={0.25}
        />
        <EditBookForm
          elementObj={elementObj}
          setAllBooks={setAllBooks}
          setNonChangeableBooks={setNonChangeableBooks}
        />
      </div>
    </div>
  );
}

export default Element;

import "./Element.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
function Element({ elementObj }) {
  const {
    id,
    title,
    author,
    genre,
    release_date,
    description,
    image_url,
    rating,
  } = elementObj;
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
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
      </div>
    </div>
  );
}

export default Element;

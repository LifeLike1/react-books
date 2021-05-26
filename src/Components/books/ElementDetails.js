import { SvgIcon } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./ElementDetails.scss";

function ElementDetails({ setAllBooks, setNonChangeableBooks }) {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${id}`)
      .then((res) => setBookValues(res.data))
      .catch((e) => setBookValues({ error: e }));
  }, [id]);
  const [bookValues, setBookValues] = useState({});

  const {
    title,
    author,
    genre,
    release_date = "x",
    description,
    image_url,
    rating = null,
  } = bookValues;

  const [ratingResponse, setRatingResponse] = useState(null);

  const [rate, setRate] = useState(rating);
  const [rateDisabled, setRateDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${id}`)
      .then((res) => setRate(res.data.rating))
      .catch((e) => setRate(null));
  }, [ratingResponse, id]);

  const addRating = (id, rating) => {
    axios
      .post(`http://localhost:5000/api/book/${id}/rate`, {
        score: parseFloat(rating),
      })
      .then((res) => setRatingResponse(`Dodano rating dla ${id}`))
      .catch((e) => setRatingResponse(`Nie udało się dodać ratingu dla ${id}`));
    setRateDisabled(true);
  };

  return (
    <main className="details">
      <Link to="/books" className="details__back">
        <SvgIcon>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
        Wróć do szukania książek
      </Link>
      <section className="informations">
        <h1>{`${title} - ${genre}`}</h1>
        <h3>{`Autor: ${author}`}</h3>
        <h3>{`Pierwsze wydanie: ${release_date}`}</h3>
        <h3>Oddaj swój głos!</h3>
        <Rating
          name={title + id}
          value={rate}
          precision={1}
          onChange={(e) => addRating(id, e.target.value)}
          disabled={rateDisabled}
        />
        <h2>{ratingResponse}</h2>
        <img src={image_url} alt={title} className="informations__image" />
      </section>
      <section className="description">
        <h2 className="description__title">Opis książki</h2>
        <p className="description__text">{description}</p>
      </section>
    </main>
  );
}

export default ElementDetails;

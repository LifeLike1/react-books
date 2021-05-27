import { SvgIcon } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSingleBookAPI, postSingleBookAPI } from "../static/requests";
import "./ElementDetails.scss";

function ElementDetails({ setAllBooks, setNonChangeableBooks }) {
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getSingleBookAPI(id);
      setBookValues(response);
    };
    fetchData();
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
    const fetchData = async () => {
      const response = await getSingleBookAPI(id);
      setRate(response.rating);
    };
    fetchData();
  }, [ratingResponse, id]);

  const addRating = (id, rating) => {
    const fetchData = async () => {
      await postSingleBookAPI(id, rating);
    };
    fetchData();
    setRatingResponse(`Dodano rating dla ${id}`);
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
        <h3>{`Pierwsze wydanie: ${release_date.substr(0, 10)}`}</h3>
        <h3>Oddaj swój głos!</h3>
        <Rating
          name={title + id}
          value={rate}
          precision={1}
          onChange={(e) => addRating(id, e.target.value)}
          disabled={rateDisabled}
        />
        {ratingResponse && <h2>{ratingResponse}</h2>}
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

import { Button, SvgIcon } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getSingleBookAPI, postSingleBookRateAPI } from "../static/requests";
import AddEditForm from "./AddEditForm";
import "./ElementDetails.scss";

function ElementDetails() {
  const { id } = useParams();

  const [bookValues, setBookValues] = useState({});
  const [ratingResponse, setRatingResponse] = useState(null);
  const [rateDisabled, setRateDisabled] = useState(false);
  const {
    title,
    author,
    genre,
    release_date,
    description,
    image_url,
    rating = null,
  } = bookValues;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSingleBookAPI(id);
      setBookValues(response);
      setRate(response.rating);
    };
    fetchData();
  }, [ratingResponse, id, rateDisabled]);

  const addRating = (id, rating) => {
    const fetchData = async () => {
      await postSingleBookRateAPI(id, rating);
      const response = await getSingleBookAPI(id);
      console.log(response.rating);
      setRate(response.rating);
    };
    fetchData();
    setRatingResponse(`Dodano rating dla ${id}`);
    setRateDisabled(true);
  };

  const [rate, setRate] = useState(rating);
  return (
    <main className="details">
      <Link to="/books" className="details__back">
        <SvgIcon>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
        Wróć do szukania książek
      </Link>
      <section className="informations">
        <h1>
          {title} - {genre}
        </h1>
        <h3>Autor: {author}</h3>
        <h3>Pierwsze wydanie: {release_date && release_date.substr(0, 10)}</h3>
        <h3>Oddaj swój głos!</h3>
        <Rating
          name={title + id}
          value={rate}
          precision={1}
          onChange={(e) => addRating(id, e.target.value)}
          disabled={rateDisabled}
        />
        {ratingResponse && <h2>{ratingResponse}</h2>}
        <div className="informations__buttons">
          {bookValues && (
            <AddEditForm
              elementObj={{ ...bookValues, id }}
              // setAllBooks={setAllBooks}
              // setNonChangeableBooks={setNonChangeableBooks}
              setBookValues={setBookValues}
              buttonTitle="Edytuj książkę"
            />
          )}
          <Button variant="contained" color="primary">
            Usuń książkę
          </Button>
        </div>
        <img src={image_url} alt={title} className="informations__image" />
      </section>
      <section className="description">
        <h2 className="description__title">Opis książki</h2>
        <p className="description__text">{description}</p>
      </section>
    </main>
  );
}

export default withRouter(ElementDetails);

import { Button, CircularProgress, SvgIcon } from "@material-ui/core";
import { Alert, Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  getSingleBookAPI,
  postSingleBookRateAPI,
  deleteSingleBookAPI,
} from "../static/requests";
import AddEditForm from "./AddEditForm";
import "./ElementDetails.scss";

function ElementDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [bookValues, setBookValues] = useState({});
  const [detailsErrors, setDetailsErrors] = useState({
    get: false,
    post: false,
    delete: false,
  });
  const [ratingResponse, setRatingResponse] = useState(null);
  const [rateDisabled, setRateDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    const fetchData = async () => {
      const response = await getSingleBookAPI(id);
      if (response) {
        setBookValues(response);
        setRate(response.rating);
        setDetailsErrors({ ...detailsErrors, get: false });
      } else {
        setDetailsErrors({ ...detailsErrors, get: true });
      }
      setLoading(false);
    };
    setTimeout(() => fetchData(), 1000);
  }, [ratingResponse, id, rateDisabled]);

  const addRating = (id, rating) => {
    const fetchData = async () => {
      const postResponse = await postSingleBookRateAPI(id, rating);
      if (postResponse) {
        setDetailsErrors({ ...detailsErrors, post: false });
      } else {
        setDetailsErrors({ ...detailsErrors, post: true });
      }
      const response = await getSingleBookAPI(id);
      if (response) {
        setRate(response.rating);
        setDetailsErrors({ ...detailsErrors, get: false });
      } else {
        setDetailsErrors({ ...detailsErrors, get: true });
      }
    };
    fetchData();
    setRatingResponse(`Dodano rating dla ${id}`);
    setRateDisabled(true);
  };

  const handleBookRemoval = () => {
    setLoading(true);
    const deleteData = async () => {
      const response = await deleteSingleBookAPI(id);
      if (response) {
        history.push("/books");
        setDetailsErrors({ ...detailsErrors, delete: false });
        setLoading(false);
      } else {
        setDetailsErrors({ ...detailsErrors, delete: true });
        setLoading(false);
      }
    };
    deleteData();
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
      {!loading ? (
        <>
          {!detailsErrors.get ? (
            <>
              <section className="informations">
                <h1>
                  {title} - {genre}
                </h1>
                <h3>Autor: {author}</h3>
                <h3>
                  Pierwsze wydanie: {release_date && release_date.substr(0, 10)}
                </h3>
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
                  {bookValues.title && (
                    <AddEditForm
                      elementObj={{ ...bookValues, id }}
                      setBookValues={setBookValues}
                      buttonTitle="Edytuj książkę"
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBookRemoval}
                  >
                    Usuń książkę
                  </Button>
                </div>
                <img
                  src={image_url}
                  alt={title}
                  className="informations__image"
                />
              </section>
              <section className="description">
                <h2 className="description__title">Opis książki</h2>
                <p className="description__text">{description}</p>
              </section>
            </>
          ) : (
            <div className="description__alert">
              <Alert severity="error">Nie udało się wczytać książki!</Alert>
            </div>
          )}
        </>
      ) : (
        <div className="description__alert">
          <Alert severity="info">
            Ładowanie informacji o książce.. <CircularProgress size="1.25em" />
          </Alert>
        </div>
      )}
    </main>
  );
}

export default withRouter(ElementDetails);

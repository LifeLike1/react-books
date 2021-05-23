import { Rating } from "@material-ui/lab";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ElementDetails.scss";

function Book() {
  const { id } = useParams();
  const [bookValues, setBookValues] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/book/${id}`)
      .then((res) => setBookValues(res.data))
      .catch((e) => setBookValues({ error: e }));
  }, []);
  const {
    title,
    author,
    genre,
    release_date = "x",
    description,
    image_url,
    rating = null,
  } = bookValues;
  return (
    <main className="details">
      <section className="informations">
        <h1>{`${title} - ${genre}`}</h1>
        <h3>{`Autor: ${author}`}</h3>
        <h3>{`Pierwsze wydane: ${release_date.substr(0, 10)}`}</h3>
        <Rating name={title + "-detail"} value={rating} readOnly={true} />
        <img src={image_url} alt={title} className="informations__image" />
      </section>
      <section className="description">
        <h2>Opis książki</h2>
        <p>{description}</p>
      </section>
    </main>
  );
}

export default Book;

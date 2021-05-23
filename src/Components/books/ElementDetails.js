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
    release_date,
    description,
    image_url,
    rating = null,
  } = bookValues;
  return (
    <main className="details">
      <section className="informations">
        <h1>{title}</h1>
        <Rating
          name={title + "-detail"}
          value={rating}
          size="large"
          readOnly={true}
        />
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

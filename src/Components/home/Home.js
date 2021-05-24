import axios from "axios";
import { Form, Field, Formik } from "formik";
import { useState } from "react";
import "./Home.scss";

function Home() {
  const [addResponse, setAddResponse] = useState(null);
  const [removeResponse, setRemoveResponse] = useState(null);
  const [ratingResponse, setRatingResponse] = useState(null);
  const addBook = (values) => {
    const { title, author, genre, date, description, link } = values;
    axios
      .post("http://localhost:5000/api/book", {
        title,
        author,
        genre,
        release_date: date,
        description,
        image_url: link,
      })
      .then((res) => setAddResponse("Dodano do bazy"))
      .catch((e) => setAddResponse("Nie udało się"));
  };
  const deleteBook = (values) => {
    axios
      .delete(`http://localhost:5000/api/book/${values.id}`)
      .then((res) => setRemoveResponse(`Usunięto książke o id: ${values.id}`))
      .catch((e) => setRemoveResponse("Nie udało się usunąć książki"));
  };
  const addRating = (values) => {
    axios
      .post(`http://localhost:5000/api/book/${values.id}/rate`, {
        score: parseFloat(values.rating),
      })
      .then((res) => setRatingResponse(`Dodano rating dla ${values.id}`))
      .catch((e) => console.log(values.rating));
  };
  return (
    <main>
      <h1>Strona główna</h1>
      <Formik
        initialValues={{
          title: "",
          author: "",
          genre: "",
          date: "",
          description: "",
          link: "",
        }}
        onSubmit={addBook}
      >
        <Form className="submit-form">
          <label htmlFor="title">Tytuł</label>
          <Field id="title" name="title" placeholder="Tytuł" />

          <label htmlFor="author">Autor</label>
          <Field id="author" name="author" placeholder="Autor" />

          <label htmlFor="genre">Gatunek</label>
          <Field id="genre" name="genre" placeholder="Gatunek" />

          <label htmlFor="date">Data wydania</label>
          <Field id="date" name="date" placeholder="Data wydania" />

          <label htmlFor="description">Opis</label>
          <Field id="description" name="description" placeholder="Opis" />

          <label htmlFor="link">Link do zdjęcia</label>
          <Field id="link" name="link" placeholder="Link" />

          <button type="submit">Dodaj do bazy</button>
        </Form>
      </Formik>

      <p>{addResponse}</p>

      <Formik
        initialValues={{
          id: "",
        }}
        onSubmit={deleteBook}
      >
        <Form>
          <label htmlFor="id">Id</label>
          <Field id="id" name="id" placeholder="Id"></Field>
          <button type="submit">Usuń</button>
        </Form>
      </Formik>
      <p>{removeResponse}</p>
      <Formik
        initialValues={{
          id: "",
          rating: "",
        }}
        onSubmit={addRating}
      >
        <Form>
          <label htmlFor="id">Id</label>
          <Field id="id" name="id" placeholder="Id"></Field>
          <label htmlFor="rating">Rating</label>
          <Field id="rating" name="rating" placeholder="Rating"></Field>
          <button type="submit">Dodaj rating</button>
        </Form>
      </Formik>
      <p>{ratingResponse}</p>
    </main>
  );
}

export default Home;

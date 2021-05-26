import { Button, Modal, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import { useFormik } from "formik";
import "./Modal.scss";
import axios from "axios";

function EditBookForm({ elementObj, setAllBooks, setNonChangeableBooks }) {
  const { id, title, genre, author, release_date, description, image_url } =
    elementObj;
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({
    response: null,
    success: true,
  });
  const [errors, setErrors] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: title,
      author: author,
      genre: genre,
      date: release_date.substr(0, 10),
      description: description,
      link: image_url,
    },
    onSubmit: ({ title, author, genre, date, description, link }) => {
      const currentErrors = [];
      setResponse({ response: null, success: true });
      if (!title) {
        currentErrors.push("Tytuł nie może być pusty");
        console.log(currentErrors);
      }
      if (typeof title !== "string")
        currentErrors.push("Tytuł musi być wyrazem");
      if (!author) currentErrors.push("Musisz podać autora");
      if (!genre) currentErrors.push("Musisz podać gatunek");
      if (typeof genre !== "string")
        currentErrors.push("Gatunek musi być wyrazem");
      if (genre.length > 50)
        currentErrors.push("Gatunek ma maksymalnie 50 znaków");
      if (!date) currentErrors.push("Musisz podać datę");
      if (Number.isNaN(Date.parse(date)))
        currentErrors.push("Musisz podać prawidłową datę");
      if (!description) currentErrors.push("Musisz podać opis");
      if (typeof link !== "string") currentErrors.push("Link musi być wyrazem");

      if (!currentErrors.length) {
        axios
          .put(`http://localhost:5000/api/book/${id}`, {
            title,
            author,
            genre,
            release_date: date,
            description,
            image_url: link,
          })
          .then((res) => {
            return axios
              .get("http://localhost:5000/api/book")
              .then((res) => {
                setNonChangeableBooks(res.data);
                setAllBooks(res.data);
                setOpen(true);
                setResponse({
                  success: true,
                  response: `Zmieniłeś dane z id: ${id}`,
                });
              })
              .catch((e) =>
                setResponse({
                  success: false,
                  response: `Coś poszło nie tak id: ${id}`,
                })
              );
          })
          .catch((e) => console.log(e));
      } else {
        setErrors(currentErrors);
      }
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponse({ response: null, success: true });
    setErrors([]);
  };
  const body = (
    <div className="modal">
      <div className="modal__back" onClick={handleClose}>
        <Close /> <h4>Wróć</h4>
      </div>
      <h2 id="modal__title-name">{title}</h2>
      <form className="submit-form" onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Tytuł"
          placeholder={title}
          color="secondary"
          className="submit-form__input"
          onChange={formik.handleChange}
          value={formik.values.title}
          autoComplete="off"
        />

        <TextField
          id="author"
          name="author"
          label="Autor"
          placeholder={author}
          color="secondary"
          className="submit-form__input"
          onChange={formik.handleChange}
          value={formik.values.author}
          autoComplete="off"
        />

        <TextField
          id="genre"
          name="genre"
          label="Gatunek"
          placeholder={genre}
          color="secondary"
          className="submit-form__input"
          onChange={formik.handleChange}
          value={formik.values.genre}
          autoComplete="off"
        />

        <TextField
          id="date"
          name="date"
          label="Data wydania"
          placeholder={release_date.substr(0, 10)}
          color="secondary"
          className="submit-form__input"
          onChange={formik.handleChange}
          value={formik.values.date}
          autoComplete="off"
        />
        <TextField
          id="description"
          name="description"
          label="Opis"
          placeholder={`${description.substr(0, 30)}...`}
          color="secondary"
          className="submit-form__input"
          onChange={formik.handleChange}
          value={formik.values.description}
          autoComplete="off"
        />

        <TextField
          id="link"
          name="link"
          label="Link do zdjęcia"
          placeholder={image_url}
          color="secondary"
          className="submit-form__input"
          onChange={formik.handleChange}
          value={formik.values.link}
          autoComplete="off"
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="submit-form__button"
        >
          Edytuj książkę
        </Button>
        {response.response && (
          <p className={response.success ? "modal__success" : "modal__fail"}>
            {response.response}
          </p>
        )}
        {errors.map((error, index) => (
          <li className="modal__fail" key={index}>
            {error}
          </li>
        ))}
      </form>
    </div>
  );
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Edytuj książkę
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal__title-name"
      >
        {body}
      </Modal>
    </div>
  );
}

export default EditBookForm;

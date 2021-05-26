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
  const [errors, setErrors] = useState({
    title: false,
    author: false,
    genre: false,
    date: false,
    description: false,
    link: false,
  });
  const formik = useFormik({
    initialValues: {
      title: title,
      author: author,
      genre: genre,
      date: release_date.substr(0, 10),
      description: description.substr(0, 30),
      link: image_url,
    },
    onSubmit: ({ title, author, genre, date, description, link }) => {
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
              setAllBooks(res.data);
              setOpen(true);
              setNonChangeableBooks(res.data);
            })
            .catch((e) => console.log(e.response));
        })
        .catch((e) => console.log(e));
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

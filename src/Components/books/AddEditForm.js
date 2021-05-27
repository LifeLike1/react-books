import { Button, Modal, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import { useFormik } from "formik";
import {
  getBooksAPI,
  putSingleBookAPI,
  postSingleBookAPI,
} from "../static/requests";
import "./Modal.scss";

function AddEditForm({
  elementObj = {},
  setAllBooks,
  setNonChangeableBooks,
  buttonTitle,
}) {
  const {
    id = null,
    title = "",
    genre = "",
    author = "",
    release_date = "",
    description = "",
    image_url = "",
  } = elementObj;

  const requestChoice = id === null ? "add" : "edit";

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
      date: release_date ? release_date.substr(0, 10) : "",
      description: description ? `${description.substr(0, 30)}...` : "",
      link: image_url,
    },
    onSubmit: ({ title, author, genre, date, description, link }) => {
      // Errors handling
      const currentErrors = [];
      setResponse({ response: null, success: true });
      if (!title) currentErrors.push("Tytuł nie może być pusty");
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

      // no errors
      if (!currentErrors.length) {
        if (requestChoice === "edit") {
          const fetchData = async () => {
            const putResponse = await putSingleBookAPI(id, {
              title: title.trim(),
              author: author.trim(),
              genre: genre.trim(),
              release_date: date.trim(),
              description: description.toLowerCase().replace(/\s/g, ""),
              image_url: link.trim(),
            });
            if (putResponse) {
              const getResponse = await getBooksAPI();
              setNonChangeableBooks(getResponse);
              setAllBooks(getResponse);
              setOpen(true);
              setResponse({
                success: true,
                response: `Zmieniłeś dane z id: ${id}`,
              });
            } else {
              setResponse({
                success: false,
                response: `Coś poszło nie tak id: ${id}`,
              });
            }
          };
          fetchData();
        } else if (requestChoice === "add") {
          const fetchData = async () => {
            const postResponse = await postSingleBookAPI({
              title,
              author,
              genre,
              release_date: date,
              description,
              image_url: link,
            });
            if (postResponse) {
              const getResponse = await getBooksAPI();
              setNonChangeableBooks(getResponse);
              setAllBooks(getResponse);
              setOpen(true);
              setResponse({
                success: true,
                response: `Dodałeś: ${title}`,
              });
            } else {
              setResponse({
                success: false,
                response: `Nie udało się dodać: ${title}`,
              });
            }
          };
          fetchData();
        }
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
          placeholder={release_date}
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
          placeholder={description}
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
          {buttonTitle}
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
        {buttonTitle}
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

export default AddEditForm;

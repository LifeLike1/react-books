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
  setBookValues,
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
      date: release_date.substr(0, 10),
      description: description && `${description.substr(0, 30)}...`,
      link: image_url,
    },
    onSubmit: ({ title, author, genre, date, description, link }) => {
      setErrors([]);
      setResponse({ response: null, success: true });
      // Errors handling
      const currentErrors = [];
      if (!title) currentErrors.push("Tytuł nie może być pusty");
      if (typeof title !== "string")
        currentErrors.push("Tytuł musi być wyrazem");
      if (!author) currentErrors.push("Musisz podać autora");
      if (typeof author !== "string")
        currentErrors.push("Autor musi być wyrazem");
      if (!genre) currentErrors.push("Musisz podać gatunek");
      else if (typeof genre !== "string")
        currentErrors.push("Gatunek musi być wyrazem");
      else if (genre.length > 50)
        currentErrors.push("Gatunek ma maksymalnie 50 znaków");
      if (!date) currentErrors.push("Musisz podać datę");
      else if (Number.isNaN(Date.parse(date)))
        currentErrors.push("Musisz podać prawidłową datę");
      if (!description) currentErrors.push("Musisz podać opis");
      else if (typeof description !== "string")
        currentErrors.push("Opis musi być wyrazem");
      if (typeof link !== "string") currentErrors.push("Link musi być wyrazem");

      // no errors
      if (!currentErrors.length) {
        let response;
        const objValues = {
          title: title.trim(),
          author: author.trim(),
          genre: genre.toLowerCase().trim(),
          release_date: date.trim(),
          description: description.trim(),
          image_url: link.replace(/\s/g, ""),
        };
        const fetchData = async () => {
          if (requestChoice === "edit") {
            response = await putSingleBookAPI(id, objValues);
          } else if (requestChoice === "add") {
            response = await postSingleBookAPI(objValues);
          }
          if (response) {
            const getResponse = await getBooksAPI();
            setNonChangeableBooks && setNonChangeableBooks(getResponse);
            setAllBooks && setAllBooks(getResponse);
            setBookValues &&
              setBookValues({
                ...elementObj,
                title,
                author,
                genre,
                release_date: date,
                description,
                image_url: link,
              });
            setResponse({
              success: true,
              response:
                requestChoice === "edit"
                  ? `Zmieniłeś dane z id: ${id}`
                  : `Dodałeś: ${title}`,
            });
          } else {
            setResponse({
              success: false,
              response:
                requestChoice === "edit"
                  ? `Coś poszło nie tak id: ${id}`
                  : `Nie udało się dodać ${title}`,
            });
          }
        };
        fetchData();
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
    if (requestChoice === "add") {
      formik.values.title = "";
      formik.values.author = "";
      formik.values.genre = "";
      formik.values.date = "";
      formik.values.description = "";
      formik.values.link = "";
    }
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
          size="medium"
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
        {errors &&
          errors.map((error, index) => (
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

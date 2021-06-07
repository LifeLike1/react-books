import { Button, Modal, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import { useFormik } from "formik";
import {
  getBooksAPI,
  putSingleBookAPI,
  postSingleBookAPI,
} from "../static/requests";
import "./AddEditForm.scss";

function AddEditForm({
  elementObj = {},
  setBooksToShow,
  setBookBase,
  bookBase,
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
  // const [errors, setErrors] = useState([]);
  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Tytuł nie może być pusty";
    else if (requestChoice === "add")
      if (bookBase.some((book) => book.title === values.title))
        errors.title = "Ta książka jest już dodana";
      else if (typeof values.title !== "string")
        errors.title = "Tytuł musi być wyrazem";

    if (!values.author) errors.author = "Musisz podać autora";
    else if (typeof values.author !== "string")
      errors.author = "Autor musi być wyrazem";

    if (!values.genre) errors.genre = "Musisz podać gatunek";
    else if (typeof values.genre !== "string")
      errors.genre = "Gatunek musi być wyrazem";
    else if (values.genre.length > 50)
      errors.genre = "Gatunek ma maksymalnie 50 znaków";

    if (!values.release_date) errors.release_date = "Musisz podać datę";
    else if (Number.isNaN(Date.parse(values.release_date)))
      errors.release_date = "Musisz podać prawidłową datę";

    if (!values.description) errors.description = "Musisz podać opis";
    else if (typeof values.description !== "string")
      errors.description = "Opis musi być wyrazem";

    if (values.image_url)
      if (!values.image_url.includes("https://"))
        errors.image_url = "Podałeś zły link";

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      title,
      author,
      genre,
      release_date: release_date.substr(0, 10),
      description,
      image_url,
    },
    validate,
    onSubmit: ({
      title,
      author,
      genre,
      release_date,
      description,
      image_url,
    }) => {
      setResponse({ response: null, success: true });
      // no errors
      const objValues = {
        title: title.trim(),
        author: author.trim(),
        genre: genre.toLowerCase().trim(),
        release_date: release_date.trim(),
        description: description.trim(),
        image_url: image_url.replace(/\s/g, ""),
      };
      let response;
      const fetchData = async () => {
        if (requestChoice === "edit") {
          response = await putSingleBookAPI(id, objValues);
        } else if (requestChoice === "add") {
          response = await postSingleBookAPI(objValues);
        }
        if (response) {
          const getResponse = await getBooksAPI();
          setBookBase && setBookBase(getResponse);
          setBooksToShow && setBooksToShow(getResponse);
          setBookValues &&
            setBookValues({
              ...elementObj,
              title,
              author,
              genre,
              release_date,
              description,
              image_url,
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
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponse({ response: null, success: true });
  };

  const inputs = [
    {
      id: "title",
      placeholder: title,
      label: "Tytuł",
    },
    {
      id: "author",
      placeholder: author,
      label: "Autor",
    },
    {
      id: "genre",
      placeholder: genre,
      label: "Gatunek",
    },
    {
      id: "release_date",
      placeholder: release_date,
      label: "Data wydania",
    },
    {
      id: "description",
      placeholder: description,
      label: "Opis",
    },
    {
      id: "image_url",
      placeholder: image_url,
      label: "Link do zdjęcia",
    },
  ];
  const body = (
    <div className="modal">
      <div className="modal__back" onClick={handleClose}>
        <Close /> <h4>Wróć</h4>
      </div>
      <h2 id="modal__title-name">{title}</h2>
      <form className="submit-form" onSubmit={formik.handleSubmit}>
        {inputs.map((input) => (
          <TextField
            key={input.id}
            type={input.id === "release_date" ? "date" : "text"}
            id={input.id}
            name={input.id}
            defaultValue={input.id === "release_date" ? Date.now() : ""}
            label={input.id === "release_date" ? "" : input.label}
            placeholder={input.placeholder}
            color="secondary"
            error={formik.touched[input.id] && Boolean(formik.errors[input.id])}
            helperText={formik.touched[input.id] && formik.errors[input.id]}
            className="submit-form__input"
            onChange={formik.handleChange}
            value={formik.values[input.id]}
            autoComplete="off"
          />
        ))}

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

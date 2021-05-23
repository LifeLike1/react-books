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
  return (
    <>
      <h1>single book: {bookValues.id}</h1>
    </>
  );
}

export default Book;

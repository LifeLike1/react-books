import Autocomplete from "@material-ui/lab/Autocomplete";

import Element from "./Element";
import "./Elementlist.scss";

function Elementlist({ allBooks }) {
  return (
    <>
      <div className="elements">
        <div className="elements__container">
          <h1 className="elements__title">Lista książek</h1>
        </div>
        {allBooks.map((book) => (
          <Element elementObj={book} key={book.id} />
        ))}
      </div>
    </>
  );
}
export default Elementlist;

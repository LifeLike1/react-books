import Element from "./Element";
import "./Elementlist.scss";
function Elementlist({ allBooks }) {
  return (
    <>
      <div className="elements">
        <h1 className="elements__title">Lista książek</h1>
        {allBooks.map((book) => (
          <Element elementObj={book} key={book.id} />
        ))}
      </div>
    </>
  );
}
export default Elementlist;

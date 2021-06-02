import { Button } from "@material-ui/core";
import AddEditForm from "./AddEditForm";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const Functionalities = ({
  setAllBooks,
  setNonChangeableBooks,
  handleDeleteButton,
  deleteBookList,
}) => {
  return (
    <div className="sidebar__add-book">
      <h3 className="sidebar__inside-title">
        <SupervisorAccountIcon className="sidebar__icon" />
        Funkcje Admina
      </h3>
      <AddEditForm
        setAllBooks={setAllBooks}
        setNonChangeableBooks={setNonChangeableBooks}
        buttonTitle="Dodaj książkę"
      />
      {deleteBookList.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          className="sidebar__delete"
          onClick={handleDeleteButton}
        >
          Usuń książki
        </Button>
      )}
    </div>
  );
};

export default Functionalities;

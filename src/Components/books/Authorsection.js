import { FormControlLabel, Switch } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

function Authorsection({
  nonChangeableBooks,
  setSelectedAuthors,
  handleSelectedAuthor,
  selectedAuthors,
}) {
  const bookAuthors = nonChangeableBooks.map((book) => book.author);
  const uniqueAuthors = [...new Set(bookAuthors.sort())];
  return (
    <div className="sidebar__filter-container sidebar__filter-container--second">
      <h4 className="sidebar__inside-title">
        <PersonIcon className="sidebar__icon" />
        Wybierz autorów
      </h4>
      <div className="sidebar__filters">
        {uniqueAuthors.map((author, index) => (
          <FormControlLabel
            key={index}
            className="sidebar__option"
            control={
              <Switch
                checked={selectedAuthors.includes(author)}
                onChange={(e) =>
                  handleSelectedAuthor(e.target.name, e.target.checked)
                }
                name={author}
              />
            }
            label={author}
          />
        ))}
      </div>
    </div>
  );
}

export default Authorsection;

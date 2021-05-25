import { Checkbox, FormControlLabel } from "@material-ui/core";

function Filtersection({ nonChangeableBooks, handleSelectedFilter }) {
  const bookGenres = nonChangeableBooks.map((filter) => filter.genre);
  const uniqueFilters = [...new Set(bookGenres.sort())];
  return (
    <>
      <h3 className="sidebar__title">Dostępne filtry</h3>
      <div className="sidebar__filter-container">
        <h4 className="sidebar__inside-title">Wybierz filtry</h4>
        <div className="sidebar__filters">
          {uniqueFilters.map((filter, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name={filter}
                  onChange={(e) =>
                    handleSelectedFilter(e.target.name, e.target.checked)
                  }
                />
              }
              label={filter}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Filtersection;

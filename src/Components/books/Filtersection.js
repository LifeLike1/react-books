import { Checkbox, FormControlLabel } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

function Filtersection({
  nonChangeableBooks,
  handleSelectedFilter,
  selectedFilters,
}) {
  // Only genres
  const bookGenres = nonChangeableBooks.map((filter) => filter.genre);
  // Unique genres
  const uniqueFilters = [...new Set(bookGenres.sort())];
  return (
    <>
      <h3 className="sidebar__title">Dostępne filtry</h3>
      <div className="sidebar__filter-container">
        <h4 className="sidebar__inside-title">
          <FilterListIcon className="sidebar__icon" />
          Wybierz filtry
        </h4>
        <div className="sidebar__filters">
          {uniqueFilters.map((filter, index) => (
            <FormControlLabel
              key={index}
              className="sidebar__option"
              control={
                <Checkbox
                  name={filter}
                  checked={selectedFilters.includes(filter)}
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

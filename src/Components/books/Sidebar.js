import { Checkbox, FormControlLabel } from "@material-ui/core";
import "./Sidebar.scss";

function Sidebar({ allBooks, setSelectedFilters, selectedFilters }) {
  const bookGenres = allBooks.map((filter) => filter.genre);
  const uniqueFilters = [...new Set(bookGenres)];

  const handleSelectedFilter = (filterName, filterBool) => {
    filterBool
      ? setSelectedFilters([...selectedFilters, filterName])
      : setSelectedFilters(
          selectedFilters.filter((filter) => filter !== filterName)
        );
  };

  return (
    <>
      <aside className="sidebar">
        <h3 className="sidebar__title">Dostępne filtry</h3>
        <div className="sidebar__filter-container">
          <h4 className="sidebar__inside-title">Wybierz filtry</h4>
          <div className="sidebar__filters">
            {uniqueFilters.map((filter, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    className="sidebar__checkbox"
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
      </aside>
    </>
  );
}

export default Sidebar;

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./Sidebar.scss";

function Sidebar({
  nonChangeableBooks,
  allBooks,
  setAllBooks,
  setSelectedFilters,
  selectedFilters,
  setSortedValue,
  sortedValue,
}) {
  const bookGenres = nonChangeableBooks.map((filter) => filter.genre);
  const uniqueFilters = [...new Set(bookGenres.sort())];

  const handleSelectedFilter = (filterName, filterBool) => {
    filterBool
      ? setSelectedFilters([...selectedFilters, filterName])
      : setSelectedFilters(
          selectedFilters.filter((filter) => filter !== filterName)
        );
    setSortedValue(0);
  };

  const handleSortChange = (sortId) => {
    setSortedValue(sortId);
    switch (sortId) {
      case 0:
        setAllBooks([...allBooks].sort((a, b) => a.id - b.id));
        break;
      case 1:
        setAllBooks([...allBooks].sort((a, b) => a.rating - b.rating));
        break;
      case 2:
        setAllBooks([...allBooks].sort((a, b) => b.rating - a.rating));
        break;
      case 3:
        setAllBooks(
          [...allBooks].sort((a, b) =>
            a.title > b.title ? 1 : b.title > a.title ? -1 : 0
          )
        );
        break;
      case 4:
        setAllBooks(
          [...allBooks].sort((a, b) =>
            b.title > a.title ? 1 : a.title > b.title ? -1 : 0
          )
        );
        break;
      default:
        setAllBooks(nonChangeableBooks);
        break;
    }
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
        <div className="sidebar__sort">
          <h3>Posortuj według</h3>
          <FormControl>
            <InputLabel htmlFor="group-books"></InputLabel>
            <Select
              defaultValue={0}
              id="group-books"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortedValue}
            >
              <MenuItem value={0}>
                <em>Domyślnie</em>
              </MenuItem>
              <ListSubheader>Oceny</ListSubheader>
              <MenuItem value={1}>Oceny rosnąco</MenuItem>
              <MenuItem value={2}>Oceny malejąco</MenuItem>
              <ListSubheader>Alfabetycznie</ListSubheader>
              <MenuItem value={3}>Tytuł od A do Z</MenuItem>
              <MenuItem value={4}>Tytuł od Z do A</MenuItem>
              <ListSubheader>Daty</ListSubheader>
              <MenuItem value={5}>Data od najnowszych</MenuItem>
              <MenuItem value={6}>Data od najstarszych</MenuItem>
            </Select>
          </FormControl>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

import AddEditForm from "./AddEditForm";
import Filtersection from "./Filtersection";
import "./Sidebar.scss";
import Sortoptions from "./Sortoptions";

function Sidebar({
  nonChangeableBooks,
  setNonChangeableBooks,
  allBooks,
  setAllBooks,
  setSelectedFilters,
  selectedFilters,
  setSortedValue,
  sortedValue,
}) {
  // Filter list func
  const handleSelectedFilter = (filterName, filterBool) => {
    filterBool
      ? setSelectedFilters([...selectedFilters, filterName])
      : setSelectedFilters(
          selectedFilters.filter((filter) => filter !== filterName)
        );
    setSortedValue(0);
  };

  // Sort list func
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
      case 5:
        setAllBooks(
          [...allBooks].sort((a, b) =>
            b.release_date > a.release_date
              ? 1
              : a.release_date > b.release_date
              ? -1
              : 0
          )
        );
        break;
      case 6:
        setAllBooks(
          [...allBooks].sort((a, b) =>
            a.release_date > b.release_date
              ? 1
              : b.release_date > a.release_date
              ? -1
              : 0
          )
        );
        break;
      default:
        setAllBooks([...allBooks].sort((a, b) => a.id - b.id));
        break;
    }
  };

  return (
    <>
      <aside className="sidebar">
        <Filtersection
          nonChangeableBooks={nonChangeableBooks}
          handleSelectedFilter={handleSelectedFilter}
        />
        <Sortoptions
          handleSortChange={handleSortChange}
          sortedValue={sortedValue}
        />
        <div className="sidebar__add-book">
          <AddEditForm
            setAllBooks={setAllBooks}
            setNonChangeableBooks={setNonChangeableBooks}
            buttonTitle="Dodaj książkę"
          />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

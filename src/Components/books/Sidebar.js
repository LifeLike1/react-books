import Filtersection from "./Filtersection";
import "./Sidebar.scss";
import Sortoptions from "./Sortoptions";
import { deleteSingleBookAPI, getBooksAPI } from "../static/requests";
import Functionalities from "./Functionalities";

function Sidebar({
  nonChangeableBooks,
  setNonChangeableBooks,
  allBooks,
  setAllBooks,
  setSelectedFilters,
  selectedFilters,
  setSortedValue,
  sortedValue,
  loadingErrors,
  deleteBookList,
  setDeleteBookList,
  setPageDisplay,
}) {
  // Filter list func
  const handleSelectedFilter = (filterName, isFilterSelected) => {
    isFilterSelected
      ? setSelectedFilters([...selectedFilters, filterName])
      : setSelectedFilters(
          selectedFilters.filter((filter) => filter !== filterName)
        );
    setSortedValue(0);
  };

  const handleDeleteButton = async () => {
    const deleteData = async () => {
      const deletedBooks = await Promise.all(
        deleteBookList.map((book) => deleteSingleBookAPI(book))
      );
      console.log(deletedBooks);
    };
    await deleteData();
    const setBooks = async () => {
      const response = await getBooksAPI();
      setNonChangeableBooks(response);
      setAllBooks(response);
    };
    await setBooks();
    setDeleteBookList([]);
    setSortedValue(0);
    setSelectedFilters([]);
    setPageDisplay(1);
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
    <aside className="sidebar">
      {!loadingErrors && (
        <>
          <Filtersection
            nonChangeableBooks={nonChangeableBooks}
            handleSelectedFilter={handleSelectedFilter}
            selectedFilters={selectedFilters}
          />
          <Sortoptions
            handleSortChange={handleSortChange}
            sortedValue={sortedValue}
          />
          <Functionalities
            setAllBooks={setAllBooks}
            setNonChangeableBooks={setNonChangeableBooks}
            nonChangeableBooks={nonChangeableBooks}
            handleDeleteButton={handleDeleteButton}
            deleteBookList={deleteBookList}
          />
        </>
      )}
    </aside>
  );
}

export default Sidebar;

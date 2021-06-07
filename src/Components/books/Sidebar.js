import Filtersection from "./Filtersection";
import "./Sidebar.scss";
import Sortoptions from "./Sortoptions";
import { deleteSingleBookAPI, getBooksAPI } from "../static/requests";
import Functionalities from "./Functionalities";
import Authorsection from "./Authorsection";

function Sidebar({
  bookBase,
  setBookBase,
  booksToShow,
  setBooksToShow,
  setSelectedFilters,
  selectedFilters,
  setSelectedAuthors,
  selectedAuthors,
  setSortedValue,
  sortedValue,
  loadingErrors,
  deleteBookList,
  setDeleteBookList,
  setPageDisplay,
  sortFunction,
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

  const handleSelectedAuthor = (authorName, isAuthorSelected) => {
    isAuthorSelected
      ? setSelectedAuthors([...selectedAuthors, authorName])
      : setSelectedAuthors(
          selectedAuthors.filter((author) => author !== authorName)
        );
    setSortedValue(0);
  };

  const handleDeleteButton = async () => {
    const deleteData = async () => {
      await Promise.all(
        deleteBookList.map((book) => deleteSingleBookAPI(book))
      );
    };
    await deleteData();
    const setBooks = async () => {
      const response = await getBooksAPI();
      setBookBase(response);
      setBooksToShow(response);
    };
    await setBooks();
    setDeleteBookList([]);
    setSortedValue(0);
    setSelectedFilters([]);
    setSelectedAuthors([]);
    setPageDisplay(1);
  };

  // Sort list func
  const handleSortChange = (sortId) => {
    setSortedValue(sortId);
    switch (sortId) {
      case 0:
        setBooksToShow([...booksToShow].sort((a, b) => a.id - b.id));
        break;
      case 1:
        setBooksToShow([...booksToShow].sort((a, b) => a.rating - b.rating));
        break;
      case 2:
        setBooksToShow([...booksToShow].sort((a, b) => b.rating - a.rating));
        break;
      case 3:
        setBooksToShow(
          [...booksToShow].sort((a, b) =>
            a.title > b.title ? 1 : b.title > a.title ? -1 : 0
          )
        );
        break;
      case 4:
        setBooksToShow(
          [...booksToShow].sort((a, b) =>
            b.title > a.title ? 1 : a.title > b.title ? -1 : 0
          )
        );
        break;
      case 5:
        setBooksToShow(
          [...booksToShow].sort((a, b) =>
            b.release_date > a.release_date
              ? 1
              : a.release_date > b.release_date
              ? -1
              : 0
          )
        );
        break;
      case 6:
        setBooksToShow(
          [...booksToShow].sort((a, b) =>
            a.release_date > b.release_date
              ? 1
              : b.release_date > a.release_date
              ? -1
              : 0
          )
        );
        break;
      default:
        setBooksToShow([...booksToShow].sort((a, b) => a.id - b.id));
        break;
    }
  };

  return (
    <aside className="sidebar">
      {!loadingErrors && (
        <>
          <Filtersection
            bookBase={bookBase}
            handleSelectedFilter={handleSelectedFilter}
            selectedFilters={selectedFilters}
          />
          <Authorsection
            bookBase={bookBase}
            handleSelectedAuthor={handleSelectedAuthor}
            selectedAuthors={selectedAuthors}
          />
          <Sortoptions
            handleSortChange={handleSortChange}
            sortedValue={sortedValue}
          />
          <Functionalities
            setBooksToShow={setBooksToShow}
            setBookBase={setBookBase}
            bookBase={bookBase}
            handleDeleteButton={handleDeleteButton}
            deleteBookList={deleteBookList}
          />
        </>
      )}
    </aside>
  );
}

export default Sidebar;

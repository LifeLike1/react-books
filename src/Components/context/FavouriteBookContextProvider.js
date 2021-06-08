import { createContext, useState } from "react";

export const FavouriteBookContext = createContext(null);

function Favourite({ children }) {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  return (
    <FavouriteBookContext.Provider value={[favouriteBooks, setFavouriteBooks]}>
      {children}
    </FavouriteBookContext.Provider>
  );
}

export default Favourite;

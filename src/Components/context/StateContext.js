import { createContext, useState } from "react";

export const FavouriteBookContext = createContext(null);

export default ({ children }) => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  return (
    <FavouriteBookContext.Provider value={[favouriteBooks, setFavouriteBooks]}>
      {children}
    </FavouriteBookContext.Provider>
  );
};

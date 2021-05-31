import { useContext } from "react";
import { FavouriteBookContext } from "../context/StateContext";

function FavouriteList() {
  const fav = useContext(FavouriteBookContext);
  console.log(fav);
  return (
    <div>
      <h1>jo</h1>
    </div>
  );
}

export default FavouriteList;

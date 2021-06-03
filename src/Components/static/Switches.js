import { Switch, Route } from "react-router-dom";
import Books from "../books/Books";
import FavouriteList from "../favourite/FavouriteList";
import ElementDetails from "../books/ElementDetails";

function Switches() {
  return (
    <Switch>
      <Route path="/" component={Books} exact />
      <Route path="/favourites" component={FavouriteList} />
      <Route path="/:id" component={ElementDetails} />
    </Switch>
  );
}

export default Switches;

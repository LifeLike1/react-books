import { Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Books from "../books/Books";
import ElementDetails from "../books/ElementDetails";

function Switches() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/books" component={Books} />
      <Route path="/favourite" component={Books} />
      <Route path="/book/:id" component={ElementDetails} />
    </Switch>
  );
}

export default Switches;

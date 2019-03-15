import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./page/Landing";
import NotFound from "./page/NotFound";
import Player from "./page/Player";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={"/"} component={Landing} />
      <Route path={"/play/:system"} component={Player} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

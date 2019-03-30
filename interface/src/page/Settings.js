import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import Calendar from "../component/Calendar";

import SetSystem from "./SetSystem";
import SetDetails from "./SetDetails";
import SetSchedule from "./SetSchedule";
import SetDay from "./SetDay";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.defaultpage = this.defaultpage.bind(this);
  }

  defaultpage = () => {
    return (
      <div>
        This is the default page.
        <ul>
          <li>
            <Link to="/set">Dashboard</Link>
          </li>
          <li>
            <Link to="/play">Viewer</Link>
          </li>
        </ul>
        <Link to="/set/svhs">SVHS Test Link</Link>
        <Calendar />
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>Timer Settings WIP</h1>
        Sign in and sign out will be up here.
        <hr />
        <Route
          exact
          path="/set"
          component={props => {
            return this.defaultpage();
          }}
        />
        <Route exact path="/set/:system" component={SetSystem} />
        <Route exact path="/set/:system/details" component={SetDetails} />
        <Route
          exact
          path="/set/:system/schedule/:schedule"
          component={SetSchedule}
        />
        <Route exact path="/set/:system/date/:date" component={SetDay} />
      </div>
    );
  }
}

export default Settings;

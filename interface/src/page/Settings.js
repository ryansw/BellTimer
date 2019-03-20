import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import Calendar from "../component/Calendar";

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Timer Settings</h1>
        Sign in and sign out will be up here.
        <br />
        <ul>
          <li>
            <Link to="/set">Dashboard</Link>
          </li>
          <li>
            <Link to="/play">Viewer</Link>
          </li>
        </ul>
        <Calendar />
        <Route
          exact
          path="/set"
          component={props => {
            return <b>Dashboard goes here</b>;
          }}
        />
        <Route
          path="/set/test/:system?/:schedule?"
          component={props => {
            return (
              <b>
                Test. {props.match.params.system} {props.match.params.schedule}
              </b>
            );
          }}
        />
      </div>
    );
  }
}

export default Settings;

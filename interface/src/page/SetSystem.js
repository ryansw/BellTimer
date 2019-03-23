import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class SetSystem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>System Dashboard</h2>
        The system dashboard for {this.props.match.params.system}.
      </div>
    );
  }
}

export default SetSystem;

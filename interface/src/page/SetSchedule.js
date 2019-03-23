import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class SetSchedule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Schedule Details</h2>
        The schedule details settings for {this.props.match.params.system}/
        {this.props.match.params.schedule}.
      </div>
    );
  }
}

export default SetSchedule;

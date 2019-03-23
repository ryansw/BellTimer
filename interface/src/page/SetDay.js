import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

class SetDay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Day Details</h2>
        The day details settings for {this.props.match.params.system}/
        {this.props.match.params.date}.
      </div>
    );
  }
}

export default SetDay;

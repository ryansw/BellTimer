import React, { Component } from "react";
import { Link } from "react-router-dom";

class SetDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>System Details</h2>
        The system details settings for {this.props.match.params.system}.
      </div>
    );
  }
}

export default SetDetails;
